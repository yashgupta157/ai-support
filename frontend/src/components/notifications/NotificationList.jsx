import NotificationCard from "./NotificationCard";

export default function NotificationList({
  notifications,
  onRead,
}) {

  if (!notifications.length) {

    return (

      <div className="text-slate-500">

        No notifications

      </div>

    );

  }

  return (

    <div className="space-y-3">

      {notifications.map((n) => (

        <NotificationCard
          key={n._id}
          notification={n}
          onRead={onRead}
        />

      ))}

    </div>

  );

}