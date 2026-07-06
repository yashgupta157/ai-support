import CountUp from "react-countup";

export default function StatCard({
  title,
  value = 0,
  icon,
  color = "bg-indigo-600",
}) {
  return (
    <div className="group rounded-3xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/20">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-white">

            <CountUp
              end={Number(value) || 0}
              duration={1}
            />

          </h2>

        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${color} transition group-hover:scale-110`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}