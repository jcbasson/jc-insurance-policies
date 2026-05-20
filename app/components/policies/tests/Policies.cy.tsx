/// <reference types="cypress" />
/// <reference types="cypress/react" />

import type { Policy } from "~/types/policies.types";

import { Policies, POLICIES_PER_PAGE } from "../Policies";
import {
  annualPolicy,
  createPolicy,
  expiredOnlyPolicies,
  mixedActiveAndExpiredPolicies,
  paginatedPolicies,
  singleTripPolicy,
} from "./fixtures";

function mountPolicies(policies: Policy[]) {
  cy.mount(<Policies policies={policies} />);
}

describe("<Policies />", () => {
  describe("empty state", () => {
    it("renders no policy cards when the list is empty", () => {
      mountPolicies([]);
      cy.contains("Policy number:").should("not.exist");
      cy.get('nav[aria-label="Policies pagination"]').should("not.exist");
    });

    it("renders no policy cards when no policies are active", () => {
      mountPolicies(expiredOnlyPolicies);

      cy.contains("Policy number:").should("not.exist");
      cy.get('nav[aria-label="Policies pagination"]').should("not.exist");
    });
  });

  describe("active policies only", () => {
    it("shows only active policies when the list includes expired policies", () => {
      mountPolicies(mixedActiveAndExpiredPolicies);

      cy.contains("726100029411").should("be.visible");
      cy.contains("725100070900").should("be.visible");
      cy.contains("725100076338").should("not.exist");
    });

    it("does not show pagination are no active policies are present", () => {
      mountPolicies([
        createPolicy({ policyNumber: "725200016001", status: "Expired" }),
      ]);

      cy.get('nav[aria-label="Policies pagination"]').should("not.exist");
    });
  });

  describe("card rendering", () => {
    it("renders a single-trip policy card with mapped details", () => {
      mountPolicies([singleTripPolicy]);

      cy.contains("726100029411").should("be.visible");
      cy.contains("p", "Destination:").should("contain.text", "New Zealand");
      cy.contains("p", "Travel date:").should(
        "contain.text",
        "01 May 2026 - 11 May 2026",
      );
      cy.contains("Policy start date:").should("not.exist");
    });

    it("renders a multi-trip policy card with mapped details", () => {
      mountPolicies([annualPolicy]);

      cy.contains("725100070900").should("be.visible");
      cy.contains("p", "Destination:").should("contain.text", "United Kingdom");
      cy.contains("p", "Policy start date:").should(
        "contain.text",
        "24 Dec 2025",
      );
      cy.contains("p", "Maximum trip duration:").should(
        "contain.text",
        "Up to 60 days",
      );
      cy.contains("Travel date:").should("not.exist");
    });

    it("renders both single-trip and multi-trip cards in one list", () => {
      mountPolicies([singleTripPolicy, annualPolicy]);

      cy.contains("726100029411").should("be.visible");
      cy.contains("725100070900").should("be.visible");
      cy.contains("Travel date:").should("exist");
      cy.contains("Maximum trip duration:").should("exist");
    });
  });

  describe("pagination visibility", () => {
    it("does not show pagination when there are three or fewer policies", () => {
      mountPolicies(paginatedPolicies.slice(0, 3));
      cy.get('nav[aria-label="Policies pagination"]').should("not.exist");
    });

    it("shows pagination when there are more than three policies", () => {
      mountPolicies(paginatedPolicies);
      cy.get('nav[aria-label="Policies pagination"]').should("exist");
    });
  });

  describe("paginated policy list", () => {
    it(`shows at most ${POLICIES_PER_PAGE} policy cards per page`, () => {
      mountPolicies(paginatedPolicies);
      cy.contains("726100029411").should("be.visible");
      cy.contains("726200000007").should("be.visible");
      cy.contains("725100076338").should("be.visible");
      cy.contains("725100076331").should("not.exist");
    });

    it("shows the next page of policies when a page button is clicked", () => {
      mountPolicies(paginatedPolicies);

      cy.contains("725100076331").should("not.exist");
      cy.get('nav[aria-label="Policies pagination"]')
        .find('button[aria-label="Page 2"]')
        .click();
      cy.contains("725100076331").should("be.visible");
      cy.contains("726100029411").should("not.exist");
    });

    it("navigates pages via the next control", () => {
      mountPolicies(paginatedPolicies);

      cy.contains("725100076331").should("not.exist");
      cy.get('nav[aria-label="Policies pagination"]')
        .find('button[aria-label="Next page"]')
        .click();
      cy.contains("725100076331").should("be.visible");
      cy.contains("726100029411").should("not.exist");
    });

    it("returns to the first page via the previous control", () => {
      mountPolicies(paginatedPolicies);

      cy.get('nav[aria-label="Policies pagination"]')
        .find('button[aria-label="Page 2"]')
        .click();
      cy.contains("726100029411").should("not.exist");

      cy.get('nav[aria-label="Policies pagination"]')
        .find('button[aria-label="Previous page"]')
        .click();
      cy.contains("726100029411").should("be.visible");
      cy.contains("725100076331").should("not.exist");
    });
  });
});
