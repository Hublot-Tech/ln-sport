"use client";

import React from "react";
import type { IdentityProvider } from "@ln-foot/types";

interface Props {
  identityProviders: IdentityProvider[];
  loginAction: string;
}

const IdentityProviderButtons: React.FC<Props> = ({
  identityProviders,
  loginAction,
}) => (
  <>
    {identityProviders.map((idp) => (
      <button
        key={idp.alias}
        type="button"
        className="idp-button"
        onClick={() =>
          (window.location.href = `${loginAction}?kc_idp=${idp.alias}`)
        }
      >
        <img
          src={`/assets/${idp.alias}.svg`}
          alt={idp.displayName}
          className="h-5 w-5"
        />
        {idp.displayName}
      </button>
    ))}
  </>
);

export default IdentityProviderButtons;
