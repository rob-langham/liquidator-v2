import {
  AnotherWitchSet as AnotherWitchSetEvent,
  Auctioned as AuctionedEvent,
  AuctioneerRewardSet as AuctioneerRewardSetEvent,
  Bought as BoughtEvent,
  Cancelled as CancelledEvent,
  Ended as EndedEvent,
  LimitSet as LimitSetEvent,
  LineSet as LineSetEvent,
  Point as PointEvent,
  ContangoWitchRoleAdminChanged as ContangoWitchRoleAdminChangedEvent,
  ContangoWitchRoleGranted as ContangoWitchRoleGrantedEvent,
  ContangoWitchRoleRevoked as ContangoWitchRoleRevokedEvent
} from "../generated/ContangoWitch/ContangoWitch"
import {
  AnotherWitchSet,
  Auctioned,
  AuctioneerRewardSet,
  Bought,
  Cancelled,
  Ended,
  LimitSet,
  LineSet,
  Point,
  ContangoWitchRoleAdminChanged,
  ContangoWitchRoleGranted,
  ContangoWitchRoleRevoked
} from "../generated/schema"

export function handleAnotherWitchSet(event: AnotherWitchSetEvent): void {
  let entity = new AnotherWitchSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.value = event.params.value
  entity.isWitch = event.params.isWitch

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.index = event.block.number.leftShift(32).plus(event.logIndex)

  entity.save()
}

export function handleAuctioned(event: AuctionedEvent): void {
  let entity = new Auctioned(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.vaultId = event.params.vaultId
  entity.auction_owner = event.params.auction.owner
  entity.auction_start = event.params.auction.start
  entity.auction_baseId = event.params.auction.baseId
  entity.auction_ink = event.params.auction.ink
  entity.auction_art = event.params.auction.art
  entity.auction_auctioneer = event.params.auction.auctioneer
  entity.auction_ilkId = event.params.auction.ilkId
  entity.auction_seriesId = event.params.auction.seriesId
  entity.duration = event.params.duration
  entity.initialCollateralProportion = event.params.initialCollateralProportion

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.index = event.block.number.leftShift(32).plus(event.logIndex)

  entity.save()
}

export function handleAuctioneerRewardSet(
  event: AuctioneerRewardSetEvent
): void {
  let entity = new AuctioneerRewardSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.auctioneerReward = event.params.auctioneerReward

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.index = event.block.number.leftShift(32).plus(event.logIndex)

  entity.save()
}

export function handleBought(event: BoughtEvent): void {
  let entity = new Bought(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.vaultId = event.params.vaultId
  entity.buyer = event.params.buyer
  entity.ink = event.params.ink
  entity.art = event.params.art

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.index = event.block.number.leftShift(32).plus(event.logIndex)

  entity.save()
}

export function handleCancelled(event: CancelledEvent): void {
  let entity = new Cancelled(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.vaultId = event.params.vaultId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.index = event.block.number.leftShift(32).plus(event.logIndex)

  entity.save()
}

export function handleEnded(event: EndedEvent): void {
  let entity = new Ended(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.vaultId = event.params.vaultId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.index = event.block.number.leftShift(32).plus(event.logIndex)

  entity.save()
}

export function handleLimitSet(event: LimitSetEvent): void {
  let entity = new LimitSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ilkId = event.params.ilkId
  entity.baseId = event.params.baseId
  entity.max = event.params.max

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.index = event.block.number.leftShift(32).plus(event.logIndex)

  entity.save()
}

export function handleLineSet(event: LineSetEvent): void {
  let entity = new LineSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.ilkId = event.params.ilkId
  entity.baseId = event.params.baseId
  entity.duration = event.params.duration
  entity.vaultProportion = event.params.vaultProportion
  entity.collateralProportion = event.params.collateralProportion

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.index = event.block.number.leftShift(32).plus(event.logIndex)

  entity.save()
}

export function handlePoint(event: PointEvent): void {
  let entity = new Point(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.param = event.params.param
  entity.oldValue = event.params.oldValue
  entity.newValue = event.params.newValue

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash
  entity.index = event.block.number.leftShift(32).plus(event.logIndex)

  entity.save()
}

export function handleContangoWitchRoleAdminChanged(
  event: ContangoWitchRoleAdminChangedEvent
): void {
  let entity = new ContangoWitchRoleAdminChanged(
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

export function handleContangoWitchRoleGranted(
  event: ContangoWitchRoleGrantedEvent
): void {
  let entity = new ContangoWitchRoleGranted(
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

export function handleContangoWitchRoleRevoked(
  event: ContangoWitchRoleRevokedEvent
): void {
  let entity = new ContangoWitchRoleRevoked(
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
