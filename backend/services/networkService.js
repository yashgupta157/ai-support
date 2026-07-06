import ping from "ping";
import dns from "dns/promises";
import { exec } from "child_process";
import { promisify } from "util";
import net from "net";
import axios from "axios";

const execAsync = promisify(exec);

// ----------------------------
// Port Scanner Helper
// ----------------------------
async function checkPort(host, port) {
  return new Promise((resolve) => {
    const socket = new net.Socket();

    socket.setTimeout(1000);

    socket.on("connect", () => {
      socket.destroy();

      resolve({
        port,
        status: "open",
      });
    });

    socket.on("timeout", () => {
      socket.destroy();

      resolve({
        port,
        status: "closed",
      });
    });

    socket.on("error", () => {
      socket.destroy();

      resolve({
        port,
        status: "closed",
      });
    });

    socket.connect(port, host);
  });
}

// ----------------------------
// Main Network Analyzer
// ----------------------------
export async function analyzeNetwork(type, target) {

  type = type.toLowerCase();

  switch (type) {

    // --------------------------------
    // Ping
    // --------------------------------
    case "ping": {

      const result = await ping.promise.probe(target);

      return {
        host: result.host,
        ip: result.numeric_host,
        alive: result.alive,
        time: result.time,
      };
    }

    // --------------------------------
    // DNS Lookup
    // --------------------------------
    case "dns": {

      const addresses = await dns.lookup(target, {
        all: true,
      });

      return {
        domain: target,
        records: addresses,
      };
    }

    // --------------------------------
    // Traceroute (Windows)
    // --------------------------------
    case "traceroute": {

      const { stdout } = await execAsync(
        `tracert -d -h 10 ${target}`
      );

      return stdout;
    }

    // --------------------------------
    // Port Scanner
    // --------------------------------
    case "portscan": {

      let ports = [
        21,
        22,
        25,
        53,
        80,
        110,
        143,
        443,
        3389,
        8080,
      ];

      if (target && target.includes("|")) {
        // Support target|ports payload if passed as combined string
        const [parsedTarget, parsedPorts] = target.split("|");
        target = parsedTarget;
        ports = parsedPorts
          .split(",")
          .map((port) => Number(port.trim()))
          .filter(Boolean);
      }

      const results = [];

      for (const port of ports) {
        results.push(await checkPort(target, port));
      }

      return {
        host: target,
        ports: results,
      };
    }

    // --------------------------------
    // WHOIS Lookup
    // --------------------------------
    case "whois": {
      const isIP = /^\d+\.\d+\.\d+\.\d+$/.test(target);
      const endpoint = isIP
        ? `https://rdap.org/ip/${target}`
        : `https://rdap.org/domain/${target}`;

      const { data } = await axios.get(endpoint, {
        headers: {
          Accept: "application/json",
        },
      });

      return {
        target,
        data,
      };
    }

    // --------------------------------
    // Public IP
    // --------------------------------
    case "publicip": {
      const { data } = await axios.get(
        "https://api.ipify.org?format=json"
      );
      return {
        publicIp: data.ip,
      };
    }

    // --------------------------------
    // Latency Test
    // --------------------------------
    case "latency": {
      const extra = process.platform === "win32"
        ? ["-n", "5"]
        : ["-c", "5"];

      const result = await ping.promise.probe(target, {
        timeout: 10,
        extra,
      });

      return {
        host: result.host,
        ip: result.numeric_host,
        alive: result.alive,
        time: result.time,
        min: result.min,
        max: result.max,
        avg: result.avg,
        stddev: result.stddev,
        output: result.output,
      };
    }

    // --------------------------------
    // IP Lookup
    // --------------------------------
    case "iplookup": {

      const { data } = await axios.get(
        `https://ipapi.co/${target}/json/`
      );

      return data;
    }

    // --------------------------------
    // Invalid Tool
    // --------------------------------
    default:

      throw new Error(
        `Unsupported tool: ${type}`
      );
  }
}