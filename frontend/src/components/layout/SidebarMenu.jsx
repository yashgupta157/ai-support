import { useLocation, useNavigate } from "react-router-dom";

export default function SidebarMenu({ menuItems }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <h3 className="mb-4 text-xs uppercase text-slate-500">
        Menu
      </h3>

      <div className="space-y-2 pb-4">
        {menuItems.map((item) => (
          <button
            key={item.title}
            onClick={() => navigate(item.path)}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition ${
              location.pathname === item.path
                ? "bg-purple-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            {item.icon}
            <span>{item.title}</span>
          </button>
        ))}
      </div>
    </>
  );
}