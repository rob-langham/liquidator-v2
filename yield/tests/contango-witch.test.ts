import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  afterEach, assert, beforeAll, beforeEach, clearStore, describe,
  test
} from "matchstick-as/assembly/index";

import {handleLimitSet} from '../src/contango-witch';
import {createLimitSetEvent} from './contango-witch-utils';
// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

let baseId = Bytes.fromI32(1);
let ilkId = Bytes.fromI32(1);

describe("Witch Liquidation Config", () => {
  beforeAll(() => {});

  beforeEach(() => {
    // just ensures we are testing dynamic values, it's not necessary to do this
    baseId = Bytes.fromI32(baseId.toI32() + 149);
    ilkId = Bytes.fromI32(baseId.toI32() + 151);
  });

  afterEach(() => {
    clearStore();
  });

  test("should set flag to false when max is zero", () => {
    givenDebtLimitSet(0);

    assert.fieldEquals(
      "WitchLiquidatablePairs",
      ilkId.concat(baseId).toHex(),
      "liquidationsEnabled",
      "false"
    );
  })

  test("should set flag to true when max is zero", () => {
    givenDebtLimitSet(1);

    assert.fieldEquals(
      "WitchLiquidatablePairs",
      ilkId.concat(baseId).toHex(),
      "liquidationsEnabled",
      "true"
    );
  })

  test("should update existing entity", () => {
    givenDebtLimitSet(0);

    assert.fieldEquals(
      "WitchLiquidatablePairs",
      ilkId.concat(baseId).toHex(),
      "liquidationsEnabled",
      "false"
    );

    givenDebtLimitSet(1);

    assert.fieldEquals(
      "WitchLiquidatablePairs",
      ilkId.concat(baseId).toHex(),
      "liquidationsEnabled",
      "true"
    );

  })

});

function givenDebtLimitSet(max: i32): void {
  handleLimitSet(
    createLimitSetEvent(
      ilkId,
      baseId,
      BigInt.fromI32(max),
    )
  );
}
