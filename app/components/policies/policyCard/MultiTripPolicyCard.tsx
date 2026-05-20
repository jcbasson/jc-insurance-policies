import { PolicyCardLayout, PolicyDetailRow } from "./PolicyCardLayout";

export type MultiTripPolicyCardProps = {
  policyNo: string;
  destination: string;
  startDate: string;
  maxTripDuration: number | string;
  planName: string;
  excess: number | string;
};

const MultiTripPolicyCard = ({
  policyNo,
  destination,
  startDate,
  maxTripDuration,
  planName,
  excess,
}: MultiTripPolicyCardProps) => {
  return (
    <PolicyCardLayout
      policyNo={policyNo}
      primaryColumn={
        <>
          <PolicyDetailRow label="Destination:" value={destination} />
          <PolicyDetailRow label="Policy start date:" value={startDate} />
          <PolicyDetailRow
            label="Maximum trip duration:"
            value={maxTripDuration}
          />
        </>
      }
      secondaryColumn={
        <>
          <PolicyDetailRow label="Plan:" value={planName} />
          <PolicyDetailRow label="Excess:" value={excess} />
        </>
      }
    />
  );
};

export { MultiTripPolicyCard };
