const Button = ({ label, icon, onClick, disabled = false, className = "" }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-ui-label-semi-bold font-heebo  rounded-[8px] items-center flex gap-[10px] justify-center ${className}`}
    >
      {label}
      {icon && (
        <img src={icon} alt="icon" className="inline-block W-[14px] h-[14px]" />
      )}
    </button>
  );
};

export default Button;
