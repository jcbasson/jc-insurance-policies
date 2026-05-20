const POLICIES_API = "**/v1/policies";

describe("Policies page", () => {
  describe("loading state", () => {
    it("shows a loading message while the policies request is pending", () => {
      cy.intercept("GET", POLICIES_API, (req) => {
        req.reply({
          delay: 800,
          fixture: "policies-single.json",
        });
      }).as("getPolicies");

      cy.visit("/policies");

      cy.contains("Loading policies…").should("be.visible");
      cy.get('[data-testid="policies-page-content"]').should("not.exist");
      cy.get('[role="alert"]').should("not.exist");

      cy.wait("@getPolicies");
      cy.contains("Loading policies…").should("not.exist");
      cy.get('[data-testid="policies-page-content"]').should("exist");
    });
  });

  describe("successful response", () => {
    it("renders the policies view when the request succeeds", () => {
      cy.intercept("GET", POLICIES_API, {
        fixture: "policies-single.json",
      }).as("getPolicies");

      cy.visit("/policies");
      cy.wait("@getPolicies");

      cy.contains("Loading policies…").should("not.exist");
      cy.get('[role="alert"]').should("not.exist");
      cy.get('[data-testid="policies-page-content"]').should("exist");
    });

    it("renders the policies view when the API returns an empty list", () => {
      cy.intercept("GET", POLICIES_API, {
        fixture: "policies-empty.json",
      }).as("getPolicies");

      cy.visit("/policies");
      cy.wait("@getPolicies");

      cy.contains("Loading policies…").should("not.exist");
      cy.get('[role="alert"]').should("not.exist");
      cy.get('[data-testid="policies-page-content"]').should("exist");
    });
  });

  describe("error state", () => {
    it("shows an error message when the policies request fails", () => {
      cy.intercept("GET", POLICIES_API, {
        statusCode: 500,
        body: {},
      });

      cy.visit("/policies");

      cy.get('[role="alert"]', { timeout: 20000 })
        .should("be.visible")
        .and("contain.text", "Request failed: 500");
      cy.contains("Loading policies…").should("not.exist");
      cy.get('[data-testid="policies-page-content"]').should("not.exist");
    });

    it("shows how many attempts were made after retries are exhausted", () => {
      cy.intercept("GET", POLICIES_API, {
        statusCode: 500,
        body: {},
      });

      cy.visit("/policies");

      cy.get('[role="alert"]', { timeout: 20000 })
        .should("be.visible")
        .and("contain.text", "after")
        .and("contain.text", "attempts");
      cy.get('[data-testid="policies-page-content"]').should("not.exist");
    });
  });

  describe("background refetch", () => {
    it("shows a refreshing message while refetching in the background", () => {
      let requestCount = 0;

      cy.intercept("GET", POLICIES_API, (req) => {
        requestCount += 1;

        if (requestCount === 1) {
          req.reply({ fixture: "policies-single.json" });
          return;
        }

        req.reply({
          delay: 1000,
          fixture: "policies-single.json",
        });
      }).as("getPolicies");

      cy.visit("/policies");
      cy.wait("@getPolicies");

      cy.get('[data-testid="policies-page-content"]').should("exist");
      cy.contains("Refreshing…").should("not.exist");

      cy.window()
        .its("__QUERY_CLIENT__")
        .invoke("invalidateQueries", { queryKey: ["policies"] });

      cy.contains("Refreshing…", { timeout: 8000 }).should("be.visible");
      cy.get('[data-testid="policies-page-content"]').should("exist");
      cy.wait("@getPolicies");
      cy.contains("Refreshing…").should("not.exist");
    });
  });
});
