import PingTool from "./PingTool";
import DnsLookup from "./DnsLookup";
import PortScanner from "./PortScanner";
import SSLChecker from "./SSLChecker";
import WhoisLookup from "./WhoisLookup";
import PublicIP from "./PublicIP";
import LatencyTest from "./LatencyTest";
import ResultCard from "./ResultCard";

export default function NetworkToolkit() {
  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          🌐 Network Toolkit
        </h1>

        <p className="text-slate-400 mt-2">
          Professional networking utilities for IT administrators.
        </p>

      </div>

      <PingTool />

      <DnsLookup />

      <PortScanner />

      <LatencyTest />

      <PublicIP />

      <WhoisLookup />

      <SSLChecker />

      <ResultCard />

    </div>
  );
}