type Stat = {
  label: string;
  value: string;
  detail: string;
};

export function StatGrid({ stats }: { stats: Stat[] }) {
  return (
    <div className="backend-stats">
      {stats.map((stat) => (
        <article key={stat.label}>
          <span>{stat.label}</span>
          <strong>{stat.value}</strong>
          <p>{stat.detail}</p>
        </article>
      ))}
    </div>
  );
}

export function EmptyPanel({
  title,
  text,
  items = [],
}: {
  title: string;
  text: string;
  items?: string[];
}) {
  return (
    <article className="backend-panel">
      <h2>{title}</h2>
      <p>{text}</p>
      {items.length > 0 && (
        <div className="backend-list">
          {items.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      )}
    </article>
  );
}
