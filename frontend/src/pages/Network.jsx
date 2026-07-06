import NetworkToolkit from "../components/network/NetworkToolkit";
import { NetworkProvider } from "../context/NetworkContext";

export default function Network() {
  return (
    <div className="p-8">
      <NetworkProvider>
        <NetworkToolkit />
      </NetworkProvider>
    </div>
  );
}