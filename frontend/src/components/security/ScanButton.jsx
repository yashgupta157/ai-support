import {
  ShieldCheck,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";

export default function ScanButton({
  scanSystem,
  scanLoading,
  security,
}) {
  const report = [
    {
      name: "Windows Defender",
      status: security?.defender ? "Enabled" : "Disabled",
    },
    {
      name: "Firewall",
      status: security?.firewall ? "Enabled" : "Disabled",
    },
    {
      name: "BitLocker",
      status: security?.bitlocker ? "Enabled" : "Disabled",
    },
    {
      name: "Secure Boot",
      status: security?.secureBoot ? "Enabled" : "Disabled",
    },
    {
      name: "User Account Control",
      status: security?.uac ? "Enabled" : "Disabled",
    },
    {
      name: "Remote Desktop",
      status: security?.rdp ? "Enabled" : "Disabled",
    },
    {
      name: "SMBv1",
      status: security?.smbv1 ? "Enabled" : "Disabled",
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-lg">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Security Scan
          </h2>

          <p className="mt-2 text-slate-400">
            Scan Windows Defender, Firewall,
            BitLocker, Secure Boot and more.
          </p>

        </div>

        <button
          onClick={scanSystem}
          disabled={scanLoading}
          className="flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-slate-700"
        >
          {scanLoading ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Scanning...
            </>
          ) : (
            <>
              <ShieldCheck size={18} />
              Run Security Scan
            </>
          )}
        </button>

      </div>

      {security && (
        <>
          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">

            <h3 className="mb-3 text-lg font-semibold text-white">
              Security Score
            </h3>

            <div className="flex items-center justify-between">

              <span className="text-slate-400">
                Current Score
              </span>

              <span className="text-3xl font-bold text-green-400">
                {security.score ?? 0}%
              </span>

            </div>

          </div>

          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">

            <h3 className="mb-4 text-lg font-semibold text-white">
              Security Report
            </h3>

            <div className="space-y-4">

              {report.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-slate-800 pb-3 last:border-none"
                >

                  <span className="font-medium text-white">
                    {item.name}
                  </span>

                  <div
                    className={`flex items-center gap-2 ${
                      item.status === "Enabled"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {item.status === "Enabled" ? (
                      <CheckCircle size={18} />
                    ) : (
                      <XCircle size={18} />
                    )}

                    <span>{item.status}</span>

                  </div>

                </div>
              ))}

            </div>

          </div>

          <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950 p-5">

            <h3 className="mb-3 text-lg font-semibold text-white">
              Open Ports
            </h3>

            {security.openPorts &&
            security.openPorts.length > 0 ? (
              <div className="flex flex-wrap gap-2">

                {security.openPorts.map(
                  (port, index) => (
                    <span
                      key={index}
                      className="rounded-lg bg-cyan-600 px-3 py-1 text-sm text-white"
                    >
                      {port}
                    </span>
                  )
                )}

              </div>
            ) : (
              <p className="text-slate-400">
                No open ports detected.
              </p>
            )}

          </div>
        </>
      )}

    </div>
  );
}