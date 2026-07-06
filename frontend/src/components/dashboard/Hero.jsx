import {
  ShieldCheck,
  Cpu,
  HardDrive,
  MemoryStick,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuthContext } from "../../context/AuthContext";
import LiveClock from "./LiveClock";

export default function Hero({
  system,
  loading,
}) {
  const { user } = useAuthContext();

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 17
      ? "Good Afternoon"
      : hour < 21
      ? "Good Evening"
      : "Good Night";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 backdrop-blur-xl sm:p-6 lg:p-8"
    >
      <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">

        {/* Left */}

        <div className="flex-1">

          <h1 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">

            {greeting},{" "}

            <span className="break-words text-cyan-400">
              {user?.name}
            </span>

            👋

          </h1>

          <p className="mt-3 text-sm text-slate-400 sm:text-base">
            Welcome to InfraGPT Enterprise Dashboard
          </p>

          {/* Status Pills */}

          <div className="mt-6 flex flex-wrap gap-3">

            <div className="flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-2">

              <ShieldCheck
                size={18}
                className="text-green-400"
              />

              <span className="text-sm text-green-300">
                Healthy
              </span>

            </div>

            {!loading && system && (
              <>
                <div className="flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2">

                  <Cpu
                    size={18}
                    className="text-blue-400"
                  />

                  <span className="text-sm text-blue-300">
                    CPU {system.cpu}%
                  </span>

                </div>

                <div className="flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2">

                  <MemoryStick
                    size={18}
                    className="text-purple-400"
                  />

                  <span className="text-sm text-purple-300">
                    RAM {system.ram.percentage}%
                  </span>

                </div>

                <div className="flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2">

                  <HardDrive
                    size={18}
                    className="text-cyan-400"
                  />

                  <span className="text-sm text-cyan-300">
                    Disk {system.disk.used}%
                  </span>

                </div>
              </>
            )}

          </div>

        </div>

        {/* Right */}

        <div className="flex justify-center xl:justify-end">
          <LiveClock />
        </div>

      </div>
    </motion.div>
  );
}