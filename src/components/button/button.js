import "./button.css";

function Button({ label, variant = "primary", size = "md", icon, type = "button", onClick }) {
  return (
    <button
      type={type}
      className={`ui-button ui-button--${variant} ui-button--${size}`}
      onClick={onClick}
    >
      {icon ? <span className="ui-button__icon">{icon}</span> : null}
      <span className="ui-button__label">{label}</span>
    </button>
  );
}

export default Button;
