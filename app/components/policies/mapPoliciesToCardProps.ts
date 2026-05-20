import type { Policy } from "~/types/policies.types";
import type { MultiTripPolicyCardProps } from "./MultiTripPolicyCard";
import type { SingleTripPolicyCardProps } from "./policyCard/SingleTripPolicyCard";

export type SingleTripPolicyCardViewModel = SingleTripPolicyCardProps & {
  kind: "single-trip";
};

export type MultiTripPolicyCardViewModel = MultiTripPolicyCardProps & {
  kind: "multi-trip";
};

export type PolicyCardViewModel =
  | SingleTripPolicyCardViewModel
  | MultiTripPolicyCardViewModel;

const formatPolicyDate = (isoDate: string): string => {
  const [year, month, day] = isoDate.split("-").map(Number);
  const date = new Date(year, month - 1, day);

  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatDestination = (destinations: Policy["destinations"]): string => {
  if (destinations.length === 0) {
    return "—";
  }

  return destinations.map((destination) => destination.name).join(", ");
};

const isMultiTripPolicy = (policy: Policy): boolean => {
  return policy.type.toLowerCase().includes("annual");
};

const formatExcess = (excess: number | string): string => {
  if (typeof excess === "number") {
    return `$${excess}`;
  }
  return excess.startsWith("$") ? excess : `$${excess}`;
};

const formatMaxTripDuration = (maxTripDuration: number | string): string => {
  if (typeof maxTripDuration === "number") {
    return `Up to ${maxTripDuration} days`;
  }
  return maxTripDuration;
};

const mapSingleTripPolicy = (policy: Policy): SingleTripPolicyCardViewModel => {
  return {
    kind: "single-trip",
    policyNo: policy.policyNumber,
    destination: formatDestination(policy.destinations),
    startDate: formatPolicyDate(policy.policyStart),
    endDate: formatPolicyDate(policy.policyEnd),
    planName: policy.planName,
    excess: formatExcess(policy.excess),
  };
};

const mapMultiTripPolicy = (policy: Policy): MultiTripPolicyCardViewModel => {
  return {
    kind: "multi-trip",
    policyNo: policy.policyNumber,
    destination: formatDestination(policy.destinations),
    startDate: formatPolicyDate(policy.policyStart),
    maxTripDuration: formatMaxTripDuration(policy.maxTripDuration),
    planName: policy.planName,
    excess: formatExcess(policy.excess),
  };
};

export const mapPoliciesToCardProps = (
  policies: Policy[],
): PolicyCardViewModel[] => {
  return policies.map((policy) => {
    if (isMultiTripPolicy(policy)) {
      return mapMultiTripPolicy(policy);
    }

    return mapSingleTripPolicy(policy);
  });
};

export { formatDestination, formatPolicyDate, isMultiTripPolicy };
