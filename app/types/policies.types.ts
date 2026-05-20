/** Destination on a travel policy (from API). */
export type PolicyDestination = {
  code: string;
  name: string;
};

/** Single policy row (from API). */
export type Policy = {
  policyNumber: string;
  policyStart: string;
  policyEnd: string;
  primaryTravellerFirstname: string;
  primaryTravellerLastName: string;
  primaryTravellerPhoneNumber: string;
  status: string;
  destinations: PolicyDestination[];
  alphaCode: string;
  iSO3CountryOfResidence: string;
  underwriterCode: string;
  groupCode: string;
  type: string;
  excess: number;
  maxTripDuration: number;
  planName: string;
};

/** `GET …/policies` JSON body. */
export type PoliciesApiResponse = {
  policies: Policy[];
};
