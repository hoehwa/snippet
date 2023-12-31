/* Separate UI from functionality */

/**
 * ✅Do
 * When focusing on testing component logic, UI details become a noise that should be extracted, so your tests can focus on pure data.
 * 
 * Practically, extract the desired data from the markup in an abstract way that is not too coupled to the graphic implementation, assert only on pure data(vs HTML / CSS graphic details) and disable animations that slow down.
 * You might get tempted to avoid rendering and test only the back part of the UI(e.g.services, actions, store) but this will result in fictional tests that don't resemble the reality and won't reveal cases where the right data doesn't even arrive in the UI
 */

/**
 * ❌ Otherwise
 * The pure calculated data of your test might be ready in 10ms, but then the whole test will last 500ms(100 tests = 1 min) due to some fancy and irrelevant animation
 */

// ✅Doing It Right Example: Separating out the UI details
test("When users-list is flagged to show only VIP, should display only VIP members", () => {
  // Arrange
  const allUsers = [{ id: 1, name: "Yoni Goldberg", vip: false }, { id: 2, name: "John Doe", vip: true }];

  // Act
  const { getAllByTestId } = render(<UsersList users={allUsers} showOnlyVIP={true} />);

  // Assert - Extract the data from the UI first
  const allRenderedUsers = getAllByTestId("user").map(uiElement => uiElement.textContent);
  const allRealVIPUsers = allUsers.filter(user => user.vip).map(user => user.name);
  expect(allRenderedUsers).toEqual(allRealVIPUsers); //compare data with data, no UI here
});

// ❌Anti-Pattern Example: Assertion mix UI details and data
test("When flagging to show only VIP, should display only VIP members", () => {
  // Arrange
  const allUsers = [{ id: 1, name: "Yoni Goldberg", vip: false }, { id: 2, name: "John Doe", vip: true }];

  // Act
  const { getAllByTestId } = render(<UsersList users={allUsers} showOnlyVIP={true} />);

  // Assert - Mix UI & data in assertion
  expect(getAllByTestId("user")).toEqual('[<li data-test-id="user">John Doe</li>]');
});
