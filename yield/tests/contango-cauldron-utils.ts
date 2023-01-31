import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AssetAdded,
  DebtLimitsSet,
  IlkAdded,
  RateOracleAdded,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  SeriesAdded,
  SeriesMatured,
  SpotOracleAdded,
  VaultBuilt,
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

export function createDebtLimitsSetEvent(
  baseId: Bytes,
  ilkId: Bytes,
  max: BigInt,
  min: i32,
  dec: i32
): DebtLimitsSet {
  let debtLimitsSetEvent = changetype<DebtLimitsSet>(newMockEvent())

  debtLimitsSetEvent.parameters = new Array()

  debtLimitsSetEvent.parameters.push(
    new ethereum.EventParam("baseId", ethereum.Value.fromFixedBytes(baseId))
  )
  debtLimitsSetEvent.parameters.push(
    new ethereum.EventParam("ilkId", ethereum.Value.fromFixedBytes(ilkId))
  )
  debtLimitsSetEvent.parameters.push(
    new ethereum.EventParam("max", ethereum.Value.fromUnsignedBigInt(max))
  )
  debtLimitsSetEvent.parameters.push(
    new ethereum.EventParam(
      "min",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(min))
    )
  )
  debtLimitsSetEvent.parameters.push(
    new ethereum.EventParam(
      "dec",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(dec))
    )
  )

  return debtLimitsSetEvent
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

export function createRateOracleAddedEvent(
  baseId: Bytes,
  oracle: Address
): RateOracleAdded {
  let rateOracleAddedEvent = changetype<RateOracleAdded>(newMockEvent())

  rateOracleAddedEvent.parameters = new Array()

  rateOracleAddedEvent.parameters.push(
    new ethereum.EventParam("baseId", ethereum.Value.fromFixedBytes(baseId))
  )
  rateOracleAddedEvent.parameters.push(
    new ethereum.EventParam("oracle", ethereum.Value.fromAddress(oracle))
  )

  return rateOracleAddedEvent
}

export function createRoleAdminChangedEvent(
  role: Bytes,
  newAdminRole: Bytes
): RoleAdminChanged {
  let roleAdminChangedEvent = changetype<RoleAdminChanged>(newMockEvent())

  roleAdminChangedEvent.parameters = new Array()

  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return roleAdminChangedEvent
}

export function createRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleGranted {
  let roleGrantedEvent = changetype<RoleGranted>(newMockEvent())

  roleGrantedEvent.parameters = new Array()

  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleGrantedEvent
}

export function createRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): RoleRevoked {
  let roleRevokedEvent = changetype<RoleRevoked>(newMockEvent())

  roleRevokedEvent.parameters = new Array()

  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  roleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return roleRevokedEvent
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

export function createSpotOracleAddedEvent(
  baseId: Bytes,
  ilkId: Bytes,
  oracle: Address,
  ratio: BigInt
): SpotOracleAdded {
  let spotOracleAddedEvent = changetype<SpotOracleAdded>(newMockEvent())

  spotOracleAddedEvent.parameters = new Array()

  spotOracleAddedEvent.parameters.push(
    new ethereum.EventParam("baseId", ethereum.Value.fromFixedBytes(baseId))
  )
  spotOracleAddedEvent.parameters.push(
    new ethereum.EventParam("ilkId", ethereum.Value.fromFixedBytes(ilkId))
  )
  spotOracleAddedEvent.parameters.push(
    new ethereum.EventParam("oracle", ethereum.Value.fromAddress(oracle))
  )
  spotOracleAddedEvent.parameters.push(
    new ethereum.EventParam("ratio", ethereum.Value.fromUnsignedBigInt(ratio))
  )

  return spotOracleAddedEvent
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
