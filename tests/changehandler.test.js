let { ChangeHandler } = require("../src/changehandler");

describe("Tests for ChangeHandler", function () {
  // Set up a test below...
  // test("The ChangeHandler class is defined.", function () {
  //   // let test = new ChangeHandler(1);
  //   // Remember, you can arrange, act, and assert...start small
  //   expect(ChangeHandler).toBeDefined();
  // });
    let test = new ChangeHandler(1);
    expect(test.amountDue).toBe(1);
  });
  test("cashTendered is set to 0", function () {
    let test = new ChangeHandler(999);
    expect(test.cashTendered).toBe(0);
  });
  test("inserting a quarter adds 25", function () {
    let test = new ChangeHandler(999);
    test.insertCoin("quarter");
    expect(test.cashTendered).toBe(25);
  });
  test("inserting a dime adds 10", function () {
    let test = new ChangeHandler(999);
    test.insertCoin("dime");
    expect(test.cashTendered).toBe(10);
  });
  test("inserting a nickel adds 5", function () {
    let test = new ChangeHandler(999);
    test.insertCoin("nickel");
    expect(test.cashTendered).toBe(5);
  });
  test("inserting a penny adds 1", function () {
    let test = new ChangeHandler(999);
    test.insertCoin("penny");
    expect(test.cashTendered).toBe(1);
  });
  test("calling function multiple times continues to add on to amount ", function () {
    let test = new ChangeHandler(999);
    test.insertCoin("nickel");
    test.insertCoin("dime");
    test.insertCoin("nickel");
    expect(test.cashTendered).toBe(20);
  });
  test("return true if cashTendered > amountDue", function () {
    let test = new ChangeHandler(5);
    test.insertCoin("dime");
    expect(test.isPaymentSufficient()).toBe(true);
  });
  test("return false if cashTendered < amountDue", function () {
    let test = new ChangeHandler(10);
    test.insertCoin("nickel");
    expect(test.isPaymentSufficient()).toBe(false);
  });
  test("return true if cashTendered === amountDue", function () {
    let test = new ChangeHandler(10);
    test.insertCoin("dime");
    expect(test.isPaymentSufficient()).toBe(true);
  });
  test("32 change produces 1-q, 1-n, 2-p", function () {
    let test = new ChangeHandler(0);
    test.insertCoin("quarter");
    test.insertCoin("nickel");
    test.insertCoin("penny");
    test.insertCoin("penny");
    expect(test.giveChange()).toEqual({
      quarters: 1,
      dimes: 0,
      nickels: 1,
      pennies: 2,
    });
  });
  test("10 produces 1-d only", function () {
    let test = new ChangeHandler(0);
    test.insertCoin("dime");
    expect(test.giveChange()).toEqual({
      quarters: 0,
      dimes: 1,
      nickels: 0,
      pennies: 0,
    });
  });
  test("27 produces 1-q, 2-p", function () {
    let test = new ChangeHandler(0);
    test.insertCoin("quarter");
    test.insertCoin("penny");
    test.insertCoin("penny");
    expect(test.giveChange()).toEqual({
      quarters: 1,
      dimes: 0,
      nickels: 0,
      pennies: 2,
    });
  });
  test("68 produces 2-q, 1-d, 1-n, 3-p", function () {
    let test = new ChangeHandler(0);
    test.insertCoin("quarter");
    test.insertCoin("quarter");
    test.insertCoin("dime");
    test.insertCoin("nickel");
    test.insertCoin("penny");
    test.insertCoin("penny");
    test.insertCoin("penny");
    expect(test.giveChange()).toEqual({
      quarters: 2,
      dimes: 1,
      nickels: 1,
      pennies: 3,
    });
  });
});
