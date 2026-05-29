const SearchBar = ({ value, onChange }) => (
  <input
    className="w-full border border-slate-200 rounded-md px-3 py-2"
    placeholder="Search products"
    value={value}
    onChange={(event) => onChange(event.target.value)}
  />
);

export default SearchBar;
