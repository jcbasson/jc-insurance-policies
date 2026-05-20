/// <reference types="cypress" />
/// <reference types="cypress/react" />

import { Pagination, type PaginationProps } from "../Pagination";

function mountPagination(overrides: Partial<PaginationProps> = {}) {
  const onPageChange = cy.stub().as("onPageChange");

  const props: PaginationProps = {
    currentPage: 1,
    totalPages: 5,
    onPageChange,
    ...overrides,
  };

  cy.mount(<Pagination {...props} />);
}

describe("<Pagination />", () => {
  describe("visibility", () => {
    it("does not render when totalPages is less than 2", () => {
      mountPagination({ totalPages: 0 });
      cy.get("nav").should("not.exist");

      mountPagination({ totalPages: 1 });
      cy.get("nav").should("not.exist");
    });

    it("renders when totalPages is 2 or more", () => {
      mountPagination({ totalPages: 2 });
      cy.get("nav").should("exist");
    });
  });

  describe("visible page numbers", () => {
    it("shows all pages when totalPages is less than 3", () => {
      mountPagination({ currentPage: 1, totalPages: 2 });
      cy.get('button[aria-label="Page 1"]').should("exist");
      cy.get('button[aria-label="Page 2"]').should("exist");
      cy.get('button[aria-label="Page 3"]').should("not.exist");
    });

    it("keeps the same three pages while navigating within a chunk", () => {
      mountPagination({ currentPage: 2, totalPages: 10 });
      cy.get('button[aria-label="Page 1"]').should("exist");
      cy.get('button[aria-label="Page 2"]').should("exist");
      cy.get('button[aria-label="Page 3"]').should("exist");
      cy.get('button[aria-label="Page 4"]').should("not.exist");
    });

    it("shows the next chunk only after leaving the last visible page via next", () => {
      mountPagination({ currentPage: 3, totalPages: 10 });
      cy.get('button[aria-label="Page 1"]').should("exist");
      cy.get('button[aria-label="Page 3"]').should("exist");
      cy.get('button[aria-label="Page 4"]').should("not.exist");

      cy.get('button[aria-label="Next page"]').click();
      cy.get("@onPageChange").should("have.been.calledWith", 4);

      mountPagination({ currentPage: 4, totalPages: 10 });
      cy.get('button[aria-label="Page 4"]').should("exist");
      cy.get('button[aria-label="Page 5"]').should("exist");
      cy.get('button[aria-label="Page 6"]').should("exist");
      cy.get('button[aria-label="Page 3"]').should("not.exist");
    });

    it("shows the previous chunk only after leaving the first visible page via previous", () => {
      mountPagination({ currentPage: 4, totalPages: 10 });
      cy.get('button[aria-label="Page 4"]').should("exist");
      cy.get('button[aria-label="Page 6"]').should("exist");
      cy.get('button[aria-label="Page 3"]').should("not.exist");

      cy.get('button[aria-label="Previous page"]').click();
      cy.get("@onPageChange").should("have.been.calledWith", 3);

      mountPagination({ currentPage: 3, totalPages: 10 });
      cy.get('button[aria-label="Page 1"]').should("exist");
      cy.get('button[aria-label="Page 2"]').should("exist");
      cy.get('button[aria-label="Page 3"]').should("exist");
      cy.get('button[aria-label="Page 4"]').should("not.exist");
    });

    it("pins visible pages to the start when near the beginning", () => {
      mountPagination({ currentPage: 1, totalPages: 10 });
      cy.get('button[aria-label="Page 1"]').should("exist");
      cy.get('button[aria-label="Page 2"]').should("exist");
      cy.get('button[aria-label="Page 3"]').should("exist");
      cy.get('button[aria-label="Page 4"]').should("not.exist");
    });

    it("pins visible pages to the end on the final page", () => {
      mountPagination({ currentPage: 9, totalPages: 10 });
      cy.get('button[aria-label="Page 7"]').should("exist");
      cy.get('button[aria-label="Page 9"]').should("exist");
      cy.get('button[aria-label="Page 10"]').should("not.exist");

      mountPagination({ currentPage: 10, totalPages: 10 });
      cy.get('button[aria-label="Page 8"]').should("exist");
      cy.get('button[aria-label="Page 9"]').should("exist");
      cy.get('button[aria-label="Page 10"]').should("exist");
      cy.get('button[aria-label="Page 7"]').should("not.exist");
    });
  });

  describe("current page clamping", () => {
    it("treats a currentPage below 1 as page 1", () => {
      mountPagination({ currentPage: 0, totalPages: 5 });
      cy.get('button[aria-label="Page 1"]').should(
        "have.attr",
        "aria-current",
        "page",
      );
      cy.get('button[aria-label="Previous page"]').should("be.disabled");
    });

    it("treats a currentPage above totalPages as the last page", () => {
      mountPagination({ currentPage: 99, totalPages: 5 });
      cy.get('button[aria-label="Page 5"]').should(
        "have.attr",
        "aria-current",
        "page",
      );
      cy.get('button[aria-label="Next page"]').should("be.disabled");
    });
  });

  describe("previous page navigation", () => {
    it("disables the previous button on the first page", () => {
      mountPagination({ currentPage: 1, totalPages: 5 });
      cy.get('button[aria-label="Previous page"]').should("be.disabled");
    });

    it("enables the previous button when not on the first page", () => {
      mountPagination({ currentPage: 3, totalPages: 5 });
      cy.get('button[aria-label="Previous page"]').should("not.be.disabled");
    });

    it("calls onPageChange with the previous page when clicked", () => {
      mountPagination({ currentPage: 3, totalPages: 5 });
      cy.get('button[aria-label="Previous page"]').click();
      cy.get("@onPageChange").should("have.been.calledOnceWith", 2);
    });
  });

  describe("next page navigation", () => {
    it("disables the next button on the last page", () => {
      mountPagination({ currentPage: 5, totalPages: 5 });
      cy.get('button[aria-label="Next page"]').should("be.disabled");
    });

    it("enables the next button when not on the last page", () => {
      mountPagination({ currentPage: 3, totalPages: 5 });
      cy.get('button[aria-label="Next page"]').should("not.be.disabled");
    });

    it("calls onPageChange with the next page when clicked", () => {
      mountPagination({ currentPage: 3, totalPages: 5 });
      cy.get('button[aria-label="Next page"]').click();
      cy.get("@onPageChange").should("have.been.calledOnceWith", 4);
    });
  });

  describe("direct page selection", () => {
    it("calls onPageChange with the selected page when a page button is clicked", () => {
      mountPagination({ currentPage: 1, totalPages: 5 });
      cy.get('button[aria-label="Page 3"]').click();
      cy.get("@onPageChange").should("have.been.calledOnceWith", 3);
    });
  });
});
