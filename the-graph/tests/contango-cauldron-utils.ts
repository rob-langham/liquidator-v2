import { Address, BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts"
import { newMockEvent } from "matchstick-as"
import {
  AssetAdded, IlkAdded, SeriesAdded,
  SeriesMatured, VaultBuilt,
  VaultDestroyed,
  VaultGiven,
  VaultPoured,
  VaultRolled,
  VaultStirred,
  VaultTweaked
} from "../generated/ContangoCauldron/ContangoCauldron"

export function createAssetAddedEvent(
  assetId: Bytes,
  asset: Address
): AssetAdded {
  let assetAddedEvent = changetype<AssetAdded>(newMockEvent())

  assetAddedEvent.parameters = new Array()

  assetAddedEvent.parameters.push(
    new ethereum.EventParam("assetId", ethereum.Value.fromFixedBytes(assetId))
  )
  assetAddedEvent.parameters.push(
    new ethereum.EventParam("asset", ethereum.Value.fromAddress(asset))
  )

  return assetAddedEvent
}

export function createIlkAddedEvent(seriesId: Bytes, ilkId: Bytes): IlkAdded {
  let ilkAddedEvent = changetype<IlkAdded>(newMockEvent())

  ilkAddedEvent.parameters = new Array()

  ilkAddedEvent.parameters.push(
    new ethereum.EventParam("seriesId", ethereum.Value.fromFixedBytes(seriesId))
  )
  ilkAddedEvent.parameters.push(
    new ethereum.EventParam("ilkId", ethereum.Value.fromFixedBytes(ilkId))
  )

  return ilkAddedEvent
}

export function createSeriesAddedEvent(
  seriesId: Bytes,
  baseId: Bytes,
  fyToken: Address
): SeriesAdded {
  let seriesAddedEvent = changetype<SeriesAdded>(newMockEvent())

  seriesAddedEvent.parameters = new Array()

  seriesAddedEvent.parameters.push(
    new ethereum.EventParam("seriesId", ethereum.Value.fromFixedBytes(seriesId))
  )
  seriesAddedEvent.parameters.push(
    new ethereum.EventParam("baseId", ethereum.Value.fromFixedBytes(baseId))
  )
  seriesAddedEvent.parameters.push(
    new ethereum.EventParam("fyToken", ethereum.Value.fromAddress(fyToken))
  )

  return seriesAddedEvent
}

export function createSeriesMaturedEvent(
  seriesId: Bytes,
  rateAtMaturity: BigInt
): SeriesMatured {
  let seriesMaturedEvent = changetype<SeriesMatured>(newMockEvent())

  seriesMaturedEvent.parameters = new Array()

  seriesMaturedEvent.parameters.push(
    new ethereum.EventParam("seriesId", ethereum.Value.fromFixedBytes(seriesId))
  )
  seriesMaturedEvent.parameters.push(
    new ethereum.EventParam(
      "rateAtMaturity",
      ethereum.Value.fromUnsignedBigInt(rateAtMaturity)
    )
  )

  return seriesMaturedEvent
}

export function createVaultBuiltEvent(
  vaultId: Bytes,
  owner: Address,
  seriesId: Bytes,
  ilkId: Bytes
): VaultBuilt {
  let vaultBuiltEvent = changetype<VaultBuilt>(newMockEvent())

  vaultBuiltEvent.parameters = new Array()

  vaultBuiltEvent.parameters.push(
    new ethereum.EventParam("vaultId", ethereum.Value.fromFixedBytes(vaultId))
  )
  vaultBuiltEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  vaultBuiltEvent.parameters.push(
    new ethereum.EventParam("seriesId", ethereum.Value.fromFixedBytes(seriesId))
  )
  vaultBuiltEvent.parameters.push(
    new ethereum.EventParam("ilkId", ethereum.Value.fromFixedBytes(ilkId))
  )

  return vaultBuiltEvent
}

export function createVaultDestroyedEvent(vaultId: Bytes): VaultDestroyed {
  let vaultDestroyedEvent = changetype<VaultDestroyed>(newMockEvent())

  vaultDestroyedEvent.parameters = new Array()

  vaultDestroyedEvent.parameters.push(
    new ethereum.EventParam("vaultId", ethereum.Value.fromFixedBytes(vaultId))
  )

  return vaultDestroyedEvent
}

export function createVaultGivenEvent(
  vaultId: Bytes,
  receiver: Address
): VaultGiven {
  let vaultGivenEvent = changetype<VaultGiven>(newMockEvent())

  vaultGivenEvent.parameters = new Array()

  vaultGivenEvent.parameters.push(
    new ethereum.EventParam("vaultId", ethereum.Value.fromFixedBytes(vaultId))
  )
  vaultGivenEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromAddress(receiver))
  )

  return vaultGivenEvent
}

export function createVaultPouredEvent(
  vaultId: Bytes,
  seriesId: Bytes,
  ilkId: Bytes,
  ink: BigInt,
  art: BigInt
): VaultPoured {
  let vaultPouredEvent = changetype<VaultPoured>(newMockEvent())

  vaultPouredEvent.parameters = new Array()

  vaultPouredEvent.parameters.push(
    new ethereum.EventParam("vaultId", ethereum.Value.fromFixedBytes(vaultId))
  )
  vaultPouredEvent.parameters.push(
    new ethereum.EventParam("seriesId", ethereum.Value.fromFixedBytes(seriesId))
  )
  vaultPouredEvent.parameters.push(
    new ethereum.EventParam("ilkId", ethereum.Value.fromFixedBytes(ilkId))
  )
  vaultPouredEvent.parameters.push(
    new ethereum.EventParam("ink", ethereum.Value.fromSignedBigInt(ink))
  )
  vaultPouredEvent.parameters.push(
    new ethereum.EventParam("art", ethereum.Value.fromSignedBigInt(art))
  )

  return vaultPouredEvent
}

export function createVaultRolledEvent(
  vaultId: Bytes,
  seriesId: Bytes,
  art: BigInt
): VaultRolled {
  let vaultRolledEvent = changetype<VaultRolled>(newMockEvent())

  vaultRolledEvent.parameters = new Array()

  vaultRolledEvent.parameters.push(
    new ethereum.EventParam("vaultId", ethereum.Value.fromFixedBytes(vaultId))
  )
  vaultRolledEvent.parameters.push(
    new ethereum.EventParam("seriesId", ethereum.Value.fromFixedBytes(seriesId))
  )
  vaultRolledEvent.parameters.push(
    new ethereum.EventParam("art", ethereum.Value.fromUnsignedBigInt(art))
  )

  return vaultRolledEvent
}

export function createVaultStirredEvent(
  from: Bytes,
  to: Bytes,
  ink: BigInt,
  art: BigInt
): VaultStirred {
  let vaultStirredEvent = changetype<VaultStirred>(newMockEvent())

  vaultStirredEvent.parameters = new Array()

  vaultStirredEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromFixedBytes(from))
  )
  vaultStirredEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromFixedBytes(to))
  )
  vaultStirredEvent.parameters.push(
    new ethereum.EventParam("ink", ethereum.Value.fromUnsignedBigInt(ink))
  )
  vaultStirredEvent.parameters.push(
    new ethereum.EventParam("art", ethereum.Value.fromUnsignedBigInt(art))
  )

  return vaultStirredEvent
}

export function createVaultTweakedEvent(
  vaultId: Bytes,
  seriesId: Bytes,
  ilkId: Bytes
): VaultTweaked {
  let vaultTweakedEvent = changetype<VaultTweaked>(newMockEvent())

  vaultTweakedEvent.parameters = new Array()

  vaultTweakedEvent.parameters.push(
    new ethereum.EventParam("vaultId", ethereum.Value.fromFixedBytes(vaultId))
  )
  vaultTweakedEvent.parameters.push(
    new ethereum.EventParam("seriesId", ethereum.Value.fromFixedBytes(seriesId))
  )
  vaultTweakedEvent.parameters.push(
    new ethereum.EventParam("ilkId", ethereum.Value.fromFixedBytes(ilkId))
  )

  return vaultTweakedEvent
}
