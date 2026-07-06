import { Search } from "lucide-react";

export default function SearchInput() {
  return (
    <div className="relative w-full max-w-xl">

      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        placeholder="Search infrastructure..."
        className="w-full rounded-2xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-24 text-white outline-none transition focus:border-cyan-500"
      />

      <kbd className="absolute right-4 top-1/2 -translate-y-1/2 rounded bg-slate-800 px-2 py-1 text-xs text-slate-400">
        Ctrl + K
      </kbd>

    </div>
  );
}