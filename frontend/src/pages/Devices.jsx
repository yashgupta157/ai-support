import { useState, useRef } from "react";
import DeviceDetail from "../components/devices/DeviceDetail";
import DeviceList from "../components/devices/DeviceList";
import DeviceOnboardForm from "../components/devices/DeviceOnboardForm";
import EditDeviceModal from "../components/devices/EditDeviceModal";
import DeleteDeviceModal from "../components/devices/DeleteDeviceModal";
import useDevices from "../hooks/useDevices";
import UndoToast from "../components/ui/UndoToast";

export default function Devices() {
  const {
    loading,
    devices,
    summary,
    selectedDevice,
    metrics,
    commands,
    error,
    commandLoading,
    fetchDevices,
    selectDevice,
    sendCommand,
    createDevice,
    updateDevice,
    deleteDevice,
    restoreDevice,
    deleteLoading,
    refreshSelectedDevice,
  } = useDevices();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [lastDeleted, setLastDeleted] = useState(null);
  const toastTimerRef = useRef(null);

  return (
    <div className="p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Device Management</h1>
          <p className="text-slate-400 mt-2 max-w-2xl">
            Monitor managed endpoints, review device health, and send remote commands from one centralized interface.
          </p>
        </div>

        <button
          onClick={fetchDevices}
          className="rounded-2xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
        >
          Refresh Device List
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-700 bg-red-950 p-4 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="grid gap-8 xl:grid-cols-[380px_1fr]">
        <div className="space-y-8">
          <DeviceOnboardForm createDevice={createDevice} loading={loading} />

          <DeviceList
            devices={devices}
            summary={summary}
            loading={loading}
            selectedDevice={selectedDevice}
            onSelect={selectDevice}
          />
        </div>

        <DeviceDetail
          loading={loading}
          device={selectedDevice}
          metrics={metrics}
          commands={commands}
          onSendCommand={sendCommand}
          commandLoading={commandLoading}
          onOpenEdit={() => setEditOpen(true)}
          onOpenDelete={() => setDeleteOpen(true)}
        />
      </div>

      <EditDeviceModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        device={selectedDevice}
        onSave={async (payload) => {
          if (!selectedDevice) return;
          await updateDevice(selectedDevice._id, payload);
          setEditOpen(false);
          await refreshSelectedDevice();
        }}
        saving={loading}
      />

      <DeleteDeviceModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        device={selectedDevice}
        loading={deleteLoading}
        onConfirm={async () => {
          if (!selectedDevice) return;

          try {
            await deleteDevice(selectedDevice._id);
            setLastDeleted({ id: selectedDevice._id, name: selectedDevice.displayName || selectedDevice.hostname });
            setToastOpen(true);
            // auto-dismiss after 6s
            if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
            toastTimerRef.current = setTimeout(() => {
              setToastOpen(false);
              setLastDeleted(null);
            }, 6000);
          } catch (err) {
            // error from hook
          } finally {
            setDeleteOpen(false);
          }
        }}
      />

      <UndoToast
        open={toastOpen}
        message={lastDeleted ? `Deleted ${lastDeleted.name}` : "Device deleted"}
        onUndo={async () => {
          if (!lastDeleted) return;
          try {
            await restoreDevice(lastDeleted.id);
            setToastOpen(false);
            setLastDeleted(null);
            if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
          } catch (err) {
            console.error(err);
          }
        }}
        onClose={() => {
          setToastOpen(false);
          setLastDeleted(null);
          if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
        }}
      />
    </div>
  );
}
