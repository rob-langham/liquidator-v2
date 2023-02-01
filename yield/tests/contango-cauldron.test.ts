import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  beforeEach
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt, Entity } from "@graphprotocol/graph-ts"
import { AssetAdded } from "../generated/schema"
import { AssetAdded as AssetAddedEvent } from "../generated/ContangoCauldron/ContangoCauldron"
import { handleAssetAdded, handleVaultBuilt } from "../src/contango-cauldron"
import { createAssetAddedEvent, createVaultBuiltEvent } from "./contango-cauldron-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0


let vaultId = Bytes.fromI32(2)
let seriesId = Bytes.fromI32(1)
let ilkId = Bytes.fromI32(1)
let owner = Address.fromString("0x0000000000000000000000000000000000000001")

describe("Vault events", () => {

  beforeAll(() => {
    let assetId = Bytes.fromI32(1234567890)
    let asset = Address.fromString("0x0000000000000000000000000000000000000001")
    let newAssetAddedEvent = createAssetAddedEvent(assetId, asset)
    handleAssetAdded(newAssetAddedEvent)
  })

  beforeEach(() => {
    // just ensures we are testing dynamic values, it's not necessary to do this
    vaultId = Bytes.fromI32(vaultId.toI32() + 107)
    seriesId = Bytes.fromI32(seriesId.toI32() + 149)
    ilkId = Bytes.fromI32(seriesId.toI32() + 151)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Vault built", () => {
    givenVaultBuiltEvent()

    assert.entityCount("Vault", 1);
    assert.fieldEquals("Vault", vaultId.toHex(), "ink", '0');
    assert.fieldEquals("Vault", vaultId.toHex(), "art", '0');
    assert.fieldEquals("Vault", vaultId.toHex(), "ilkId", ilkId.toHex());
    assert.fieldEquals("Vault", vaultId.toHex(), "seriesId", seriesId.toHex());
    assert.fieldEquals("Vault", vaultId.toHex(), "owner", owner.toHex());
  });

  function bytes(value: BigInt, bytes: i32): string {
    return "0x" + value.toHexString().padStart(bytes + bytes, '0')
  }

  function bytes6(value: BigInt): string {
    return bytes(value, 6)
  }

  function bytes12(value: BigInt): string {
    return bytes(value, 12)
  }
})


function givenVaultBuiltEvent(): void {
  handleVaultBuilt(createVaultBuiltEvent(
    vaultId,
    owner,
    seriesId,
    ilkId,
  ));
}
