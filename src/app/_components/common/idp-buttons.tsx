import React from "react";
import type { IdentityProvider } from "@ln-foot/types";

interface Props {
  identityProviders: IdentityProvider[];
  loginAction: () => Promise<void>;
}

const IdentityProviderButtons: React.FC<Props> = ({
  identityProviders,
  loginAction,
}) => (
  <form
    action={loginAction}
  >
    {identityProviders.map((idp) => (
      <button
        key={idp.alias}
        type="submit"
        className="idp-button"
      >
        <img
          src={`/assets/${idp.alias}.svg`}
          alt={idp.displayName}
          className="h-5 w-5"
        />
        {idp.displayName}
      </button>
    ))}
  </form>
);

export default IdentityProviderButtons;
