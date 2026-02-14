export default function FormField({
  label,
  type = "text",
  value,
  onChange,
  ...rest
}) {
  return (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="form-control"
        {...rest}
      />
    </div>
  );
}
