import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  AssetAdded as AssetAddedEvent, IlkAdded as IlkAddedEvent, SeriesAdded as SeriesAddedEvent,
  SeriesMatured as SeriesMaturedEvent, VaultBuilt as VaultBuiltEvent,
  VaultDestroyed as VaultDestroyedEvent,
  VaultGiven as VaultGivenEvent,
  VaultPoured as VaultPouredEvent,
  VaultRolled as VaultRolledEvent,
  VaultStirred as VaultStirredEvent,
  VaultTweaked as VaultTweakedEvent
} from "../generated/ContangoCauldron/ContangoCauldron";
import { AssetEntity, InstrumentEntity, SeriesEntity, VaultEntity } from "../generated/schema";

export function handleAssetAdded(event: AssetAddedEvent): void {
  const asset = new AssetEntity(event.params.assetId.toHex());
  asset.assetId = event.params.assetId;
  asset.address = event.params.asset;
  asset.save();
}

export function handleIlkAdded(event: IlkAddedEvent): void {
  const instrument = new InstrumentEntity(event.params.seriesId.concat(event.params.ilkId));
  instrument.seriesId = event.params.seriesId;
  instrument.ilkId = event.params.ilkId;
  instrument.series = event.params.seriesId;
  instrument.save();
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

export function handleVaultBuilt(event: VaultBuiltEvent): void {
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
  storeVaultUpdate(event.params.vaultId, null, null, null, null, null, true);
  // store.remove('Vault', "0x" + BigInt.fromUnsignedBytes(event.params.vaultId).toHex().substring(2).padStart(24, '0'))
  // store.remove("Vault", event.params.vaultId.toHex());
}

export function handleVaultGiven(event: VaultGivenEvent): void {
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
