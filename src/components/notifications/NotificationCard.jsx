export default function NotificationCard({
  notification,
  onRead,
}) {

  return (

    <div
      onClick={() => onRead(notification._id)}
      className={`rounded-xl p-4 cursor-pointer ${
        notification.read
          ? "bg-slate-900"
          : "bg-indigo-900"
      }`}
    >

      <h4 className="font-semibold">

        {notification.title}

      </h4>

      <p className="text-sm text-slate-300">

        {notification.message}

      </p>

      <div className="mt-2 text-xs text-slate-500">

        {new Date(
          notification.createdAt
        ).toLocaleString()}

      </div>

    </div>

  );

}