import { Search } from "lucide-react";
import { useSearch } from "../../context/SearchContext";

export default function SearchBar() {
  const { search, setSearch } = useSearch();

  return (
    <div className="px-4 mb-5">
      <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3">

        <Search size={18} className="text-slate-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search conversations..."
          className="bg-transparent outline-none flex-1 text-white placeholder:text-slate-500"
        />

      </div>
    </div>
  );
}