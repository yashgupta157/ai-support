export default function ToolCard({
  title,
  description,
  children,
}) {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="text-2xl font-bold">
        {title}
      </h2>

      <p className="text-slate-400 mt-2 mb-6">
        {description}
      </p>

      {children}

    </div>
  );
}