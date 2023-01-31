import {
  AssetAdded as AssetAddedEvent,
  DebtLimitsSet as DebtLimitsSetEvent,
  IlkAdded as IlkAddedEvent,
  RateOracleAdded as RateOracleAddedEvent,
  RoleAdminChanged as RoleAdminChangedEvent,
  RoleGranted as RoleGrantedEvent,
  RoleRevoked as RoleRevokedEvent,
  SeriesAdded as SeriesAddedEvent,
  SeriesMatured as SeriesMaturedEvent,
  SpotOracleAdded as SpotOracleAddedEvent,
  VaultBuilt as VaultBuiltEvent,
  VaultDestroyed as VaultDestroyedEvent,
  VaultGiven as VaultGivenEvent,
  VaultPoured as VaultPouredEvent,
  VaultRolled as VaultRolledEvent,
  VaultStirred as VaultStirredEvent,
  VaultTweaked as VaultTweakedEvent
} from "../generated/ContangoCauldron/ContangoCauldron"
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
} from "../generated/schema"

export function handleAssetAdded(event: AssetAddedEvent): void {
  let entity = new AssetAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.assetId = event.params.assetId
  entity.asset = event.params.asset

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.index = event.block.number.leftShift(32).plus(event.logIndex)

  entity.save()
}

export function handleDebtLimitsSet(event: DebtLimitsSetEvent): void {
  let entity = new DebtLimitsSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.baseId = event.params.baseId
  entity.ilkId = event.params.ilkId
  entity.max = event.params.max
  entity.min = event.params.min
  entity.dec = event.params.dec

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.index = event.block.number.leftShift(32).plus(event.logIndex)

  entity.save()
}

export function handleIlkAdded(event: IlkAddedEvent): void {
  let entity = new IlkAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.seriesId = event.params.seriesId
  entity.ilkId = event.params.ilkId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.index = event.block.number.leftShift(32).plus(event.logIndex)

  entity.save()
}

export function handleRateOracleAdded(event: RateOracleAddedEvent): void {
  let entity = new RateOracleAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.baseId = event.params.baseId
  entity.oracle = event.params.oracle

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.index = event.block.number.leftShift(32).plus(event.logIndex)

  entity.save()
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.newAdminRole = event.params.newAdminRole

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.index = event.block.number.leftShift(32).plus(event.logIndex)

  entity.save()
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.index = event.block.number.leftShift(32).plus(event.logIndex)

  entity.save()
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.role = event.params.role
  entity.account = event.params.account
  entity.sender = event.params.sender

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.index = event.block.number.leftShift(32).plus(event.logIndex)

  entity.save()
}

export function handleSeriesAdded(event: SeriesAddedEvent): void {
  let entity = new SeriesAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.seriesId = event.params.seriesId
  entity.baseId = event.params.baseId
  entity.fyToken = event.params.fyToken

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.index = event.block.number.leftShift(32).plus(event.logIndex)

  entity.save()
}

export function handleSeriesMatured(event: SeriesMaturedEvent): void {
  let entity = new SeriesMatured(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.seriesId = event.params.seriesId
  entity.rateAtMaturity = event.params.rateAtMaturity

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.index = event.block.number.leftShift(32).plus(event.logIndex)

  entity.save()
}

export function handleSpotOracleAdded(event: SpotOracleAddedEvent): void {
  let entity = new SpotOracleAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.baseId = event.params.baseId
  entity.ilkId = event.params.ilkId
  entity.oracle = event.params.oracle
  entity.ratio = event.params.ratio

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.index = event.block.number.leftShift(32).plus(event.logIndex)

  entity.save()
}

export function handleVaultBuilt(event: VaultBuiltEvent): void {
  let entity = new VaultBuilt(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.vaultId = event.params.vaultId
  entity.owner = event.params.owner
  entity.seriesId = event.params.seriesId
  entity.ilkId = event.params.ilkId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.index = event.block.number.leftShift(32).plus(event.logIndex)

  entity.save()
}

export function handleVaultDestroyed(event: VaultDestroyedEvent): void {
  let entity = new VaultDestroyed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.vaultId = event.params.vaultId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.index = event.block.number.leftShift(32).plus(event.logIndex)

  entity.save()
}

export function handleVaultGiven(event: VaultGivenEvent): void {
  let entity = new VaultGiven(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.vaultId = event.params.vaultId
  entity.receiver = event.params.receiver

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.index = event.block.number.leftShift(32).plus(event.logIndex)

  entity.save()
}

export function handleVaultPoured(event: VaultPouredEvent): void {
  let entity = new VaultPoured(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.vaultId = event.params.vaultId
  entity.seriesId = event.params.seriesId
  entity.ilkId = event.params.ilkId
  entity.ink = event.params.ink
  entity.art = event.params.art

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.index = event.block.number.leftShift(32).plus(event.logIndex)

  entity.save()
}

export function handleVaultRolled(event: VaultRolledEvent): void {
  let entity = new VaultRolled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.vaultId = event.params.vaultId
  entity.seriesId = event.params.seriesId
  entity.art = event.params.art

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.index = event.block.number.leftShift(32).plus(event.logIndex)

  entity.save()
}

export function handleVaultStirred(event: VaultStirredEvent): void {
  let entity = new VaultStirred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.ink = event.params.ink
  entity.art = event.params.art

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.index = event.block.number.leftShift(32).plus(event.logIndex)

  entity.save()
}

export function handleVaultTweaked(event: VaultTweakedEvent): void {
  let entity = new VaultTweaked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.vaultId = event.params.vaultId
  entity.seriesId = event.params.seriesId
  entity.ilkId = event.params.ilkId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.index = event.block.number.leftShift(32).plus(event.logIndex)

  entity.save()
}
