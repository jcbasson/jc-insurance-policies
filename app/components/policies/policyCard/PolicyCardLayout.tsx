import type { ReactNode } from "react";

export const cardShell =
  "bg-policies-surface text-policies-body [color-scheme:light] w-full rounded-[2.5rem] md:rounded-policies-card p-6 sm:p-8 md:p-10 shadow-policies-card flex flex-col md:flex-row md:justify-between md:items-start";

export const policyNumberAccent = "text-policies-accent";

export const policyNumberLabelMobile = "text-lg sm:text-xl font-bold mb-1";

export const policyNumberValueMobile =
  "text-policies-body tabular-nums text-xl sm:text-2xl font-medium";

export const policyNumberValue =
  "text-policies-body tabular-nums text-2xl font-bold";

export const detailText =
  "text-sm sm:text-base md:text-policies-detail text-policies-body";

export const columnDivider =
  "md:border-l md:border-policies-divider md:pl-12 md:space-y-5 md:mt-0";

export const focusRing = "policies-focus-ring";

export const footerLinks =
  "flex justify-between gap-3 sm:gap-4 md:justify-start md:gap-0 md:space-x-8 mt-6 sm:mt-8 md:mt-10 mb-6 sm:mb-8 md:mb-0 text-xs sm:text-sm md:text-policies-links font-medium md:font-semibold text-policies-link-meta";

export const footerLink = [
  "flex items-center underline underline-offset-2 shrink-0 rounded-sm",
  "transition-colors hover:text-policies-accent active:text-policies-accent",
  focusRing,
].join(" ");

export const primaryCta = [
  "w-full md:w-auto bg-policies-cta-primary-bg border-2 border-policies-cta-primary-border text-policies-cta-primary-text",
  "font-bold md:font-semibold py-3 sm:py-4 md:py-2.5 px-8 sm:px-10 rounded-full text-sm sm:text-base md:text-sm whitespace-nowrap",
  "transition-[color,transform,box-shadow,filter] hover:brightness-[0.98] active:brightness-95 active:scale-[0.99]",
  focusRing,
].join(" ");

export const secondaryCta = [
  "w-full md:w-auto bg-policies-cta-secondary-bg border-2 border-policies-cta-secondary-border text-policies-cta-secondary-text",
  "font-bold md:font-semibold py-3 sm:py-4 md:py-2.5 px-8 sm:px-10 rounded-full text-sm sm:text-base md:text-sm whitespace-nowrap",
  "transition-[color,transform,box-shadow] hover:bg-blue-50 active:bg-blue-100 active:scale-[0.99]",
  focusRing,
].join(" ");

export const PolicyDetailRow = ({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) => {
  return (
    <p>
      <span className="font-bold">{label}</span> {value}
    </p>
  );
};

const PolicyCardActions = () => {
  return (
    <div className="flex flex-col space-y-4">
      <button type="button" className={primaryCta} tabIndex={0}>
        Make a claim
      </button>
      <button type="button" className={secondaryCta} tabIndex={0}>
        Manage my policy
      </button>
    </div>
  );
};

type PolicyCardLayoutProps = {
  policyNo: string;
  primaryColumn: ReactNode;
  secondaryColumn: ReactNode;
};

export const PolicyCardLayout = ({
  policyNo,
  primaryColumn,
  secondaryColumn,
}: PolicyCardLayoutProps) => {
  return (
    <div className={cardShell}>
      <div className="flex-1 w-full min-w-0">
        <div className="mb-5 sm:mb-6 md:hidden">
          <h2 className={`${policyNumberLabelMobile} ${policyNumberAccent}`}>
            Policy number:
          </h2>
          <p className={policyNumberValueMobile}>{policyNo}</p>
        </div>

        <h2 className="hidden md:block text-2xl font-bold mb-8">
          <span className={policyNumberAccent}>Policy number:</span>{" "}
          <span className={policyNumberValue}>{policyNo}</span>
        </h2>

        <div className={`space-y-2 mb-6 sm:mb-8 md:hidden ${detailText}`}>
          {primaryColumn}
          {secondaryColumn}
        </div>

        <div className={`hidden md:flex md:flex-row ${detailText}`}>
          <div className="space-y-5 pr-12">{primaryColumn}</div>
          <div className={columnDivider}>{secondaryColumn}</div>
        </div>

        <nav className={footerLinks} aria-label="Policy documents">
          <a className={footerLink} href="#" tabIndex={0}>
            <i
              className="fas fa-external-link-alt mr-1.5 sm:mr-2 text-[10px] sm:text-xs md:text-policies-icon"
              aria-hidden="true"
            ></i>
            View PDS
          </a>
          <a className={footerLink} href="#" tabIndex={0}>
            <i
              className="fas fa-external-link-alt mr-1.5 sm:mr-2 text-[10px] sm:text-xs md:text-policies-icon"
              aria-hidden="true"
            ></i>
            Certificate of Insurance
          </a>
        </nav>

        <div className="md:hidden">
          <PolicyCardActions />
        </div>
      </div>

      <div className="hidden md:flex md:ml-12 md:w-auto md:shrink-0">
        <PolicyCardActions />
      </div>
    </div>
  );
};
