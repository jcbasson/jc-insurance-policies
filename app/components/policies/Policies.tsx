import { useMemo, useState, useEffect } from "react";
import type { Policy } from "~/types/policies.types";
import { MultiTripPolicyCard } from "./policyCard/MultiTripPolicyCard";
import { SingleTripPolicyCard } from "./policyCard/SingleTripPolicyCard";
import { mapPoliciesToCardProps } from "./mapPoliciesToCardProps";
import { Pagination } from "../common/pagination/Pagination";

const POLICIES_PER_PAGE = 3;

type PoliciesProps = {
  policies: Policy[];
};

const Policies = ({ policies }: PoliciesProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const policyCards = useMemo(
    () => mapPoliciesToCardProps(policies),
    [policies],
  );

  const totalPages = Math.ceil(policyCards.length / POLICIES_PER_PAGE);

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, Math.max(totalPages, 1)));
  }, [totalPages]);

  const safeCurrentPage = Math.min(
    Math.max(currentPage, 1),
    Math.max(totalPages, 1),
  );

  const visibleCards = policyCards.slice(
    (safeCurrentPage - 1) * POLICIES_PER_PAGE,
    safeCurrentPage * POLICIES_PER_PAGE,
  );

  return (
    <div className="w-full max-w-md md:max-w-5xl space-y-6 md:space-y-8">
      {visibleCards.map((card) => {
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

      <Pagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        ariaLabel="Policies pagination"
      />
    </div>
  );
};

export { Policies, POLICIES_PER_PAGE };
export type { PoliciesProps };
