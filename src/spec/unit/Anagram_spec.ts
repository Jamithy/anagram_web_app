import "jasmine"

/*
Acceptance tests should be written using the standard agile framework of a user story:
- "As a [role] I want [feature] so that [benefit]"
  - As a: the person or role who will benefit from the feature;
  - I want: the feature;
  - so that: the benefit or value of the feature.

Acceptance criteria should be written in terms of scenarios and implemented as classes:
 - Given [initial context], when [event occurs], then [ensure some outcomes]
  - Given: the initial context at the beginning of the scenario, in one or more clauses;
  - when: the event that triggers the scenario;
  - then: the expected outcome, in one or more clauses.
*/

describe("As a current user", ()=> {
  it("my dummy tests should succeed", ()=> {
    expect("test").not.toBe(undefined);
    expect("test").not.toBe(null);
  });
});