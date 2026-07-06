import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

async function runPowerShell(cmd) {
  try {
    const full = `powershell -NoProfile -NonInteractive -Command "${cmd} | ConvertTo-Json -Compress"`;
    const { stdout } = await execAsync(full, { windowsHide: true, maxBuffer: 1024 * 1024 * 5 });
    return JSON.parse(stdout);
  } catch (err) {
    // Return null on any failure so caller can fallback
    return null;
  }
}

export async function getSecurityStatus() {
  // If not on Windows, return mock values
  if (process.platform !== "win32") {
    return {
      defender: true,
      firewall: true,
      bitlocker: false,
      secureBoot: true,
      uac: true,
      rdp: false,
      smbv1: false,
      openPorts: [80, 443],
      score: 94,
    };
  }

  // Windows: attempt to gather each check. Keep failures safe.
  const results = {};

  // Defender
  const def = await runPowerShell("Get-MpComputerStatus | Select-Object AMServiceEnabled,AMRunning,RealTimeProtectionEnabled");
  results.defender = !!(def && (def.AMServiceEnabled || def.AMRunning || def.RealTimeProtectionEnabled));

  // Firewall - check if any profile is Enabled
  const fw = await runPowerShell("Get-NetFirewallProfile | Select-Object Name,Enabled");
  if (fw) {
    if (Array.isArray(fw)) {
      results.firewall = fw.some((p) => p.Enabled === true || p.Enabled === "True");
    } else {
      results.firewall = !!fw.Enabled;
    }
  } else {
    results.firewall = null;
  }

  // BitLocker
  const bl = await runPowerShell("Get-BitLockerVolume | Select-Object MountPoint,ProtectionStatus");
  if (bl) {
    // If any volume has ProtectionStatus 1 means On
    if (Array.isArray(bl)) {
      results.bitlocker = bl.some((v) => v.ProtectionStatus === 1 || v.ProtectionStatus === "On");
    } else {
      results.bitlocker = bl.ProtectionStatus === 1 || bl.ProtectionStatus === "On";
    }
  } else {
    results.bitlocker = false;
  }

  // Secure Boot
  const sb = await runPowerShell("Confirm-SecureBootUEFI");
  results.secureBoot = sb === true || sb === "True";

  // UAC
  const uac = await runPowerShell("Get-ItemProperty -Path HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System -Name EnableLUA | Select-Object -ExpandProperty EnableLUA");
  results.uac = uac === 1 || uac === true || uac === "True";

  // RDP (fDenyTSConnections == 0 means enabled)
  const rdp = await runPowerShell("Get-ItemProperty -Path HKLM:\\System\\CurrentControlSet\\Control\\Terminal Server -Name fDenyTSConnections | Select-Object -ExpandProperty fDenyTSConnections");
  results.rdp = rdp === 0 || rdp === "0" ? true : false;

  // SMBv1
  const smb = await runPowerShell("Get-SmbServerConfiguration | Select-Object -ExpandProperty EnableSMB1Protocol");
  results.smbv1 = smb === true || smb === "True";

  // Open ports (listening TCP local ports)
  const ports = await runPowerShell("Get-NetTCPConnection -State Listen | Select-Object -ExpandProperty LocalPort | Sort-Object -Unique");
  results.openPorts = Array.isArray(ports) ? ports.map(Number) : ports ? [Number(ports)] : [];

  // Compute score
  let score = 100;

  if (!results.defender) score -= 25;
  if (!results.firewall) score -= 25;
  if (!results.bitlocker) score -= 10;
  if (!results.secureBoot) score -= 5;
  if (!results.uac) score -= 10;
  if (results.rdp) score -= 5; // RDP enabled reduces score
  if (results.smbv1) score -= 15;

  score -= Math.min(10, (results.openPorts?.length || 0) * 2);

  if (score < 0) score = 0;
  if (score > 100) score = 100;

  results.score = score;

  return results;
}
