(window.webpackJsonp=window.webpackJsonp||[]).push([[79],{663:function(e,t,o){"use strict";o.r(t);var a=o(1),n=Object(a.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h1",{attrs:{id:"adr-016-validator-consensus-key-rotation"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#adr-016-validator-consensus-key-rotation"}},[e._v("#")]),e._v(" ADR 016: Validator Consensus Key Rotation")]),e._v(" "),o("h2",{attrs:{id:"changelog"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#changelog"}},[e._v("#")]),e._v(" Changelog")]),e._v(" "),o("ul",[o("li",[e._v("2019 Oct 23: Initial draft")]),e._v(" "),o("li",[e._v("2019 Nov 28: Add key rotation fee")])]),e._v(" "),o("h2",{attrs:{id:"context"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#context"}},[e._v("#")]),e._v(" Context")]),e._v(" "),o("p",[e._v("Validator consensus key rotation feature has been discussed and requested for a long time, for the sake of safer validator key management policy (e.g. https://github.com/tendermint/tendermint/issues/1136). So, we suggest one of the simplest form of validator consensus key rotation implementation mostly onto Onomy-SDK.")]),e._v(" "),o("p",[e._v("We don't need to make any update on consensus logic in Tendermint because Tendermint does not have any mapping information of consensus key and validator operator key, meaning that from Tendermint point of view, a consensus key rotation of a validator is simply a replacement of a consensus key to another.")]),e._v(" "),o("p",[e._v("Also, it should be noted that this ADR includes only the simplest form of consensus key rotation without considering multiple consensus keys concept. Such multiple consensus keys concept shall remain a long term goal of Tendermint and Onomy-SDK.")]),e._v(" "),o("h2",{attrs:{id:"decision"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#decision"}},[e._v("#")]),e._v(" Decision")]),e._v(" "),o("h3",{attrs:{id:"pseudo-procedure-for-consensus-key-rotation"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#pseudo-procedure-for-consensus-key-rotation"}},[e._v("#")]),e._v(" Pseudo procedure for consensus key rotation")]),e._v(" "),o("ul",[o("li",[e._v("create new random consensus key.")]),e._v(" "),o("li",[e._v("create and broadcast a transaction with a "),o("code",[e._v("MsgRotateConsPubKey")]),e._v(" that states the new consensus key is now coupled with the validator operator with signature from the validator's operator key.")]),e._v(" "),o("li",[e._v("old consensus key becomes unable to participate on consensus immediately after the update of key mapping state on-chain.")]),e._v(" "),o("li",[e._v("start validating with new consensus key.")]),e._v(" "),o("li",[e._v("validators using HSM and KMS should update the consensus key in HSM to use the new rotated key after the height "),o("code",[e._v("h")]),e._v(" when "),o("code",[e._v("MsgRotateConsPubKey")]),e._v(" committed to the blockchain.")])]),e._v(" "),o("h3",{attrs:{id:"considerations"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#considerations"}},[e._v("#")]),e._v(" Considerations")]),e._v(" "),o("ul",[o("li",[e._v("consensus key mapping information management strategy\n"),o("ul",[o("li",[e._v("store history of each key mapping changes in the kvstore.")]),e._v(" "),o("li",[e._v("the state machine can search corresponding consensus key paired with given validator operator for any arbitrary height in a recent unbonding period.")]),e._v(" "),o("li",[e._v("the state machine does not need any historical mapping information which is past more than unbonding period.")])])]),e._v(" "),o("li",[e._v("key rotation costs related to LCD and IBC\n"),o("ul",[o("li",[e._v("LCD and IBC will have traffic/computation burden when there exists frequent power changes")]),e._v(" "),o("li",[e._v("In current Tendermint design, consensus key rotations are seen as power changes from LCD or IBC perspective")]),e._v(" "),o("li",[e._v("Therefore, to minimize unnecessary frequent key rotation behavior, we limited maximum number of rotation in recent unbonding period and also applied exponentially increasing rotation fee")])])]),e._v(" "),o("li",[e._v("limits\n"),o("ul",[o("li",[e._v("a validator cannot rotate its consensus key more than "),o("code",[e._v("MaxConsPubKeyRotations")]),e._v(" time for any unbonding period, to prevent spam.")]),e._v(" "),o("li",[e._v("parameters can be decided by governance and stored in genesis file.")])])]),e._v(" "),o("li",[e._v("key rotation fee\n"),o("ul",[o("li",[e._v("a validator should pay "),o("code",[e._v("KeyRotationFee")]),e._v(" to rotate the consensus key which is calculated as below")]),e._v(" "),o("li",[o("code",[e._v("KeyRotationFee")]),e._v(" = (max("),o("code",[e._v("VotingPowerPercentage")]),e._v(" * 100, 1) * "),o("code",[e._v("InitialKeyRotationFee")]),e._v(") * 2^(number of rotations in "),o("code",[e._v("ConsPubKeyRotationHistory")]),e._v(" in recent unbonding period)")])])]),e._v(" "),o("li",[e._v("evidence module\n"),o("ul",[o("li",[e._v("evidence module can search corresponding consensus key for any height from slashing keeper so that it can decide which consensus key is supposed to be used for given height.")])])]),e._v(" "),o("li",[e._v("abci.ValidatorUpdate\n"),o("ul",[o("li",[e._v("tendermint already has ability to change a consensus key by ABCI communication("),o("code",[e._v("ValidatorUpdate")]),e._v(").")]),e._v(" "),o("li",[e._v("validator consensus key update can be done via creating new + delete old by change the power to zero.")]),e._v(" "),o("li",[e._v("therefore, we expect we even do not need to change tendermint codebase at all to implement this feature.")])])]),e._v(" "),o("li",[e._v("new genesis parameters in "),o("code",[e._v("staking")]),e._v(" module\n"),o("ul",[o("li",[o("code",[e._v("MaxConsPubKeyRotations")]),e._v(" : maximum number of rotation can be executed by a validator in recent unbonding period. default value 10 is suggested(11th key rotation will be rejected)")]),e._v(" "),o("li",[o("code",[e._v("InitialKeyRotationFee")]),e._v(" : the initial key rotation fee when no key rotation has happened in recent unbonding period. default value 1atom is suggested(1atom fee for the first key rotation in recent unbonding period)")])])])]),e._v(" "),o("h3",{attrs:{id:"workflow"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#workflow"}},[e._v("#")]),e._v(" Workflow")]),e._v(" "),o("ol",[o("li",[o("p",[e._v("The validator generates a new consensus keypair.")])]),e._v(" "),o("li",[o("p",[e._v("The validator generates and signs a "),o("code",[e._v("MsgRotateConsPubKey")]),e._v(" tx with their operator key and new ConsPubKey")]),e._v(" "),o("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"dHlwZSBNc2dSb3RhdGVDb25zUHViS2V5IHN0cnVjdCB7CiAgICBWYWxpZGF0b3JBZGRyZXNzICBzZGsuVmFsQWRkcmVzcwogICAgTmV3UHViS2V5ICAgICAgICAgY3J5cHRvLlB1YktleQp9Cg=="}})],1),e._v(" "),o("li",[o("p",[o("code",[e._v("handleMsgRotateConsPubKey")]),e._v(" gets "),o("code",[e._v("MsgRotateConsPubKey")]),e._v(", calls "),o("code",[e._v("RotateConsPubKey")]),e._v(" with emits event")])]),e._v(" "),o("li",[o("p",[o("code",[e._v("RotateConsPubKey")])]),e._v(" "),o("ul",[o("li",[e._v("checks if "),o("code",[e._v("NewPubKey")]),e._v(" is not duplicated on "),o("code",[e._v("ValidatorsByConsAddr")])]),e._v(" "),o("li",[e._v("checks if the validator is does not exceed parameter "),o("code",[e._v("MaxConsPubKeyRotations")]),e._v(" by iterating "),o("code",[e._v("ConsPubKeyRotationHistory")])]),e._v(" "),o("li",[e._v("checks if the signing account has enough balance to pay "),o("code",[e._v("KeyRotationFee")])]),e._v(" "),o("li",[e._v("pays "),o("code",[e._v("KeyRotationFee")]),e._v(" to community fund")]),e._v(" "),o("li",[e._v("overwrites "),o("code",[e._v("NewPubKey")]),e._v(" in "),o("code",[e._v("validator.ConsPubKey")])]),e._v(" "),o("li",[e._v("deletes old "),o("code",[e._v("ValidatorByConsAddr")])]),e._v(" "),o("li",[o("code",[e._v("SetValidatorByConsAddr")]),e._v(" for "),o("code",[e._v("NewPubKey")])]),e._v(" "),o("li",[e._v("Add "),o("code",[e._v("ConsPubKeyRotationHistory")]),e._v(" for tracking rotation")])]),e._v(" "),o("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"dHlwZSBDb25zUHViS2V5Um90YXRpb25IaXN0b3J5IHN0cnVjdCB7CiAgICBPcGVyYXRvckFkZHJlc3MgICAgICAgICBzZGsuVmFsQWRkcmVzcwogICAgT2xkQ29uc1B1YktleSAgICAgICAgICAgY3J5cHRvLlB1YktleQogICAgTmV3Q29uc1B1YktleSAgICAgICAgICAgY3J5cHRvLlB1YktleQogICAgUm90YXRlZEhlaWdodCAgICAgICAgICAgaW50NjQKfQo="}})],1),e._v(" "),o("li",[o("p",[o("code",[e._v("ApplyAndReturnValidatorSetUpdates")]),e._v(" checks if there is "),o("code",[e._v("ConsPubKeyRotationHistory")]),e._v(" with "),o("code",[e._v("ConsPubKeyRotationHistory.RotatedHeight == ctx.BlockHeight()")]),e._v(" and if so, generates 2 "),o("code",[e._v("ValidatorUpdate")]),e._v(" , one for a remove validator and one for create new validator")]),e._v(" "),o("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"YWJjaS5WYWxpZGF0b3JVcGRhdGV7CiAgICBQdWJLZXk6IHRtdHlwZXMuVE0yUEIuUHViS2V5KE9sZENvbnNQdWJLZXkpLAogICAgUG93ZXI6ICAwLAp9CgphYmNpLlZhbGlkYXRvclVwZGF0ZXsKICAgIFB1YktleTogdG10eXBlcy5UTTJQQi5QdWJLZXkoTmV3Q29uc1B1YktleSksCiAgICBQb3dlcjogIHYuQ29uc2Vuc3VzUG93ZXIoKSwKfQo="}})],1),e._v(" "),o("li",[o("p",[e._v("at "),o("code",[e._v("previousVotes")]),e._v(" Iteration logic of "),o("code",[e._v("AllocateTokens")]),e._v(",  "),o("code",[e._v("previousVote")]),e._v(" using "),o("code",[e._v("OldConsPubKey")]),e._v(" match up with "),o("code",[e._v("ConsPubKeyRotationHistory")]),e._v(", and replace validator for token allocation")])]),e._v(" "),o("li",[o("p",[e._v("Migrate "),o("code",[e._v("ValidatorSigningInfo")]),e._v(" and "),o("code",[e._v("ValidatorMissedBlockBitArray")]),e._v(" from "),o("code",[e._v("OldConsPubKey")]),e._v(" to "),o("code",[e._v("NewConsPubKey")])])])]),e._v(" "),o("ul",[o("li",[e._v("Note : All above features shall be implemented in "),o("code",[e._v("staking")]),e._v(" module.")])]),e._v(" "),o("h2",{attrs:{id:"status"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#status"}},[e._v("#")]),e._v(" Status")]),e._v(" "),o("p",[e._v("Proposed")]),e._v(" "),o("h2",{attrs:{id:"consequences"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#consequences"}},[e._v("#")]),e._v(" Consequences")]),e._v(" "),o("h3",{attrs:{id:"positive"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#positive"}},[e._v("#")]),e._v(" Positive")]),e._v(" "),o("ul",[o("li",[e._v("Validators can immediately or periodically rotate their consensus key to have better security policy")]),e._v(" "),o("li",[e._v("improved security against Long-Range attacks (https://nearprotocol.com/blog/long-range-attacks-and-a-new-fork-choice-rule) given a validator throws away the old consensus key(s)")])]),e._v(" "),o("h3",{attrs:{id:"negative"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#negative"}},[e._v("#")]),e._v(" Negative")]),e._v(" "),o("ul",[o("li",[e._v("Slash module needs more computation because it needs to lookup corresponding consensus key of validators for each height")]),e._v(" "),o("li",[e._v("frequent key rotations will make light client bisection less efficient")])]),e._v(" "),o("h3",{attrs:{id:"neutral"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#neutral"}},[e._v("#")]),e._v(" Neutral")]),e._v(" "),o("h2",{attrs:{id:"references"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[e._v("#")]),e._v(" References")]),e._v(" "),o("ul",[o("li",[e._v("on tendermint repo : https://github.com/tendermint/tendermint/issues/1136")]),e._v(" "),o("li",[e._v("on onomy-sdk repo : https://github.com/onomyprotocol/onomy-sdk/issues/5231")]),e._v(" "),o("li",[e._v("about multiple consensus keys : https://github.com/tendermint/tendermint/issues/1758#issuecomment-545291698")])])])}),[],!1,null,null,null);t.default=n.exports}}]);