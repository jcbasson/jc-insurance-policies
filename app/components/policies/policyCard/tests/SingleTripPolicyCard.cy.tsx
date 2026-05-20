/// <reference types="cypress" />
/// <reference types="cypress/react" />

import {
  SingleTripPolicyCard,
  type SingleTripPolicyCardProps,
} from "../SingleTripPolicyCard";

const defaultProps: SingleTripPolicyCardProps = {
  policyNo: "726100029411",
  destination: "New Zealand",
  startDate: "01 May 2026",
  endDate: "11 May 2026",
  planName: "Comprehensive",
  excess: "$250",
};

function mountSingleTripPolicyCard(
  overrides: Partial<SingleTripPolicyCardProps> = {},
) {
  cy.mount(<SingleTripPolicyCard {...defaultProps} {...overrides} />);
}

describe("<SingleTripPolicyCard />", () => {
  describe("policy number", () => {
    it("displays the policy number", () => {
      mountSingleTripPolicyCard();
      cy.contains("726100029411").should("be.visible");
      cy.contains("Policy number:").should("be.visible");
    });
  });

  describe("policy details", () => {
    it("renders destination", () => {
      mountSingleTripPolicyCard();
      cy.contains("p", "Destination:").should("contain.text", "New Zealand");
    });

    it("renders travel dates as a combined range", () => {
      mountSingleTripPolicyCard();
      cy.contains("p", "Travel date:").should(
        "contain.text",
        "01 May 2026 - 11 May 2026",
      );
    });

    it("renders plan and excess", () => {
      mountSingleTripPolicyCard();
      cy.contains("p", "Plan:").should("contain.text", "Comprehensive");
      cy.contains("p", "Excess:").should("contain.text", "$250");
    });

    it("does not render multi-trip-only labels", () => {
      mountSingleTripPolicyCard();
      cy.contains("Policy start date:").should("not.exist");
      cy.contains("Maximum trip duration:").should("not.exist");
    });

    it("reflects updated props", () => {
      mountSingleTripPolicyCard({
        policyNo: "725100076338",
        destination: "United Kingdom",
        startDate: "15 Jan 2026",
        endDate: "23 Jan 2026",
        planName: "Essentials",
        excess: "$250",
      });

      cy.contains("725100076338").should("be.visible");
      cy.contains("p", "Destination:").should(
        "contain.text",
        "United Kingdom",
      );
      cy.contains("p", "Travel date:").should(
        "contain.text",
        "15 Jan 2026 - 23 Jan 2026",
      );
      cy.contains("p", "Plan:").should("contain.text", "Essentials");
      cy.contains("p", "Excess:").should("contain.text", "$250");
    });
  });

  describe("actions and links", () => {
    beforeEach(() => {
      mountSingleTripPolicyCard();
    });

    it("renders claim and manage policy buttons", () => {
      cy.contains("button", "Make a claim").should("be.visible");
      cy.contains("button", "Manage my policy").should("be.visible");
    });

    it("renders policy document links", () => {
      cy.get('nav[aria-label="Policy documents"]').within(() => {
        cy.contains("a", "View PDS").should("have.attr", "href", "#");
        cy.contains("a", "Certificate of Insurance").should(
          "have.attr",
          "href",
          "#",
        );
      });
    });
  });
});
