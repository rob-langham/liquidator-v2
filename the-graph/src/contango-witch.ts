import { BigInt } from "@graphprotocol/graph-ts"
import {
  LimitSet as LimitSetEvent
} from "../generated/ContangoWitch/ContangoWitch"
import { LiquidatablePairEntity } from "../generated/schema"

export function handleLimitSet(event: LimitSetEvent): void {

  const id = event.params.ilkId.concat(event.params.baseId)

  let entity = LiquidatablePairEntity.load(id)

  if (entity == null) {
    entity = new LiquidatablePairEntity(id)
    entity.ilkId = event.params.ilkId
    entity.baseId = event.params.baseId
    entity.asset = event.params.baseId.toHex()
  }

  entity.liquidationsEnabled = event.params.max.gt(BigInt.fromI32(0))

  entity.save()
}
