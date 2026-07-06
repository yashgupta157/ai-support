import { Bell } from "lucide-react";
import useNotifications from "../../hooks/useNotifications";

export default function NotificationBell({ onClick }) {

  const { notifications } = useNotifications();

  const unread = notifications.filter(
    (n) => !n.read
  ).length;

  return (

    <button
      onClick={onClick}
      className="relative"
    >

      <Bell size={24} />

      {unread > 0 && (

        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs">

          {unread}

        </span>

      )}

    </button>

  );

}