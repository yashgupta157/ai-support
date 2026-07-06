import { useLocation, useNavigate } from "react-router-dom";

export default function SidebarMenu({ menuItems }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="px-4 py-4 border-t border-slate-800">

      <h3 className="text-xs uppercase text-slate-500 mb-4">
        Menu
      </h3>

      <div className="space-y-2">

        {menuItems.map((item) => (

          <button
            key={item.title}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              location.pathname === item.path
                ? "bg-purple-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            {item.icon}

            {item.title}

          </button>

        ))}

      </div>

    </div>
  );
}