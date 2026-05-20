import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const getBaseUrl = (): string => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  if (typeof baseUrl !== "string" || baseUrl.length === 0) {
    throw new Error(
      "Missing VITE_BASE_URL. Add it to .env (see Vite env docs: variables must be prefixed with VITE_ for client code).",
    );
  }
  return baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
};

const baseUrl = getBaseUrl();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey, signal }) => {
        const path = queryKey
          .filter((key): key is string => typeof key === "string")
          .join("/")
          .replace(/^\/+/, "");
        const url = new URL(path, baseUrl);
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(
            `Request failed: ${response.status} ${response.statusText}`,
          );
        }
        return response.json();
      },
    },
  },
});

if (import.meta.env.DEV && typeof window !== "undefined") {
  (
    window as Window & { __QUERY_CLIENT__?: QueryClient }
  ).__QUERY_CLIENT__ = queryClient;
}

export const SetupQueryClient = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export { baseUrl, queryClient };
