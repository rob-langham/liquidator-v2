import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { AssetAdded } from "../generated/schema"
import { AssetAdded as AssetAddedEvent } from "../generated/ContangoCauldron/ContangoCauldron"
import { handleAssetAdded } from "../src/contango-cauldron"
import { createAssetAddedEvent } from "./contango-cauldron-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let assetId = Bytes.fromI32(1234567890)
    let asset = Address.fromString("0x0000000000000000000000000000000000000001")
    let newAssetAddedEvent = createAssetAddedEvent(assetId, asset)
    handleAssetAdded(newAssetAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AssetAdded created and stored", () => {
    assert.entityCount("AssetAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AssetAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "assetId",
      "1234567890"
    )
    assert.fieldEquals(
      "AssetAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "asset",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
