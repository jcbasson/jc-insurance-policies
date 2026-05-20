import { useMemo } from "react";
import type { Policy } from "~/types/policies.types";
import { MultiTripPolicyCard } from "./policyCard/MultiTripPolicyCard";
import { SingleTripPolicyCard } from "./policyCard/SingleTripPolicyCard";
import { mapPoliciesToCardProps } from "./mapPoliciesToCardProps";

const POLICIES_PER_PAGE = 3;

type PoliciesProps = {
  policies: Policy[];
};

const Policies = ({ policies }: PoliciesProps) => {
  const policyCards = useMemo(
    () => mapPoliciesToCardProps(policies),
    [policies],
  );

  return (
    <div className="w-full max-w-md md:max-w-5xl space-y-6 md:space-y-8">
      {policyCards.map((card) => {
        if (card.kind === "multi-trip") {
          return (
            <MultiTripPolicyCard
              key={card.policyNo}
              policyNo={card.policyNo}
              destination={card.destination}
              startDate={card.startDate}
              maxTripDuration={card.maxTripDuration}
              planName={card.planName}
              excess={card.excess}
            />
          );
        }

        return (
          <SingleTripPolicyCard
            key={card.policyNo}
            policyNo={card.policyNo}
            destination={card.destination}
            startDate={card.startDate}
            endDate={card.endDate}
            planName={card.planName}
            excess={card.excess}
          />
        );
      })}
    </div>
  );
};

export { Policies, POLICIES_PER_PAGE };
export type { PoliciesProps };
