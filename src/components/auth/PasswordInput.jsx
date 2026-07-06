import { useState } from "react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";

export default function PasswordInput({
  value,
  onChange,
  placeholder = "Password",
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">

      <FiLock
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        size={20}
      />

      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-700 bg-slate-800/80 pl-12 pr-14 py-4 text-white placeholder:text-slate-500 outline-none transition-all duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
      >
        {show ? <FiEyeOff size={20} /> : <FiEye size={20} />}
      </button>

    </div>
  );
}