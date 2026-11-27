import React from "react";
import Link from "next/link";

interface ActionButtonProps {
  label: string;
  href?: string;
  variant?: "accent" | "dark" | "glass";
  type?: "button" | "submit";
  disabled?: boolean;
  showIcon?: boolean;
  onClick?: () => void;
  className?: string;
}

function CornerDownRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 9.33333L13.3333 6L10 2.66667"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.66667 13.3333V8.66667C2.66667 7.95942 2.94762 7.28115 3.44772 6.78105C3.94781 6.28095 4.62609 6 5.33333 6H13.3333"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ActionButton({
  label,
  href,
  variant = "accent",
  type = "button",
  disabled = false,
  showIcon = true,
  onClick,
  className = "",
}: ActionButtonProps) {
  const variantClass =
    variant === "dark" ? "v-btn--dark" : variant === "glass" ? "v-btn--glass" : "";

  const content = (
    <>
      {showIcon && (
        <span className="v-btn-icon-box" aria-hidden="true">
          <CornerDownRightIcon className="v-btn-icon-primary" />
          <CornerDownRightIcon className="v-btn-icon-clone" />
        </span>
      )}
      <span className="v-btn-text-wrap">
        <span className="v-btn-text-primary">{label}</span>
        <span className="v-btn-text-clone" aria-hidden="true">
          {label}
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`v-btn ${variantClass} ${className}`} aria-label={label}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`v-btn ${variantClass} ${className}`}
      aria-label={label}
    >
      {content}
    </button>
  );
}
