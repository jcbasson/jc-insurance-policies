import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "~/queryClientProvider";
import type { PoliciesApiResponse } from "~/types/policies.types";
import type { Route } from "./+types/policiesPage";

const fetchPolicies = async ({
  signal,
}: {
  signal?: AbortSignal;
}): Promise<PoliciesApiResponse> => {
  const response = await fetch(new URL("policies", baseUrl), { signal });
  return response.json();
};

export const meta: Route.MetaFunction = ({}: Route.MetaArgs) => {
  return [
    { title: "Policies" },
    { name: "description", content: "Your travel insurance policies." },
  ];
};

export const loader = () => {
  return null;
};

export default () => {
  const {
    data,
    error,
    isPending,
    isError,
    isSuccess,
    isFetching,
    failureCount,
  } = useQuery<PoliciesApiResponse, Error>({
    queryKey: ["policies"],
    queryFn: ({ signal }) => fetchPolicies({ signal }),
  });

  const jsonData = JSON.stringify(data?.policies);

  return (
    <main className="bg-[#F3F4F6] min-h-screen flex flex-col items-center py-12 px-4">
      {isPending && (
        <p className="text-gray-600 dark:text-gray-400">Loading policies…</p>
      )}

      {isError && (
        <p className="text-red-600 dark:text-red-400" role="alert">
          {error.message}
          {failureCount > 1 ? ` (after ${failureCount} attempts)` : ""}
        </p>
      )}

      {isSuccess && isFetching && !isPending && (
        <p className="mb-4 text-gray-500 text-sm">Refreshing…</p>
      )}

      {isSuccess && data !== undefined && <p>{jsonData}</p>}
    </main>
  );
};
