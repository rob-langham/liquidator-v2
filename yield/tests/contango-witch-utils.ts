import { newMockEvent } from "matchstick-as"
import { ethereum, Address, Bytes, BigInt } from "@graphprotocol/graph-ts"
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
} from "../generated/ContangoWitch/ContangoWitch"

export function createAnotherWitchSetEvent(
  value: Address,
  isWitch: boolean
): AnotherWitchSet {
  let anotherWitchSetEvent = changetype<AnotherWitchSet>(newMockEvent())

  anotherWitchSetEvent.parameters = new Array()

  anotherWitchSetEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromAddress(value))
  )
  anotherWitchSetEvent.parameters.push(
    new ethereum.EventParam("isWitch", ethereum.Value.fromBoolean(isWitch))
  )

  return anotherWitchSetEvent
}

export function createAuctionedEvent(
  vaultId: Bytes,
  auction: ethereum.Tuple,
  duration: BigInt,
  initialCollateralProportion: BigInt
): Auctioned {
  let auctionedEvent = changetype<Auctioned>(newMockEvent())

  auctionedEvent.parameters = new Array()

  auctionedEvent.parameters.push(
    new ethereum.EventParam("vaultId", ethereum.Value.fromFixedBytes(vaultId))
  )
  auctionedEvent.parameters.push(
    new ethereum.EventParam("auction", ethereum.Value.fromTuple(auction))
  )
  auctionedEvent.parameters.push(
    new ethereum.EventParam(
      "duration",
      ethereum.Value.fromUnsignedBigInt(duration)
    )
  )
  auctionedEvent.parameters.push(
    new ethereum.EventParam(
      "initialCollateralProportion",
      ethereum.Value.fromUnsignedBigInt(initialCollateralProportion)
    )
  )

  return auctionedEvent
}

export function createAuctioneerRewardSetEvent(
  auctioneerReward: BigInt
): AuctioneerRewardSet {
  let auctioneerRewardSetEvent = changetype<AuctioneerRewardSet>(newMockEvent())

  auctioneerRewardSetEvent.parameters = new Array()

  auctioneerRewardSetEvent.parameters.push(
    new ethereum.EventParam(
      "auctioneerReward",
      ethereum.Value.fromUnsignedBigInt(auctioneerReward)
    )
  )

  return auctioneerRewardSetEvent
}

export function createBoughtEvent(
  vaultId: Bytes,
  buyer: Address,
  ink: BigInt,
  art: BigInt
): Bought {
  let boughtEvent = changetype<Bought>(newMockEvent())

  boughtEvent.parameters = new Array()

  boughtEvent.parameters.push(
    new ethereum.EventParam("vaultId", ethereum.Value.fromFixedBytes(vaultId))
  )
  boughtEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  boughtEvent.parameters.push(
    new ethereum.EventParam("ink", ethereum.Value.fromUnsignedBigInt(ink))
  )
  boughtEvent.parameters.push(
    new ethereum.EventParam("art", ethereum.Value.fromUnsignedBigInt(art))
  )

  return boughtEvent
}

export function createCancelledEvent(vaultId: Bytes): Cancelled {
  let cancelledEvent = changetype<Cancelled>(newMockEvent())

  cancelledEvent.parameters = new Array()

  cancelledEvent.parameters.push(
    new ethereum.EventParam("vaultId", ethereum.Value.fromFixedBytes(vaultId))
  )

  return cancelledEvent
}

export function createEndedEvent(vaultId: Bytes): Ended {
  let endedEvent = changetype<Ended>(newMockEvent())

  endedEvent.parameters = new Array()

  endedEvent.parameters.push(
    new ethereum.EventParam("vaultId", ethereum.Value.fromFixedBytes(vaultId))
  )

  return endedEvent
}

export function createLimitSetEvent(
  ilkId: Bytes,
  baseId: Bytes,
  max: BigInt
): LimitSet {
  let limitSetEvent = changetype<LimitSet>(newMockEvent())

  limitSetEvent.parameters = new Array()

  limitSetEvent.parameters.push(
    new ethereum.EventParam("ilkId", ethereum.Value.fromFixedBytes(ilkId))
  )
  limitSetEvent.parameters.push(
    new ethereum.EventParam("baseId", ethereum.Value.fromFixedBytes(baseId))
  )
  limitSetEvent.parameters.push(
    new ethereum.EventParam("max", ethereum.Value.fromUnsignedBigInt(max))
  )

  return limitSetEvent
}

export function createLineSetEvent(
  ilkId: Bytes,
  baseId: Bytes,
  duration: BigInt,
  vaultProportion: BigInt,
  collateralProportion: BigInt
): LineSet {
  let lineSetEvent = changetype<LineSet>(newMockEvent())

  lineSetEvent.parameters = new Array()

  lineSetEvent.parameters.push(
    new ethereum.EventParam("ilkId", ethereum.Value.fromFixedBytes(ilkId))
  )
  lineSetEvent.parameters.push(
    new ethereum.EventParam("baseId", ethereum.Value.fromFixedBytes(baseId))
  )
  lineSetEvent.parameters.push(
    new ethereum.EventParam(
      "duration",
      ethereum.Value.fromUnsignedBigInt(duration)
    )
  )
  lineSetEvent.parameters.push(
    new ethereum.EventParam(
      "vaultProportion",
      ethereum.Value.fromUnsignedBigInt(vaultProportion)
    )
  )
  lineSetEvent.parameters.push(
    new ethereum.EventParam(
      "collateralProportion",
      ethereum.Value.fromUnsignedBigInt(collateralProportion)
    )
  )

  return lineSetEvent
}

export function createPointEvent(
  param: Bytes,
  oldValue: Address,
  newValue: Address
): Point {
  let pointEvent = changetype<Point>(newMockEvent())

  pointEvent.parameters = new Array()

  pointEvent.parameters.push(
    new ethereum.EventParam("param", ethereum.Value.fromFixedBytes(param))
  )
  pointEvent.parameters.push(
    new ethereum.EventParam("oldValue", ethereum.Value.fromAddress(oldValue))
  )
  pointEvent.parameters.push(
    new ethereum.EventParam("newValue", ethereum.Value.fromAddress(newValue))
  )

  return pointEvent
}

export function createContangoWitchRoleAdminChangedEvent(
  role: Bytes,
  newAdminRole: Bytes
): ContangoWitchRoleAdminChanged {
  let contangoWitchRoleAdminChangedEvent = changetype<
    ContangoWitchRoleAdminChanged
  >(newMockEvent())

  contangoWitchRoleAdminChangedEvent.parameters = new Array()

  contangoWitchRoleAdminChangedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  contangoWitchRoleAdminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "newAdminRole",
      ethereum.Value.fromFixedBytes(newAdminRole)
    )
  )

  return contangoWitchRoleAdminChangedEvent
}

export function createContangoWitchRoleGrantedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): ContangoWitchRoleGranted {
  let contangoWitchRoleGrantedEvent = changetype<ContangoWitchRoleGranted>(
    newMockEvent()
  )

  contangoWitchRoleGrantedEvent.parameters = new Array()

  contangoWitchRoleGrantedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  contangoWitchRoleGrantedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  contangoWitchRoleGrantedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return contangoWitchRoleGrantedEvent
}

export function createContangoWitchRoleRevokedEvent(
  role: Bytes,
  account: Address,
  sender: Address
): ContangoWitchRoleRevoked {
  let contangoWitchRoleRevokedEvent = changetype<ContangoWitchRoleRevoked>(
    newMockEvent()
  )

  contangoWitchRoleRevokedEvent.parameters = new Array()

  contangoWitchRoleRevokedEvent.parameters.push(
    new ethereum.EventParam("role", ethereum.Value.fromFixedBytes(role))
  )
  contangoWitchRoleRevokedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  contangoWitchRoleRevokedEvent.parameters.push(
    new ethereum.EventParam("sender", ethereum.Value.fromAddress(sender))
  )

  return contangoWitchRoleRevokedEvent
}
