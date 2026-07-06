import SecurityCard from "./SecurityCard";

export default function SecurityDashboard({
  report = [],
  score = 100,
  threatLevel = "Excellent",
}) {

  const firewall =
    report.find((i) => i.name === "Windows Firewall")?.status ||
    "Unknown";

  const defender =
    report.find((i) => i.name === "Windows Defender")?.status ||
    "Unknown";

  const bitlocker =
    report.find((i) => i.name === "BitLocker")?.status ||
    "Unknown";

  const rdp =
    report.find((i) => i.name === "Remote Desktop")?.status ||
    "Unknown";

  const smb =
    report.find((i) => i.name === "SMBv1")?.status ||
    "Unknown";

  const passedChecks = report.filter(
    (i) =>
      i.status === "Enabled" ||
      i.status === "Running"
  ).length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

      <SecurityCard
        title="Security Score"
        value={`${score}%`}
        subtitle={threatLevel}
        icon={<span className="text-3xl">🛡️</span>}
        color="bg-green-600"
      />

      <SecurityCard
        title="Threat Level"
        value={threatLevel}
        subtitle={`${passedChecks}/${report.length} Checks Passed`}
        icon={<span className="text-3xl">⚠️</span>}
        color={
          threatLevel === "Excellent"
            ? "bg-green-600"
            : threatLevel === "Good"
            ? "bg-blue-600"
            : threatLevel === "Medium"
            ? "bg-yellow-500"
            : "bg-red-600"
        }
      />

      <SecurityCard
        title="Firewall"
        value={firewall}
        subtitle="Windows Firewall"
        icon={<span className="text-3xl">🔥</span>}
        color={
          firewall === "Enabled"
            ? "bg-green-600"
            : "bg-red-600"
        }
      />

      <SecurityCard
        title="Windows Defender"
        value={defender}
        subtitle="Antivirus Status"
        icon={<span className="text-3xl">🦠</span>}
        color={
          defender === "Running"
            ? "bg-green-600"
            : "bg-red-600"
        }
      />

      <SecurityCard
        title="BitLocker"
        value={bitlocker}
        subtitle="Disk Encryption"
        icon={<span className="text-3xl">🔒</span>}
        color={
          bitlocker === "Enabled"
            ? "bg-green-600"
            : "bg-red-600"
        }
      />

      <SecurityCard
        title="Remote Desktop"
        value={rdp}
        subtitle={`SMBv1 : ${smb}`}
        icon={<span className="text-3xl">🖥️</span>}
        color={
          rdp === "Disabled"
            ? "bg-green-600"
            : "bg-orange-600"
        }
      />

    </div>
  );
}