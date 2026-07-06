import useNotifications from "../hooks/useNotifications";
import NotificationList from "../components/notifications/NotificationList";

export default function Notifications() {

  const {
    notifications,
    loading,
    markRead,
    markAllRead,
    clearAll,
  } = useNotifications();

  if (loading) {

    return <div className="p-8">Loading...</div>;

  }

  return (

    <div className="min-h-screen bg-[#020617] p-8">

      <div className="mb-8 flex items-center justify-between">

        <h1 className="text-4xl font-bold text-white">

          Notifications

        </h1>

        <div className="flex gap-3">

          <button
            onClick={markAllRead}
            className="rounded bg-indigo-600 px-4 py-2"
          >
            Mark All Read
          </button>

          <button
            onClick={clearAll}
            className="rounded bg-red-600 px-4 py-2"
          >
            Clear All
          </button>

        </div>

      </div>

      <NotificationList
        notifications={notifications}
        onRead={markRead}
      />

    </div>

  );

}