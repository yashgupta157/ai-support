import {
  ShieldCheck,
  Lock,
  Network,
  Laptop,
  RefreshCcw,
  UserCheck,
} from "lucide-react";

const recommendations = [
  {
    icon: <ShieldCheck size={20} />,
    title: "Enable Windows Firewall",
    description: "Ensure all network profiles have firewall protection enabled.",
    color: "text-green-400",
  },
  {
    icon: <Lock size={20} />,
    title: "Enable Multi-Factor Authentication",
    description: "Protect administrator accounts with MFA.",
    color: "text-blue-400",
  },
  {
    icon: <Network size={20} />,
    title: "Close Unused Ports",
    description: "Review open ports like 21, 23, and 3389 if not required.",
    color: "text-red-400",
  },
  {
    icon: <Laptop size={20} />,
    title: "Keep Windows Updated",
    description: "Install the latest security patches and cumulative updates.",
    color: "text-yellow-400",
  },
  {
    icon: <RefreshCcw size={20} />,
    title: "Rotate Passwords",
    description: "Update privileged account passwords regularly.",
    color: "text-purple-400",
  },
  {
    icon: <UserCheck size={20} />,
    title: "Review User Accounts",
    description: "Disable inactive users and verify administrator access.",
    color: "text-cyan-400",
  },
];

export default function Recommendations() {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="text-2xl font-bold mb-6">
        AI Security Recommendations
      </h2>

      <div className="space-y-5">

        {recommendations.map((item, index) => (

          <div
            key={index}
            className="flex gap-4 items-start border-b border-slate-800 pb-4 last:border-none"
          >

            <div
              className={`w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center ${item.color}`}
            >
              {item.icon}
            </div>

            <div className="flex-1">

              <h3 className="font-semibold text-lg">
                {item.title}
              </h3>

              <p className="text-slate-400 mt-1">
                {item.description}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}