import React from "react";
import type { StatisticItem } from "@/types/content";
import styles from "./FinancialStatistics.module.css";

interface FinancialStatisticsProps {
  items: StatisticItem[];
  variant?: "dark-outlined" | "light-minimal";
}

export function FinancialStatistics({
  items,
  variant = "dark-outlined",
}: FinancialStatisticsProps) {
  const isDark = variant === "dark-outlined";

  return (
    <div className={isDark ? styles.gridDark : styles.gridLight}>
      {items.map((item) => (
        <div key={item.id} className={isDark ? styles.itemDark : styles.itemLight}>
          <div className={isDark ? styles.valueDark : styles.valueLight}>{item.value}</div>
          <div className={isDark ? styles.labelDark : styles.labelLight}>{item.label}</div>
        </div>
      ))}
    </div>
  );
}
