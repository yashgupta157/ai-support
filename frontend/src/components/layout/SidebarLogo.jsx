import { Cpu } from "lucide-react";

export default function SidebarLogo() {
  return (
    <div className="border-b border-slate-800 p-6">

      <div className="flex items-center gap-4">

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-600/20">

          <Cpu size={28} className="text-white" />

        </div>

        <div>

          <h1 className="text-2xl font-bold text-white">
            InfraGPT
          </h1>

          <p className="text-sm text-slate-400">
            AI-Powered IT Operations Platform
          </p>

        </div>

      </div>

    </div>
  );
}