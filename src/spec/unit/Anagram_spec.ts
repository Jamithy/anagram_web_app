import "jasmine"

import { Factory } from "../../Factory"

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
  describe("I want to submit valid anagram pairs", ()=> {
    it("which return as valid", ()=> {
      expect(Factory.createAnagram("wolf", "flow").isAnagram()).toBe(true);
      expect(Factory.createAnagram("restful", "fluster").isAnagram()).toBe(true);
      expect(Factory.createAnagram("knee", "keen").isAnagram()).toBe(true);
      expect(Factory.createAnagram("listen", "silent").isAnagram()).toBe(true);
    });

    describe("regardless of capital casing", ()=> {
      it("which return as valid", ()=> {
        expect(Factory.createAnagram("Wolf", "Flow").isAnagram()).toBe(true);
        expect(Factory.createAnagram("WOLF", "flow").isAnagram()).toBe(true);
        expect(Factory.createAnagram("WOLF", "FLOW").isAnagram()).toBe(true);
      });
    })
  });

  describe("I want to submit non-anagram pairs", ()=> {
    it("which return as invalid", ()=> {
      expect(Factory.createAnagram("wolf", "owl").isAnagram()).toBe(false);
      expect(Factory.createAnagram("grove", "groove").isAnagram()).toBe(false);
      expect(Factory.createAnagram("grate", "greater").isAnagram()).toBe(false);
    });

    describe("regardless of capital casing", ()=> {
      it("which return as invalid", ()=> {
        expect(Factory.createAnagram("Wolf", "owl").isAnagram()).toBe(false);
        expect(Factory.createAnagram("Wolf", "oWl").isAnagram()).toBe(false);
        expect(Factory.createAnagram("WOLF", "owl").isAnagram()).toBe(false);
        expect(Factory.createAnagram("WOLF", "owl").isAnagram()).toBe(false);
      });
    })
  });

  describe("I want to submit invalid alphanumeric anagram pairs", ()=> {
    it("which return as invalid", ()=> {
      expect(Factory.createAnagram("123", "owl").isAnagram()).toBe(false);
      expect(Factory.createAnagram("123", "321").isAnagram()).toBe(false);
      expect(Factory.createAnagram("Gr0ve", "grove").isAnagram()).toBe(false);
      expect(Factory.createAnagram("w0lf", "fl0w").isAnagram()).toBe(false);
    });
  });

  describe("I want to submit invalid anagram pairs with symbols", ()=> {
    it("which return as invalid", ()=> {
      expect(Factory.createAnagram("dormitory!", "dirty room!").isAnagram()).toBe(false);
      expect(Factory.createAnagram("wolf!", "flow!").isAnagram()).toBe(false);
      expect(Factory.createAnagram("@", "@").isAnagram()).toBe(false);
      expect(Factory.createAnagram("#$%", "%$#").isAnagram()).toBe(false);
    });
  });

  describe("I want to submit invalid multi-word anagram pairs", ()=> {
    it("which return as invalid", ()=> {
      expect(Factory.createAnagram("Dormitory", "Dirty room").isAnagram()).toBe(false);
      expect(Factory.createAnagram("dormitory", "dirty room").isAnagram()).toBe(false);
    });
  });

  describe("I want to submit null anagram pairs", ()=> {
    it("which return as invalid", ()=> {
      expect(Factory.createAnagram("", "").isAnagram()).toBe(false);
      expect(Factory.createAnagram("", "abc").isAnagram()).toBe(false);
      expect(Factory.createAnagram(null, null).isAnagram()).toBe(false);
      expect(Factory.createAnagram(null, "abc").isAnagram()).toBe(false);
    });
  });

  describe("I want to submit max-length anagram pairs", ()=> {
    it("which return as invalid", ()=> {
      expect(Factory.createAnagram("pneumonoultramicroscopicsilicovolcanoconiosisniosis", "pneumonoultramicroscopicsilicovolcanoconiosisniosis").isAnagram()).toBe(false);
      expect(Factory.createAnagram("pneumonoultramicroscopicsilicovolcanoconiosisniossi", "pneumonoultramicroscopicsilicovolcanoconiosisniosis").isAnagram()).toBe(false);
    });
  });

  describe("I want to submit arrays", ()=> {
    it("which return as invalid", ()=> {
      // @ts-ignore
      expect(Factory.createAnagram(["a","b","c"], ["a", "b", "c"]).isAnagram()).toBe(false);
    });
  });

  describe("I want to submit non-word anagrams", ()=> {
    it("which return as invalid", ()=> {
      // Not a dictionary word
      expect(Factory.createAnagram("abc", "bca").isAnagram()).toBe(false);
    });
  });

  describe("I want to submit non-english anagrams", ()=> {
    it("which return as invalid", ()=> {
      expect(Factory.createAnagram("汉字", "字汉").isAnagram()).toBe(false);
      expect(Factory.createAnagram("漢字", "字漢").isAnagram()).toBe(false);
      expect(Factory.createAnagram("Ψβ", "βΨ").isAnagram()).toBe(false);
    });
  });
});