/* Structure tests by the AAA pattern */

/**
 * ✅Do 
 * Structure your tests with 3 well - separated sections Arrange, Act & Assert(AAA).
 * Following this structure guarantees that the reader spends no brain - CPU on understanding the test plan:
 * 
 * 1st A - Arrange: All the setup code to bring the system to the scenario the test aims to simulate.
 *                  This might include instantiating the unit under test constructor, adding DB records,
 *                  mocking / stubbing on objects, and any other preparation code
 * 2nd A - Act: Execute the unit under test.Usually 1 line of code
 * 3rd A - Assert: Ensure that the received value satisfies the expectation.Usually 1 line of code
 */

/**
 * ❌ Otherwise
 * Not only do you spend hours understanding the main code 
 * but what should have been the simplest part of the day(testing) stretches your brain
 */

describe("Customer classifier", () => {
  test("When customer spent more than 500$, should be classified as premium", () => {
    //Arrange
    const customerToClassify = { spent: 505, joined: new Date(), id: 1 };
    const DBStub = sinon.stub(dataAccess, "getCustomer").reply({ id: 1, classification: "regular" });

    //Act
    const receivedClassification = customerClassifier.classifyCustomer(customerToClassify);

    //Assert
    expect(receivedClassification).toMatch("premium");
  });
});

test("Should be classified as premium", () => {
  const customerToClassify = { spent: 505, joined: new Date(), id: 1 };
  const DBStub = sinon.stub(dataAccess, "getCustomer").reply({ id: 1, classification: "regular" });
  const receivedClassification = customerClassifier.classifyCustomer(customerToClassify);
  expect(receivedClassification).toMatch("premium");
});
