"use client";

import { clsx } from "clsx";
import { Anvil, Loader2 } from "lucide-react";

interface ForgeButtonProps {
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export function ForgeButton({
  loading = false,
  disabled = false,
  onClick,
  children = "FORGE",
}: ForgeButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={clsx(
        "btn btn-forge btn-primary relative overflow-hidden",
        loading && "loading"
      )}
    >
      {loading ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Forging...</span>
        </>
      ) : (
        <>
          <Anvil className="w-5 h-5" />
          <span>{children}</span>
        </>
      )}
    </button>
  );
}
