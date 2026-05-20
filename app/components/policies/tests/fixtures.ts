import type { Policy } from "~/types/policies.types";

export const basePolicy: Policy = {
  policyNumber: "726100029411",
  policyStart: "2026-05-01",
  policyEnd: "2026-05-11",
  primaryTravellerFirstname: "Test",
  primaryTravellerLastName: "Pradeep",
  primaryTravellerPhoneNumber: "0987654321",
  status: "Active",
  destinations: [{ code: "NZL", name: "New Zealand" }],
  alphaCode: "CBA0010",
  iSO3CountryOfResidence: "AU",
  underwriterCode: "Zurich",
  groupCode: "CB",
  type: "Single Trip",
  excess: 250,
  maxTripDuration: 0,
  planName: "Comprehensive",
};

export const createPolicy = (overrides: Partial<Policy>): Policy => ({
  ...basePolicy,
  ...overrides,
});

export const singleTripPolicy = createPolicy({
  policyNumber: "726100029411",
  destinations: [{ code: "NZL", name: "New Zealand" }],
});

export const annualPolicy = createPolicy({
  policyNumber: "725100070900",
  policyStart: "2025-12-24",
  policyEnd: "2026-12-23",
  type: "Annual",
  maxTripDuration: 60,
  destinations: [{ code: "GBR", name: "United Kingdom" }],
});

export const mixedActiveAndExpiredPolicies: Policy[] = [
  createPolicy({ policyNumber: "726100029411", status: "Active" }),
  createPolicy({ policyNumber: "725100076338", status: "Expired" }),
  createPolicy({ policyNumber: "725100070900", status: "Active", type: "Annual" }),
];

export const expiredOnlyPolicies: Policy[] = [
  createPolicy({ policyNumber: "725100076338", status: "Expired" }),
  createPolicy({ policyNumber: "725200016004", status: "Expired" }),
];

export const paginatedPolicies: Policy[] = [
  createPolicy({
    policyNumber: "726100029411",
    destinations: [{ code: "NZL", name: "New Zealand" }],
  }),
  createPolicy({
    policyNumber: "726200000007",
    destinations: [{ code: "IND", name: "India" }],
  }),
  createPolicy({
    policyNumber: "725100076338",
    policyStart: "2026-01-15",
    policyEnd: "2026-01-23",
    destinations: [{ code: "GBR", name: "United Kingdom" }],
  }),
  createPolicy({
    policyNumber: "725100076331",
    policyStart: "2026-08-23",
    policyEnd: "2027-08-22",
    type: "Annual",
    maxTripDuration: 45,
    destinations: [{ code: "IRL", name: "Republic of Ireland" }],
  }),
];
