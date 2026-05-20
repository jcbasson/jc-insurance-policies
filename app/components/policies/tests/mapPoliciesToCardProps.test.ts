import { describe, expect, it } from "vitest";

import type { Policy } from "~/types/policies.types";

import {
  formatDestination,
  formatPolicyDate,
  isActivePolicy,
  isMultiTripPolicy,
  mapPoliciesToCardProps,
} from "../mapPoliciesToCardProps";

const basePolicy: Policy = {
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

describe("formatPolicyDate", () => {
  it("formats ISO dates for display", () => {
    expect(formatPolicyDate("2026-05-01")).toBe("01 May 2026");
    expect(formatPolicyDate("2025-12-24")).toBe("24 Dec 2025");
  });
});

describe("formatDestination", () => {
  it("returns an em dash when there are no destinations", () => {
    expect(formatDestination([])).toBe("—");
  });

  it("joins multiple destination names", () => {
    expect(
      formatDestination([
        { code: "NZL", name: "New Zealand" },
        { code: "AUS", name: "Australia" },
      ]),
    ).toBe("New Zealand, Australia");
  });
});

describe("isActivePolicy", () => {
  it("returns true for active policies", () => {
    expect(isActivePolicy(basePolicy)).toBe(true);
  });

  it("returns false for expired policies", () => {
    expect(isActivePolicy({ ...basePolicy, status: "Expired" })).toBe(false);
  });
});

describe("isMultiTripPolicy", () => {
  it("identifies annual policies as multi-trip", () => {
    expect(isMultiTripPolicy({ ...basePolicy, type: "Annual" })).toBe(true);
  });

  it("identifies single trip policies as not multi-trip", () => {
    expect(isMultiTripPolicy({ ...basePolicy, type: "Single Trip" })).toBe(
      false,
    );
  });
});

describe("mapPoliciesToCardProps", () => {
  it("maps a single trip policy to SingleTripPolicyCard props", () => {
    expect(mapPoliciesToCardProps([basePolicy])).toEqual([
      {
        kind: "single-trip",
        policyNo: "726100029411",
        destination: "New Zealand",
        startDate: "01 May 2026",
        endDate: "11 May 2026",
        planName: "Comprehensive",
        excess: "$250",
      },
    ]);
  });

  it("maps an annual policy to MultiTripPolicyCard props", () => {
    const annualPolicy: Policy = {
      ...basePolicy,
      policyNumber: "725100070900",
      policyStart: "2025-12-24",
      policyEnd: "2026-12-23",
      type: "Annual",
      maxTripDuration: 60,
      destinations: [{ code: "GBR", name: "United Kingdom" }],
      planName: "Comprehensive",
      excess: 250,
    };

    expect(mapPoliciesToCardProps([annualPolicy])).toEqual([
      {
        kind: "multi-trip",
        policyNo: "725100070900",
        destination: "United Kingdom",
        startDate: "24 Dec 2025",
        maxTripDuration: "Up to 60 days",
        planName: "Comprehensive",
        excess: "$250",
      },
    ]);
  });

  it("maps a mixed list preserving order", () => {
    const annualPolicy: Policy = {
      ...basePolicy,
      policyNumber: "725100070900",
      type: "Annual",
      maxTripDuration: 60,
    };

    expect(mapPoliciesToCardProps([annualPolicy, basePolicy])).toEqual([
      expect.objectContaining({
        kind: "multi-trip",
        policyNo: "725100070900",
        maxTripDuration: "Up to 60 days",
      }),
      expect.objectContaining({
        kind: "single-trip",
        policyNo: "726100029411",
      }),
    ]);
  });

  it("formats max trip duration for annual policies", () => {
    const annualPolicy: Policy = {
      ...basePolicy,
      type: "Annual",
      maxTripDuration: 45,
    };

    expect(mapPoliciesToCardProps([annualPolicy])).toEqual([
      expect.objectContaining({
        kind: "multi-trip",
        maxTripDuration: "Up to 45 days",
      }),
    ]);
  });

  it("defaults unknown policy types to single-trip", () => {
    expect(
      mapPoliciesToCardProps([
        { ...basePolicy, type: "Unknown", policyNumber: "999" },
      ]),
    ).toEqual([
      {
        kind: "single-trip",
        policyNo: "999",
        destination: "New Zealand",
        startDate: "01 May 2026",
        endDate: "11 May 2026",
        planName: "Comprehensive",
        excess: "$250",
      },
    ]);
  });

  it("includes only active policies from a mixed list", () => {
    const activeFirst: Policy = {
      ...basePolicy,
      policyNumber: "active-first",
      status: "Active",
    };
    const expired: Policy = {
      ...basePolicy,
      policyNumber: "expired-mid",
      status: "Expired",
    };
    const activeSecond: Policy = {
      ...basePolicy,
      policyNumber: "active-second",
      status: "Active",
    };

    expect(mapPoliciesToCardProps([activeFirst, expired, activeSecond])).toEqual(
      [
        expect.objectContaining({ policyNo: "active-first" }),
        expect.objectContaining({ policyNo: "active-second" }),
      ],
    );
  });

  it("excludes expired policies", () => {
    expect(
      mapPoliciesToCardProps([
        { ...basePolicy, policyNumber: "expired-1", status: "Expired" },
      ]),
    ).toEqual([]);
  });

  it("returns an empty array when no policies are active", () => {
    expect(
      mapPoliciesToCardProps([
        { ...basePolicy, policyNumber: "expired-1", status: "Expired" },
        { ...basePolicy, policyNumber: "expired-2", status: "Expired" },
      ]),
    ).toEqual([]);
  });

  it("returns an empty array when the input list is empty", () => {
    expect(mapPoliciesToCardProps([])).toEqual([]);
  });
});
