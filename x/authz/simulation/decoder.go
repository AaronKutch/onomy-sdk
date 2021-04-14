package simulation

import (
	"bytes"
	"fmt"

	"github.com/onomyprotocol/onomy-sdk/codec"
	"github.com/onomyprotocol/onomy-sdk/types/kv"
	"github.com/onomyprotocol/onomy-sdk/x/authz/types"
)

// NewDecodeStore returns a decoder function closure that umarshals the KVPair's
// Value to the corresponding authz type.
func NewDecodeStore(cdc codec.Marshaler) func(kvA, kvB kv.Pair) string {
	return func(kvA, kvB kv.Pair) string {
		switch {
		case bytes.Equal(kvA.Key[:1], types.GrantKey):
			var grantA, grantB types.AuthorizationGrant
			cdc.MustUnmarshalBinaryBare(kvA.Value, &grantA)
			cdc.MustUnmarshalBinaryBare(kvB.Value, &grantB)
			return fmt.Sprintf("%v\n%v", grantA, grantB)
		default:
			panic(fmt.Sprintf("invalid authz key %X", kvA.Key))
		}
	}
}
