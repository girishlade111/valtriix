import React from "react";

interface SectionLabelProps {
  text: string;
  variant?: "light" | "dark-translucent" | "dark-raised" | "muted";
  alignment?: "left" | "center";
}

export function SectionLabel({
  text,
  variant = "light",
  alignment = "left",
}: SectionLabelProps) {
  const variantClass =
    variant === "dark-translucent"
      ? "badge--dark-translucent"
      : variant === "dark-raised"
        ? "badge--dark-raised"
        : variant === "muted"
          ? "badge--muted"
          : "";

  return (
    <div
      className={`badge ${variantClass}`}
      style={alignment === "center" ? { marginLeft: "auto", marginRight: "auto" } : undefined}
    >
      <span className="badge-text">{text}</span>
    </div>
  );
}
