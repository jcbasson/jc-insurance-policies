import { Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import { SetupQueryClient } from "./queryClientProvider";
import "./app.css";

export { ErrorBoundary } from "./root-error-boundary";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default () => {
  return (
    <SetupQueryClient>
      <Outlet />
    </SetupQueryClient>
  );
};
