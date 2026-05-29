const QuantitySelector = ({ value, onChange }) => (
  <div className="flex items-center gap-2">
    <button
      className="px-2 py-1 border rounded"
      onClick={() => onChange(Math.max(1, value - 1))}
    >
      -
    </button>
    <span className="w-8 text-center">{value}</span>
    <button
      className="px-2 py-1 border rounded"
      onClick={() => onChange(value + 1)}
    >
      +
    </button>
  </div>
);

export default QuantitySelector;
