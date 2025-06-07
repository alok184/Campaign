// src/components/common/Input.jsx
const Input = ({ label, name, value, onChange, error, multiline = false, rows = 1, ...props }) => {
  return (
    <div className="input-group">
      {label && <label htmlFor={name}>{label}</label>}
      {multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          className={`input-field ${error ? 'error' : ''}`}
          {...props}
        />
      ) : (
        <input
          id={name}
          name={name}
          type="text"
          value={value}
          onChange={onChange}
          className={`input-field ${error ? 'error' : ''}`}
          {...props}
        />
      )}
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Input;