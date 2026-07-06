import SecurityDashboard from "../components/security/SecurityDashboard";
import SecurityScore from "../components/security/SecurityScore";
import ThreatFeed from "../components/security/ThreatFeed";
import SecurityCharts from "../components/security/SecurityCharts";
import ScanButton from "../components/security/ScanButton";
import Recommendations from "../components/security/SecurityRecommendations";
import useSecurity from "../hooks/useSecurity";

export default function Security() {
  const { security, loading, report, scanSystem, scanLoading } = useSecurity();

  const threatLevel = security?.score >= 90
    ? "Excellent"
    : security?.score >= 75
    ? "Good"
    : security?.score >= 50
    ? "Medium"
    : "Critical";

  const reportItems = report.length
    ? report
    : security
    ? [
        { name: "Windows Defender", status: security.defender ? "Running" : "Disabled" },
        { name: "Windows Firewall", status: security.firewall ? "Enabled" : "Disabled" },
        { name: "BitLocker", status: security.bitlocker ? "Enabled" : "Disabled" },
        { name: "Secure Boot", status: security.secureBoot ? "Enabled" : "Disabled" },
        { name: "User Account Control", status: security.uac ? "Enabled" : "Disabled" },
        { name: "Remote Desktop", status: security.rdp ? "Enabled" : "Disabled" },
        { name: "SMBv1", status: security.smbv1 ? "Enabled" : "Disabled" },
      ]
    : [];

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-4xl font-bold">
          🛡 Security Center
        </h1>

        <p className="text-slate-400 mt-2">
          Monitor infrastructure security, firewall status, threats,
          vulnerabilities and AI-powered recommendations.
        </p>

      </div>

      {/* Security Score + Dashboard */}


        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          <div className="xl:col-span-1">

            <SecurityScore score={security?.score} loading={loading} />

          </div>

          <div className="xl:col-span-2">

            <SecurityDashboard report={reportItems} score={security?.score} threatLevel={threatLevel} loading={loading} />

          </div>

        </div>

      {/* Threat Feed */}

      <ThreatFeed security={security} loading={loading} />

      {/* Charts */}

      <SecurityCharts security={security} loading={loading} />

      {/* AI Recommendations */}

      <Recommendations security={security} />
      <ScanButton scanSystem={scanSystem} scanLoading={scanLoading} security={security} />

    </div>
  );
}