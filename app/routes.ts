import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("policies", "routes/policiesPage.tsx", { id: "policies" }),
] satisfies RouteConfig;
