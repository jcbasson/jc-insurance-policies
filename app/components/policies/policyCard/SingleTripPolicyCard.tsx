import { PolicyCardLayout, PolicyDetailRow } from "./PolicyCardLayout";

export type SingleTripPolicyCardProps = {
  policyNo: string;
  destination: string;
  startDate: string;
  endDate: string;
  planName: string;
  excess: number | string;
};

const SingleTripPolicyCard = ({
  policyNo,
  destination,
  startDate,
  endDate,
  planName,
  excess,
}: SingleTripPolicyCardProps) => {
  return (
    <PolicyCardLayout
      policyNo={policyNo}
      primaryColumn={
        <>
          <PolicyDetailRow label="Destination:" value={destination} />
          <PolicyDetailRow
            label="Travel date:"
            value={`${startDate} - ${endDate}`}
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

export { SingleTripPolicyCard };
