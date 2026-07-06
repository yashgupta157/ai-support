import si from "systeminformation";

export async function getSystemStats() {
  try {
    // Run all system queries in parallel
    const [
      cpuLoad,
      mem,
      fs,
      time,
      networkStats,
    ] = await Promise.all([
      si.currentLoad(),
      si.mem(),
      si.fsSize(),
      si.time(),
      si.networkStats(),
    ]);

    const disk = fs[0] || {};

    return {
      cpu: Math.round(cpuLoad.currentLoad),

      ram: {
        used: Number((mem.used / 1024 ** 3).toFixed(1)),
        total: Number((mem.total / 1024 ** 3).toFixed(1)),
        percentage: Math.round(
          (mem.used / mem.total) * 100
        ),
      },

      disk: {
        used: Math.round(disk.use || 0),
        free: Number(
          (((disk.available || 0) / 1024 ** 3)).toFixed(1)
        ),
        size: Number(
          (((disk.size || 0) / 1024 ** 3)).toFixed(1)
        ),
      },

      uptime: Math.floor(time.uptime),

      network: {
        rx: Math.round(networkStats[0]?.rx_sec || 0),
        tx: Math.round(networkStats[0]?.tx_sec || 0),
      },

      // Compute a simple dynamic security score (0-100).
      // Higher resource usage reduces the security score.
      // We weight RAM more heavily because low free RAM often indicates problems.
      security: (() => {
        const cpuPercent = Math.round(cpuLoad.currentLoad || 0);
        const ramPercent = Math.round((mem.used / mem.total) * 100) || 0;
        const diskPercent = Math.round(disk.use || 0);

        // Weights must sum to 1.0
        const cpuWeight = 0.3;
        const ramWeight = 0.4;
        const diskWeight = 0.3;

        const loadScore = Math.round(
          cpuPercent * cpuWeight +
          ramPercent * ramWeight +
          diskPercent * diskWeight
        );

        const securityScore = Math.max(0, Math.min(100, 100 - loadScore));

        return securityScore;
      })(),
      // Compute a dynamic AI health score (0-100).
      // Lower resource headroom reduces AI health. Includes a small network contribution.
      aiHealth: (() => {
        const cpuPercent = Math.round(cpuLoad.currentLoad || 0);
        const ramPercent = Math.round((mem.used / mem.total) * 100) || 0;
        const diskPercent = Math.round(disk.use || 0);
        const netRx = Math.round(networkStats[0]?.rx_sec || 0);
        const netTx = Math.round(networkStats[0]?.tx_sec || 0);

        // Normalize network to 0-100 by scaling bytes/sec (tunable)
        const netLoad = Math.min(100, Math.round((Math.abs(netRx) + Math.abs(netTx)) / 10000));

        const cpuWeight = 0.25;
        const ramWeight = 0.45;
        const diskWeight = 0.2;
        const netWeight = 0.1;

        const loadScore = Math.round(
          cpuPercent * cpuWeight +
          ramPercent * ramWeight +
          diskPercent * diskWeight +
          netLoad * netWeight
        );

        return Math.max(0, Math.min(100, 100 - loadScore));
      })(),
    };

  } catch (err) {
    console.error("System Monitor Error:", err);
    throw err;
  }
}