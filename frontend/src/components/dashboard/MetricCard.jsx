export default function MetricCard({
  title,
  value = 0,
  suffix = "",
  icon,
  color = "bg-blue-600",
  subtitle = "",
}) {
  return (
    <div className="group rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-purple-500 hover:shadow-purple-500/20">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">

            {Number(value || 0).toLocaleString()}
            {suffix}

          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-slate-500">
              {subtitle}
            </p>
          )}

        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl text-white transition group-hover:scale-110 ${color}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}