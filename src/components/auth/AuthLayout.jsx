import { motion } from "framer-motion";
import AnimatedBackground from "./AnimatedBackground";

export default function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="relative min-h-screen overflow-hidden">

      <AnimatedBackground />

      <div className="relative z-10 flex min-h-screen items-center justify-center p-6">

        <motion.div
          initial={{
            opacity: 0,
            y: 40,
            scale: 0.95,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.6,
          }}
          className="w-full max-w-md rounded-3xl border border-slate-700/50 bg-slate-900/70 backdrop-blur-2xl shadow-2xl shadow-purple-500/20 p-8"
        >

          {/* Logo */}

          <div className="text-center mb-10">

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent"
            >
              InfraGPT
            </motion.h1>

            <p className="text-slate-400 mt-3">
              AI Infrastructure Assistant
            </p>

          </div>

          <div className="mb-8">

            <h2 className="text-3xl font-bold text-white">
              {title}
            </h2>

            <p className="text-slate-400 mt-2">
              {subtitle}
            </p>

          </div>

          {children}

        </motion.div>

      </div>

    </div>
  );
}