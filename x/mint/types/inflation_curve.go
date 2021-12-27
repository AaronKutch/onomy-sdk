package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"

	"math/big"
)

var (
	precisionReuse       = new(big.Int).Exp(big.NewInt(10), big.NewInt(sdk.Precision), nil)
	globalInflationCurve = NewInflationCurve()
)

// InflationCurve is the struct used for the inflation curve calculation.
type InflationCurve struct {
	// for exp2m1
	constants [30]*big.Int
	// for base change
	lbE *big.Int
	// for large 1.0 value
	exp2FwOne *big.Int
	// for curve peak position
	peakOffset *big.Int
	// adjusts peak height
	peakScale *big.Int
}

// NewInflationCurve create a new `globalInflationCurve` instance.
func NewInflationCurve() *InflationCurve {
	curveConstants := [30]*big.Int{
		newBigIntWithTenBase("21"),
		newBigIntWithTenBase("931"),
		newBigIntWithTenBase("38977"),
		newBigIntWithTenBase("1574505"),
		newBigIntWithTenBase("61331333"),
		newBigIntWithTenBase("2300542666"),
		newBigIntWithTenBase("82974537419"),
		newBigIntWithTenBase("2872966887729"),
		newBigIntWithTenBase("95330746876023"),
		newBigIntWithTenBase("3025730306770147"),
		newBigIntWithTenBase("91669328281539416"),
		newBigIntWithTenBase("2645017706267986357"),
		newBigIntWithTenBase("72503124630030170854"),
		newBigIntWithTenBase("1882798170348581770631"),
		newBigIntWithTenBase("46177160917064115362943"),
		newBigIntWithTenBase("1065912976918080910514347"),
		newBigIntWithTenBase("23066810487283611717419874"),
		newBigIntWithTenBase("465897223387814402039923456"),
		newBigIntWithTenBase("8737918978691986426796998167"),
		newBigIntWithTenBase("151273828538981816810644004423"),
		newBigIntWithTenBase("2400662024744240530078289187559"),
		newBigIntWithTenBase("34634231979489737747471345012729"),
		newBigIntWithTenBase("449699712496270121258630534506364"),
		newBigIntWithTenBase("5190236360860492089195900933424948"),
		newBigIntWithTenBase("52415497811985085885772577715591695"),
		newBigIntWithTenBase("453717472554463172968722258900220684"),
		newBigIntWithTenBase("3272879738094991899426931849626998944"),
		newBigIntWithTenBase("18887069470302456743998381224473040631"),
		newBigIntWithTenBase("81744844385192085827234082247051493269"),
		newBigIntWithTenBase("235865763225513294137944142764154484399"),
	}

	return &InflationCurve{
		constants:  curveConstants,
		lbE:        newBigIntWithTenBase("490923683258796565746369346286093237521"),
		exp2FwOne:  newBigIntWithTenBase("340282366920938463463374607431768211456"),
		peakOffset: newBigIntWithTenBase("-150000000000000000000000000"),
		peakScale:  newBigIntWithTenBase("-7880401239278895842455808020028722761015947854093089333589658680"),
	}
}

// CalculateInflationDec is the same as `calculateInflationBinary` but with an `Int` input and `Dec` output
func (ic *InflationCurve) CalculateInflationDec(tokenSupply sdk.Int) sdk.Dec {
	// People keep committing the same horrible mistake of using base 10 fixed point numbers at the
	// computational layer instead of converting between binary fixed point at the human-machine
	// interface by using banker's rounding which is already inevitable. Above, we absolutely
	// needed binary fixed point to do fast divisions by powers of two, but the output here needs
	// to be a `Dec`.
	var tmp = ic.calculateInflationBinary(tokenSupply.BigInt())
	// multiply by 10^18 to get to maximum precision allowed by `Dec`
	tmp.Mul(tmp, precisionReuse)
	// remove binary fixed point component
	tmp.Rsh(tmp, 64)
	return sdk.NewDecFromBigIntWithPrec(tmp, sdk.Precision)
}

// newBigIntWithTenBase allocates and returns a new Int set to s with base decimals.
func newBigIntWithTenBase(s string) *big.Int {
	i, _ := new(big.Int).SetString(s, 10)
	return i
}

// exp2m1Fracint calculates `2^x - 1` using a 128 bit fractint.
func (ic *InflationCurve) exp2m1Fracint(x *big.Int) *big.Int {
	// upstream invariants should prevent this, but check
	// just in case because a width explosion happens otherwise
	if x.BitLen() > 128 {
		return nil
	}
	var h = new(big.Int)
	for _, c := range ic.constants {
		h.Add(h, c)
		h.Mul(h, x)
		// shift from fp = 256 to fp = 128
		h.Rsh(h, 128)
	}
	return h
}

func unsignedAbs(x int) uint {
	if x < 0 {
		// arithmetic is wrapping in Go so this handles imin correctly
		return uint(-x)
	}

	return uint(x)
}

// Calculates `e^x`. Input and output are {i,u}128f64 bit fixed point integers.
// Returns `nil` if the result overflows 128 bits.
func (ic *InflationCurve) exp(x *big.Int) *big.Int {
	if x.BitLen() > 128 {
		return nil
	}
	var msb = x.Sign() == -1
	// make unsigned
	x.Abs(x)
	// convert bases
	x.Mul(x, ic.lbE)
	// lbE.fp + x.fp = 128 + 64 = 192
	var intPart = new(big.Int).Rsh(x, 192)
	// extract the fractional part
	var fracPart = new(big.Int).Lsh(intPart, 192)
	fracPart.Sub(x, fracPart)
	// get to fp = 128
	fracPart.Rsh(fracPart, 64)

	if !intPart.IsInt64() {
		// certain overflow
		return nil
	}

	// note: we assume `int` is 64 bits
	var shift = int(intPart.Int64())
	if msb {
		shift = -shift - 1
		// two's complement without changing the sign
		fracPart.Sub(ic.exp2FwOne, fracPart)
	}
	// include shift from fp=128 to fp=64
	shift -= 64

	// calculate exp2
	var res = ic.exp2m1Fracint(fracPart)
	res.Or(res, ic.exp2FwOne)

	switch {
	case shift < 0:
		var shift = unsignedAbs(shift)
		if shift >= 128 {
			// shift is large enough to guarantee zero
			return new(big.Int)
		}
		res.Rsh(res, shift)
	case shift <= (128 - res.BitLen()):
		res.Lsh(res, unsignedAbs(shift))
		if res.BitLen() > 128 {
			return nil
		}
	default:
		// guaranteed overflow from large positive shift
		return nil
	}

	return res
}

// Calculates `e^(-((x-peak_position)^2 / (2*(std_dev^2)))))`.
// `tokenSupply` is in units of token. Returns a fixed point integer capped at 1.0u65f64.
func (ic *InflationCurve) calculateInflationBinary(tokenSupply *big.Int) *big.Int {
	if tokenSupply.BitLen() >= 90 {
		// guaranteed < 2^-64
		return new(big.Int)
	}
	// apply offset
	var tmp = new(big.Int).Add(tokenSupply, ic.peakOffset)
	// square
	tmp.Mul(tmp, tmp)
	// scale
	tmp.Mul(tmp, ic.peakScale)
	// keep at fp = 64
	tmp.Rsh(tmp, 320)
	var res = ic.exp(tmp)
	if res == nil {
		// return zero
		return new(big.Int)
	}
	return res
}
