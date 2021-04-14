package feegrant_test

import (
	"testing"

	"github.com/stretchr/testify/suite"
	tmproto "github.com/tendermint/tendermint/proto/tendermint/types"

	"github.com/onomyprotocol/onomy-sdk/crypto/keys/secp256k1"
	"github.com/onomyprotocol/onomy-sdk/simapp"
	sdk "github.com/onomyprotocol/onomy-sdk/types"
	feegrant "github.com/onomyprotocol/onomy-sdk/x/feegrant"
	"github.com/onomyprotocol/onomy-sdk/x/feegrant/keeper"
	"github.com/onomyprotocol/onomy-sdk/x/feegrant/types"
)

type GenesisTestSuite struct {
	suite.Suite
	ctx    sdk.Context
	keeper keeper.Keeper
}

func (suite *GenesisTestSuite) SetupTest() {
	checkTx := false
	app := simapp.Setup(checkTx)
	suite.ctx = app.BaseApp.NewContext(checkTx, tmproto.Header{Height: 1})
	suite.keeper = app.FeeGrantKeeper
}

var (
	granteePub  = secp256k1.GenPrivKey().PubKey()
	granterPub  = secp256k1.GenPrivKey().PubKey()
	granteeAddr = sdk.AccAddress(granteePub.Address())
	granterAddr = sdk.AccAddress(granterPub.Address())
)

func (suite *GenesisTestSuite) TestImportExportGenesis() {
	coins := sdk.NewCoins(sdk.NewCoin("foo", sdk.NewInt(1_000)))
	now := suite.ctx.BlockHeader().Time

	allowance := &types.BasicFeeAllowance{SpendLimit: coins, Expiration: types.ExpiresAtTime(now.AddDate(1, 0, 0))}
	err := suite.keeper.GrantFeeAllowance(suite.ctx, granterAddr, granteeAddr, allowance)
	suite.Require().NoError(err)

	genesis, err := feegrant.ExportGenesis(suite.ctx, suite.keeper)
	suite.Require().NoError(err)
	// Clear keeper
	suite.keeper.RevokeFeeAllowance(suite.ctx, granterAddr, granteeAddr)
	feegrant.InitGenesis(suite.ctx, suite.keeper, genesis)
	newGenesis, err := feegrant.ExportGenesis(suite.ctx, suite.keeper)
	suite.Require().NoError(err)
	suite.Require().Equal(genesis, newGenesis)
}

func TestGenesisTestSuite(t *testing.T) {
	suite.Run(t, new(GenesisTestSuite))
}
