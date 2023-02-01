import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
  beforeEach,
  afterEach,
} from "matchstick-as/assembly/index";
import { Bytes, Address, BigInt, Entity } from "@graphprotocol/graph-ts";
import { AssetAdded } from "../generated/schema";
import { AssetAdded as AssetAddedEvent } from "../generated/ContangoCauldron/ContangoCauldron";
import {
  handleAssetAdded,
  handleVaultBuilt,
  handleVaultDestroyed,
  handleVaultGiven,
  handleVaultPoured,
  handleVaultRolled,
  handleVaultStirred,
  handleVaultTweaked,
} from "../src/contango-cauldron";
import {
  createAssetAddedEvent,
  createVaultBuiltEvent,
  createVaultDestroyedEvent,
  createVaultGivenEvent,
  createVaultPouredEvent,
  createVaultRolledEvent,
  createVaultStirredEvent,
  createVaultTweakedEvent,
} from "./contango-cauldron-utils";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

let vaultId = Bytes.fromI32(2);
let seriesId = Bytes.fromI32(1);
let ilkId = Bytes.fromI32(1);
let owner = Address.fromString("0x0000000000000000000000000000000000000001");

describe("Vault events", () => {
  beforeAll(() => {});

  beforeEach(() => {
    // just ensures we are testing dynamic values, it's not necessary to do this
    seriesId = Bytes.fromI32(seriesId.toI32() + 149);
    ilkId = Bytes.fromI32(seriesId.toI32() + 151);
  });

  afterEach(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("VaultBuilt", () => {
    givenVaultBuiltEvent();

    assert.entityCount("Vault", 1);
    thenVaultOwnerShouldMatch(vaultId, owner);
    thenVaultAssestShouldMatch(vaultId, seriesId, ilkId);
    thenVaultBalanceShouldMatch(vaultId, BigInt.fromI32(0), BigInt.fromI32(0));
  });

  describe("Vault poured", () => {
    test("should set initial balance", () => {
      givenVaultBuiltEvent();
      givenVaultPouredEvent(BigInt.fromI32(100), BigInt.fromI32(200));

      thenVaultBalanceShouldMatch(
        vaultId,
        BigInt.fromI32(100),
        BigInt.fromI32(200)
      );
      assert.entityCount("Vault", 1);
    });

    test("should set delat on ink", () => {
      givenVaultBuiltEvent();
      givenVaultPouredEvent(BigInt.fromI32(100), BigInt.fromI32(200));
      givenVaultPouredEvent(BigInt.fromI32(-50), BigInt.fromI32(0));

      assert.entityCount("Vault", 1);
      thenVaultBalanceShouldMatch(
        vaultId,
        BigInt.fromI32(50),
        BigInt.fromI32(200)
      );
    });

    test("should set delta on art", () => {
      givenVaultBuiltEvent();
      givenVaultPouredEvent(BigInt.fromI32(100), BigInt.fromI32(200));
      givenVaultPouredEvent(BigInt.fromI32(0), BigInt.fromI32(-150));

      assert.entityCount("Vault", 1);
      thenVaultBalanceShouldMatch(
        vaultId,
        BigInt.fromI32(100),
        BigInt.fromI32(50)
      );
    });

    test("should set delta on both", () => {
      givenVaultBuiltEvent();
      givenVaultPouredEvent(BigInt.fromI32(100), BigInt.fromI32(200));
      givenVaultPouredEvent(BigInt.fromI32(-50), BigInt.fromI32(-150));

      assert.entityCount("Vault", 1);
      thenVaultBalanceShouldMatch(
        vaultId,
        BigInt.fromI32(50),
        BigInt.fromI32(50)
      );
    });

    test("should not change owner", () => {
      givenVaultBuiltEvent();
      givenVaultPouredEvent(BigInt.fromI32(100), BigInt.fromI32(200));

      assert.entityCount("Vault", 1);
      thenVaultOwnerShouldMatch(vaultId, owner);
    });

    test("should not change asset types", () => {
      givenVaultBuiltEvent();
      givenVaultPouredEvent(BigInt.fromI32(100), BigInt.fromI32(200));

      assert.entityCount("Vault", 1);
      thenVaultAssestShouldMatch(vaultId, seriesId, ilkId);
    });
  });

  describe("VaultTweaked", () => {
    test("should update seriesId", () => {
      givenVaultBuiltEvent();
      givenVaultTweakedEvent(vaultId, Bytes.fromI32(2), ilkId);

      assert.entityCount("Vault", 1);
      thenVaultOwnerShouldMatch(vaultId, owner);
      thenVaultAssestShouldMatch(vaultId, Bytes.fromI32(2), ilkId);
      thenVaultBalanceShouldMatch(
        vaultId,
        BigInt.fromI32(0),
        BigInt.fromI32(0)
      );
    });

    test("should update ilkId", () => {
      givenVaultBuiltEvent();
      givenVaultTweakedEvent(vaultId, seriesId, Bytes.fromI32(2));

      assert.entityCount("Vault", 1);
      thenVaultOwnerShouldMatch(vaultId, owner);
      thenVaultAssestShouldMatch(vaultId, seriesId, Bytes.fromI32(2));
      thenVaultBalanceShouldMatch(
        vaultId,
        BigInt.fromI32(0),
        BigInt.fromI32(0)
      );
    });

    test("should not update owner", () => {
      givenVaultBuiltEvent();
      givenVaultTweakedEvent(vaultId, seriesId, Bytes.fromI32(2));

      assert.entityCount("Vault", 1);
      thenVaultOwnerShouldMatch(vaultId, owner);
    });

    test("should not update balances", () => {
      givenVaultBuiltEvent();
      givenVaultTweakedEvent(vaultId, seriesId, Bytes.fromI32(2));

      assert.entityCount("Vault", 1);
      thenVaultBalanceShouldMatch(
        vaultId,
        BigInt.fromI32(0),
        BigInt.fromI32(0)
      );
    });
  });

  describe("VaultRolled", () => {
    test("should not update owner", () => {
      givenVaultBuiltEvent();
      givenVaultRolledEvent(vaultId, seriesId, BigInt.fromI32(200));

      assert.entityCount("Vault", 1);
      thenVaultOwnerShouldMatch(vaultId, owner);
    });

    test("should not update ilkId", () => {
      givenVaultBuiltEvent();
      givenVaultRolledEvent(vaultId, Bytes.fromI32(4), BigInt.fromI32(200));

      assert.entityCount("Vault", 1);
      thenVaultAssestShouldMatch(vaultId, Bytes.fromI32(4), ilkId);
    });

    test("should not update ink", () => {
      givenVaultBuiltEvent();
      givenVaultRolledEvent(vaultId, seriesId, BigInt.fromI32(200));

      assert.entityCount("Vault", 1);
      thenVaultBalanceShouldMatch(vaultId, BigInt.fromI32(0), null);
    });

    test("should update seriesId", () => {
      givenVaultBuiltEvent();
      givenVaultRolledEvent(vaultId, Bytes.fromI32(4), BigInt.fromI32(200));

      assert.entityCount("Vault", 1);
      thenVaultAssestShouldMatch(vaultId, Bytes.fromI32(4), ilkId);
    });

    test("should update art", () => {
      givenVaultBuiltEvent();
      givenVaultRolledEvent(vaultId, seriesId, BigInt.fromI32(200));

      assert.entityCount("Vault", 1);
      thenVaultBalanceShouldMatch(
        vaultId,
        BigInt.fromI32(0),
        BigInt.fromI32(200)
      );
    });
  });

  describe("VaultGiven", () => {
    test("should update owner", () => {
      givenVaultBuiltEvent();
      givenVaultGivenEvent(
        vaultId,
        Address.fromString("0x0003000600000800000000000000000000000002")
      );

      assert.entityCount("Vault", 1);
      thenVaultOwnerShouldMatch(
        vaultId,
        Address.fromString("0x0003000600000800000000000000000000000002")
      );
    });

    test("should not update asset types", () => {
      givenVaultBuiltEvent();
      givenVaultGivenEvent(
        vaultId,
        Address.fromString("0x0003000600000800000000000000000000000002")
      );

      assert.entityCount("Vault", 1);
      thenVaultAssestShouldMatch(vaultId, seriesId, ilkId);
    });

    test("should not update balances", () => {
      givenVaultBuiltEvent();
      givenVaultPouredEvent(BigInt.fromI32(100), BigInt.fromI32(200));
      givenVaultGivenEvent(
        vaultId,
        Address.fromString("0x0003000600000800000000000000000000000002")
      );

      assert.entityCount("Vault", 1);
      thenVaultBalanceShouldMatch(
        vaultId,
        BigInt.fromI32(100),
        BigInt.fromI32(200)
      );
    });
  });

  describe("VaultStirred", () => {
    test("should update balances of both vaults", () => {
      givenVaultBuiltEvent();
      givenVaultPouredEvent(BigInt.fromI32(100), BigInt.fromI32(200));
      const firstVaultId = vaultId;
      givenVaultBuiltEvent();
      givenVaultPouredEvent(BigInt.fromI32(250), BigInt.fromI32(340));
      const secondVaultId = vaultId;

      whenVaultStirredEvent(
        firstVaultId,
        secondVaultId,
        BigInt.fromI32(50),
        BigInt.fromI32(60)
      );

      assert.entityCount("Vault", 2);
      thenVaultBalanceShouldMatch(
        firstVaultId,
        BigInt.fromI32(50),
        BigInt.fromI32(140)
      );
      thenVaultBalanceShouldMatch(
        secondVaultId,
        BigInt.fromI32(300),
        BigInt.fromI32(400)
      );
    });

    test("should not update asset types", () => {
      givenVaultBuiltEvent();
      givenVaultPouredEvent(BigInt.fromI32(100), BigInt.fromI32(200));
      const firstVaultId = vaultId;
      givenVaultBuiltEvent();
      givenVaultPouredEvent(BigInt.fromI32(250), BigInt.fromI32(340));
      const secondVaultId = vaultId;

      whenVaultStirredEvent(
        firstVaultId,
        secondVaultId,
        BigInt.fromI32(50),
        BigInt.fromI32(60)
      );

      assert.entityCount("Vault", 2);
      thenVaultAssestShouldMatch(firstVaultId, seriesId, ilkId);
      thenVaultAssestShouldMatch(secondVaultId, seriesId, ilkId);
    });

    test("should not update the owner", () => {
      givenVaultBuiltEvent();
      givenVaultPouredEvent(BigInt.fromI32(100), BigInt.fromI32(200));
      const firstVaultId = vaultId;
      givenVaultBuiltEvent();
      givenVaultPouredEvent(BigInt.fromI32(250), BigInt.fromI32(340));
      const secondVaultId = vaultId;

      whenVaultStirredEvent(
        firstVaultId,
        secondVaultId,
        BigInt.fromI32(50),
        BigInt.fromI32(60)
      );

      assert.entityCount("Vault", 2);
      thenVaultOwnerShouldMatch(firstVaultId, owner);
      thenVaultOwnerShouldMatch(secondVaultId, owner);
    });
  });

  describe("VaultDestroyed", () => {
    test("should remove the vault", () => {
      givenVaultBuiltEvent();

      assert.entityCount("Vault", 1);

      whenVaultDestroyedEvent(vaultId);

      assert.entityCount("Vault", 0);
    });

    test("should not remove any other vaults", () => {
      givenVaultBuiltEvent();
      const firstVaultId = vaultId;
      givenVaultBuiltEvent();
      const secondVaultId = vaultId;

      assert.entityCount("Vault", 2);

      whenVaultDestroyedEvent(secondVaultId);

      assert.entityCount("Vault", 1);
      thenVaultOwnerShouldMatch(firstVaultId, owner);
    });
  });
});

function givenVaultBuiltEvent(): void {
  vaultId = Bytes.fromI32(vaultId.toI32() + 107);
  handleVaultBuilt(
    createVaultBuiltEvent(
      Bytes.fromHexString(vaultIdHex(vaultId)),
      owner,
      seriesId,
      ilkId
    )
  );
}

function givenVaultPouredEvent(ink: BigInt, art: BigInt): void {
  handleVaultPoured(
    createVaultPouredEvent(
      Bytes.fromHexString(vaultIdHex(vaultId)),
      seriesId,
      ilkId,
      ink,
      art
    )
  );
}

function givenVaultTweakedEvent(
  vaultId: Bytes,
  seriesId: Bytes,
  ilkId: Bytes
): void {
  handleVaultTweaked(
    createVaultTweakedEvent(
      Bytes.fromHexString(vaultIdHex(vaultId)),
      seriesId,
      ilkId
    )
  );
}

function givenVaultRolledEvent(
  vaultId: Bytes,
  seriesId: Bytes,
  art: BigInt
): void {
  handleVaultRolled(
    createVaultRolledEvent(
      Bytes.fromHexString(vaultIdHex(vaultId)),
      seriesId,
      art
    )
  );
}

function givenVaultGivenEvent(vaultId: Bytes, owner: Address): void {
  handleVaultGiven(
    createVaultGivenEvent(Bytes.fromHexString(vaultIdHex(vaultId)), owner)
  );
}

function whenVaultDestroyedEvent(vaultId: Bytes): void {
  handleVaultDestroyed(
    createVaultDestroyedEvent(Bytes.fromHexString(vaultIdHex(vaultId)))
  );
}

function whenVaultStirredEvent(
  from: Bytes,
  to: Bytes,
  ink: BigInt,
  art: BigInt
): void {
  handleVaultStirred(
    createVaultStirredEvent(
      Bytes.fromHexString(vaultIdHex(from)),
      Bytes.fromHexString(vaultIdHex(to)),
      ink,
      art
    )
  );
}

function thenVaultOwnerShouldMatch(vaultId: Bytes, owner: Address): void {
  assert.fieldEquals("Vault", vaultIdHex(vaultId), "owner", owner.toHex());
}

function thenVaultAssestShouldMatch(
  vaultId: Bytes,
  seriesId: Bytes,
  ilkId: Bytes
): void {
  assert.fieldEquals(
    "Vault",
    vaultIdHex(vaultId),
    "seriesId",
    seriesId.toHex()
  );
  assert.fieldEquals("Vault", vaultIdHex(vaultId), "ilkId", ilkId.toHex());
}

function thenVaultBalanceShouldMatch(
  vaultId: Bytes,
  ink: BigInt | null,
  art: BigInt | null
): void {
  if (ink !== null)
    assert.fieldEquals("Vault", vaultIdHex(vaultId), "ink", ink.toString());
  if (art !== null)
    assert.fieldEquals("Vault", vaultIdHex(vaultId), "art", art.toString());
}

function vaultIdHex(id: Bytes | null): string {
  return (
    "0x" +
    (id ? id : vaultId)
      .toHex()
      .replace("0x", "")
      .padStart(24, "0")
  );
}
