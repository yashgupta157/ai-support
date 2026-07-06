import {
  ShieldAlert,
  ShieldCheck,
  Network,
  Lock,
  AlertTriangle,
} from "lucide-react";

export default function ThreatFeed({ security, loading }) {
  const threats = [];

  if (security) {
    if (security.firewall === false) {
      threats.push({
        icon: <ShieldAlert size={18} />,
        title: "Firewall Disabled",
        severity: "Critical",
        time: "Just now",
        color: "text-red-400",
      });
    }

    if (security.defender === false) {
      threats.push({
        icon: <ShieldAlert size={18} />,
        title: "Windows Defender is offline",
        severity: "Critical",
        time: "Just now",
        color: "text-red-400",
      });
    }

    if (security.rdp) {
      threats.push({
        icon: <Network size={18} />,
        title: "Remote Desktop is enabled",
        severity: "High",
        time: "Just now",
        color: "text-orange-400",
      });
    }

    if (security.smbv1) {
      threats.push({
        icon: <AlertTriangle size={18} />,
        title: "SMBv1 protocol is enabled",
        severity: "High",
        time: "Just now",
        color: "text-yellow-400",
      });
    }

    if (security.bitlocker === false) {
      threats.push({
        icon: <Lock size={18} />,
        title: "BitLocker is disabled",
        severity: "Medium",
        time: "Just now",
        color: "text-amber-400",
      });
    }

    if (security.uac === false) {
      threats.push({
        icon: <ShieldCheck size={18} />,
        title: "User Account Control is disabled",
        severity: "Medium",
        time: "Just now",
        color: "text-yellow-400",
      });
    }

    if ((security.openPorts?.length || 0) > 0) {
      threats.push({
        icon: <Network size={18} />,
        title: `${security.openPorts.length} open port${security.openPorts.length > 1 ? "s" : ""}`,
        severity: "Info",
        time: "Current",
        color: "text-cyan-400",
      });
    }
  }

  const feedItems = !loading && threats.length === 0
    ? [
        {
          icon: <ShieldCheck size={18} />,
          title: "No active security issues detected",
          severity: "Safe",
          time: "Now",
          color: "text-green-400",
        },
      ]
    : threats;

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

      <h2 className="text-2xl font-bold mb-6">
        Threat Timeline
      </h2>

      <div className="space-y-5">

        {(loading ? [{ title: "Loading security status...", severity: "Info", time: "Now", color: "text-slate-400", icon: <ShieldCheck size={18} /> }] : feedItems).map((item, index) => (

          <div
            key={index}
            className="flex items-start gap-4"
          >

            <div
              className={`w-11 h-11 rounded-xl bg-slate-800 flex items-center justify-center ${item.color}`}
            >
              {item.icon}
            </div>

            <div className="flex-1">

              <div className="flex justify-between">

                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <span className="text-xs text-slate-500">
                  {item.time}
                </span>

              </div>

              <p className={`text-sm mt-1 ${item.color}`}>
                {item.severity}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}