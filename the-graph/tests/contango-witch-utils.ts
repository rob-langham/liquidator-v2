import { BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts"
import { newMockEvent } from "matchstick-as"
import {
  LimitSet
} from "../generated/ContangoWitch/ContangoWitch"

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
