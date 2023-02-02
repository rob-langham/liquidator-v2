import { BigInt, Bytes } from "@graphprotocol/graph-ts";
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
} from "../generated/ContangoCauldron/ContangoCauldron";
import {
  AssetEntity, DebtLimitsSet, InstrumentEntity,
  RateOracleAdded,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  SeriesEntity,
  SpotOracleAdded, VaultBuilt,
  VaultDestroyed, VaultEntity, VaultGiven,
  VaultPoured,
  VaultRolled,
  VaultStirred,
  VaultTweaked
} from "../generated/schema";

export function handleAssetAdded(event: AssetAddedEvent): void {
  const asset = new AssetEntity(event.params.assetId.toHex());
  asset.assetId = event.params.assetId;
  asset.address = event.params.asset;
  asset.save();
}

export function handleDebtLimitsSet(event: DebtLimitsSetEvent): void {
  let entity = new DebtLimitsSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.baseId = event.params.baseId;
  entity.ilkId = event.params.ilkId;
  entity.max = event.params.max;
  entity.min = event.params.min;
  entity.dec = event.params.dec;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.index = event.block.number.leftShift(32).plus(event.logIndex);

  entity.save();
}

export function handleIlkAdded(event: IlkAddedEvent): void {
  const instrument = new InstrumentEntity(event.params.seriesId.concat(event.params.ilkId));
  instrument.seriesId = event.params.seriesId;
  instrument.ilkId = event.params.ilkId;
  instrument.series = event.params.seriesId;
  instrument.save();
}

export function handleRateOracleAdded(event: RateOracleAddedEvent): void {
  let entity = new RateOracleAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.baseId = event.params.baseId;
  entity.oracle = event.params.oracle;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.index = event.block.number.leftShift(32).plus(event.logIndex);

  entity.save();
}

export function handleRoleAdminChanged(event: RoleAdminChangedEvent): void {
  let entity = new RoleAdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.newAdminRole = event.params.newAdminRole;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.index = event.block.number.leftShift(32).plus(event.logIndex);

  entity.save();
}

export function handleRoleGranted(event: RoleGrantedEvent): void {
  let entity = new RoleGranted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.index = event.block.number.leftShift(32).plus(event.logIndex);

  entity.save();
}

export function handleRoleRevoked(event: RoleRevokedEvent): void {
  let entity = new RoleRevoked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.role = event.params.role;
  entity.account = event.params.account;
  entity.sender = event.params.sender;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.index = event.block.number.leftShift(32).plus(event.logIndex);

  entity.save();
}

export function handleSeriesAdded(event: SeriesAddedEvent): void {
  let entity = new SeriesEntity(event.params.seriesId);
  entity.baseId = event.params.baseId;
  entity.fyToken = event.params.fyToken;
  entity.matured = false;
  entity.asset = event.params.baseId.toHex();

  entity.save();
}

export function handleSeriesMatured(event: SeriesMaturedEvent): void {
  let entity = SeriesEntity.load(event.params.seriesId);

  if (entity != null) {
    entity.matured = true;
    entity.save();
  }
}

export function handleSpotOracleAdded(event: SpotOracleAddedEvent): void {
  let entity = new SpotOracleAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.baseId = event.params.baseId;
  entity.ilkId = event.params.ilkId;
  entity.oracle = event.params.oracle;
  entity.ratio = event.params.ratio;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.index = event.block.number.leftShift(32).plus(event.logIndex);

  entity.save();
}

export function handleVaultBuilt(event: VaultBuiltEvent): void {
  let entity = new VaultBuilt(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.vaultId = event.params.vaultId;
  entity.owner = event.params.owner;
  entity.seriesId = event.params.seriesId;
  entity.ilkId = event.params.ilkId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.index = event.block.number.leftShift(32).plus(event.logIndex);

  entity.save();

  storeVaultUpdate(
    event.params.vaultId,
    event.params.seriesId,
    event.params.ilkId,
    null,
    null,
    event.params.owner,
    true
  );
}

export function handleVaultDestroyed(event: VaultDestroyedEvent): void {
  let entity = new VaultDestroyed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.vaultId = event.params.vaultId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.index = event.block.number.leftShift(32).plus(event.logIndex);

  entity.save();

  storeVaultUpdate(event.params.vaultId, null, null, null, null, null, true);

  // store.remove('Vault', "0x" + BigInt.fromUnsignedBytes(event.params.vaultId).toHex().substring(2).padStart(24, '0'))
  // store.remove("Vault", event.params.vaultId.toHex());
}

export function handleVaultGiven(event: VaultGivenEvent): void {
  let entity = new VaultGiven(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.vaultId = event.params.vaultId;
  entity.receiver = event.params.receiver;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.index = event.block.number.leftShift(32).plus(event.logIndex);

  entity.save();

  storeVaultUpdate(
    event.params.vaultId,
    null,
    null,
    null,
    null,
    event.params.receiver,
    true
  );
}

export function handleVaultPoured(event: VaultPouredEvent): void {
  let entity = new VaultPoured(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.vaultId = event.params.vaultId;
  entity.seriesId = event.params.seriesId;
  entity.ilkId = event.params.ilkId;
  entity.ink = event.params.ink;
  entity.art = event.params.art;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.index = event.block.number.leftShift(32).plus(event.logIndex);

  entity.save();

  storeVaultUpdate(
    event.params.vaultId,
    event.params.seriesId,
    event.params.ilkId,
    event.params.ink,
    event.params.art,
    null,
    true
  );
}

export function handleVaultRolled(event: VaultRolledEvent): void {
  let entity = new VaultRolled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.vaultId = event.params.vaultId;
  entity.seriesId = event.params.seriesId;
  entity.art = event.params.art;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.index = event.block.number.leftShift(32).plus(event.logIndex);

  entity.save();

  storeVaultUpdate(
    event.params.vaultId,
    event.params.seriesId,
    null,
    null,
    event.params.art,
    null,
    false
  );
}

export function handleVaultStirred(event: VaultStirredEvent): void {
  let entity = new VaultStirred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.from = event.params.from;
  entity.to = event.params.to;
  entity.ink = event.params.ink;
  entity.art = event.params.art;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.index = event.block.number.leftShift(32).plus(event.logIndex);

  entity.save();

  storeVaultUpdate(
    event.params.from,
    null,
    null,
    event.params.ink.neg(),
    event.params.art.neg(),
    null,
    true
  );
  storeVaultUpdate(
    event.params.to,
    null,
    null,
    event.params.ink,
    event.params.art,
    null,
    true
  );
}

export function handleVaultTweaked(event: VaultTweakedEvent): void {
  let entity = new VaultTweaked(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.vaultId = event.params.vaultId;
  entity.seriesId = event.params.seriesId;
  entity.ilkId = event.params.ilkId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.index = event.block.number.leftShift(32).plus(event.logIndex);

  entity.save();

  storeVaultUpdate(
    event.params.vaultId,
    event.params.seriesId,
    event.params.ilkId,
    null,
    null,
    null,
    true
  );
}

function storeVaultUpdate(
  vaultId: Bytes,
  seriesId: Bytes | null,
  ilkId: Bytes | null,
  ink: BigInt | null,
  art: BigInt | null,
  owner: Bytes | null,
  delta: boolean = false
): void {
  let entity = VaultEntity.load(vaultId);

  if (!entity) {
    entity = new VaultEntity(vaultId);
    entity.ink = ink ? entity.ink : BigInt.fromI32(0);
    entity.art = art ? entity.art : BigInt.fromI32(0);
  } else {
    entity.ink = ink ? (delta ? entity.ink.plus(ink) : ink) : entity.ink;
    entity.art = art ? (delta ? entity.art.plus(art) : art) : entity.art;
  }

  if(entity.ink.gt(BigInt.fromI32(0))) {
    entity.ratio = entity.art.leftShift(64).div(entity.ink);
  } else {
    entity.ratio = BigInt.fromI32(0);
  }

  if (owner) {
    entity.owner = owner;
  }

  if (seriesId) {
    entity.seriesId = seriesId;
  }

  if (ilkId) {
    entity.ilkId = ilkId;
  }

  if(seriesId && ilkId) {
    entity.instrument = seriesId.concat(ilkId);
  }

  entity.save();
}
