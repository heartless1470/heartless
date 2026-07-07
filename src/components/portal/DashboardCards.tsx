"use client";

import Link from "next/link";

export interface DashboardCardProps {
  label: string;
  value: string | number;
  detail: string;
  href?: string;
  actionLabel?: string;
}

export function DashboardCard({ label, value, detail, href, actionLabel }: DashboardCardProps) {
  const content = (
    <article className="dashboard-card">
      <div className="card-header">
        <span className="card-label">{label}</span>
        {href && <span className="card-action">{actionLabel || "View"} →</span>}
      </div>
      <strong className="card-value">{value}</strong>
      <p className="card-detail">{detail}</p>
    </article>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

export function DashboardCardGrid({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <section className="dashboard-section">
      {title && <h2>{title}</h2>}
      <div className="dashboard-grid">{children}</div>
    </section>
  );
}

export function ActivityItem({
  user,
  action,
  entity,
  timestamp,
}: {
  user: string;
  action: string;
  entity: string;
  timestamp: string;
}) {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  let timeStr = "";
  if (diff < 60000) {
    timeStr = "just now";
  } else if (diff < 3600000) {
    timeStr = `${Math.floor(diff / 60000)} min ago`;
  } else if (diff < 86400000) {
    timeStr = `${Math.floor(diff / 3600000)} hours ago`;
  } else {
    timeStr = date.toLocaleDateString();
  }

  return (
    <div className="activity-item">
      <div className="activity-content">
        <p className="activity-text">
          <strong>{user}</strong> {action}
        </p>
        <p className="activity-entity">{entity}</p>
      </div>
      <time className="activity-time">{timeStr}</time>
    </div>
  );
}
