/// <reference types="cypress" />
/// <reference types="cypress/react" />

import {
  MultiTripPolicyCard,
  type MultiTripPolicyCardProps,
} from "../MultiTripPolicyCard";

const defaultProps: MultiTripPolicyCardProps = {
  policyNo: "725100070900",
  destination: "United Kingdom",
  startDate: "24 Dec 2025",
  maxTripDuration: "Up to 60 days",
  planName: "Comprehensive",
  excess: "$250",
};

function mountMultiTripPolicyCard(
  overrides: Partial<MultiTripPolicyCardProps> = {},
) {
  cy.mount(<MultiTripPolicyCard {...defaultProps} {...overrides} />);
}

describe("<MultiTripPolicyCard />", () => {
  describe("policy number", () => {
    it("displays the policy number", () => {
      mountMultiTripPolicyCard();
      cy.contains("725100070900").should("be.visible");
      cy.contains("Policy number:").should("be.visible");
    });
  });

  describe("policy details", () => {
    it("renders destination", () => {
      mountMultiTripPolicyCard();
      cy.contains("p", "Destination:").should("contain.text", "United Kingdom");
    });

    it("renders policy start date", () => {
      mountMultiTripPolicyCard();
      cy.contains("p", "Policy start date:").should(
        "contain.text",
        "24 Dec 2025",
      );
    });

    it("renders maximum trip duration", () => {
      mountMultiTripPolicyCard();
      cy.contains("p", "Maximum trip duration:").should(
        "contain.text",
        "Up to 60 days",
      );
    });

    it("renders plan and excess", () => {
      mountMultiTripPolicyCard();
      cy.contains("p", "Plan:").should("contain.text", "Comprehensive");
      cy.contains("p", "Excess:").should("contain.text", "$250");
    });

    it("does not render single-trip travel date label", () => {
      mountMultiTripPolicyCard();
      cy.contains("Travel date:").should("not.exist");
    });

    it("reflects updated props", () => {
      mountMultiTripPolicyCard({
        policyNo: "725100076331",
        destination: "Republic of Ireland",
        startDate: "23 Aug 2026",
        maxTripDuration: "Up to 45 days",
        planName: "Essentials",
        excess: "$100",
      });

      cy.contains("725100076331").should("be.visible");
      cy.contains("p", "Destination:").should(
        "contain.text",
        "Republic of Ireland",
      );
      cy.contains("p", "Policy start date:").should(
        "contain.text",
        "23 Aug 2026",
      );
      cy.contains("p", "Maximum trip duration:").should(
        "contain.text",
        "Up to 45 days",
      );
      cy.contains("p", "Plan:").should("contain.text", "Essentials");
      cy.contains("p", "Excess:").should("contain.text", "$100");
    });
  });

  describe("actions and links", () => {
    beforeEach(() => {
      mountMultiTripPolicyCard();
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
