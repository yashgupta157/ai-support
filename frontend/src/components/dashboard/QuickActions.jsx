import { motion } from "framer-motion";
import {
  MessageSquare,
  Globe,
  Shield,
  Upload,
  Terminal,
  Activity,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  {
    title: "AI Chat",
    subtitle: "Ask InfraGPT",
    icon: <MessageSquare size={28} />,
    color: "from-purple-600 to-pink-500",
    path: "/chat",
  },
  {
    title: "Network",
    subtitle: "Ping • DNS • Trace",
    icon: <Globe size={28} />,
    color: "from-cyan-500 to-blue-500",
    path: "/network",
  },
  {
    title: "Security",
    subtitle: "Security Center",
    icon: <Shield size={28} />,
    color: "from-green-500 to-emerald-600",
    path: "/security",
  },
  {
    title: "Upload Logs",
    subtitle: "Analyze Logs",
    icon: <Upload size={28} />,
    color: "from-orange-500 to-red-500",
    path: "/upload",
  },
  {
    title: "Commands",
    subtitle: "Run PowerShell",
    icon: <Terminal size={28} />,
    color: "from-indigo-500 to-violet-600",
    path: "/commands",
  },
  {
    title: "Monitoring",
    subtitle: "Live Performance",
    icon: <Activity size={28} />,
    color: "from-sky-500 to-cyan-500",
    path: "/dashboard",
  },
];

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-4 sm:p-6">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Frequently used tools
          </p>

        </div>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

        {actions.map((action) => (

          <motion.button
            key={action.title}
            whileHover={{
              scale: 1.03,
              y: -5,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={() => navigate(action.path)}
            className={`group overflow-hidden rounded-2xl bg-gradient-to-r ${action.color} p-5 text-left shadow-lg transition-all duration-300`}
          >

            <div className="flex items-center justify-between">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">

                {action.icon}

              </div>

              <ArrowRight
                size={20}
                className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
              />

            </div>

            <div className="mt-6">

              <h3 className="text-lg font-bold text-white">

                {action.title}

              </h3>

              <p className="mt-2 text-sm text-white/80">

                {action.subtitle}

              </p>

            </div>

          </motion.button>

        ))}

      </div>

    </div>
  );
}