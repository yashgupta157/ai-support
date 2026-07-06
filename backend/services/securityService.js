import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

async function run(command) {
  try {
    const { stdout } = await execAsync(command);

    return stdout.trim();
  } catch {
    return "";
  }
}

export async function securityScan() {

  const report = [];

  // -------------------------
  // Firewall
  // -------------------------

  const firewall = await run(
    "netsh advfirewall show allprofiles"
  );

  report.push({
    name: "Windows Firewall",
    status: firewall.includes("ON")
      ? "Enabled"
      : "Disabled",
  });

  // -------------------------
  // Windows Defender
  // -------------------------

  const defender = await run(
    'powershell "Get-MpComputerStatus | Select AntivirusEnabled"'
  );

  report.push({
    name: "Windows Defender",
    status: defender.includes("True")
      ? "Running"
      : "Disabled",
  });

  // -------------------------
  // BitLocker
  // -------------------------

  const bitlocker = await run(
    "manage-bde -status"
  );

  report.push({
    name: "BitLocker",
    status: bitlocker.includes("Percentage Encrypted")
      ? "Enabled"
      : "Disabled",
  });

  // -------------------------
  // UAC
  // -------------------------

  const uac = await run(
    'reg query "HKLM\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Policies\\System" /v EnableLUA'
  );

  report.push({
    name: "User Account Control",
    status: uac.includes("0x1")
      ? "Enabled"
      : "Disabled",
  });

  // -------------------------
  // Remote Desktop
  // -------------------------

  const rdp = await run(
    'reg query "HKLM\\SYSTEM\\CurrentControlSet\\Control\\Terminal Server" /v fDenyTSConnections'
  );

  report.push({
    name: "Remote Desktop",
    status: rdp.includes("0x0")
      ? "Enabled"
      : "Disabled",
  });

  // -------------------------
  // SMBv1
  // -------------------------

  const smb = await run(
    'powershell "Get-WindowsOptionalFeature -Online -FeatureName SMB1Protocol"'
  );

  report.push({
    name: "SMBv1",
    status: smb.includes("Enabled")
      ? "Enabled"
      : "Disabled",
  });

  return report;
}