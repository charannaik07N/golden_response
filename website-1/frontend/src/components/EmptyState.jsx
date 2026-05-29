const EmptyState = ({ title, subtitle }) => (
  <div className="text-center py-10 text-slate-500">
    <h3 className="text-lg font-semibold text-slate-700">{title}</h3>
    <p className="text-sm">{subtitle}</p>
  </div>
);

export default EmptyState;
