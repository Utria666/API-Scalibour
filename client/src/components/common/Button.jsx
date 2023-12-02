import { useNavigate } from 'react-router-dom';

function Button({ texto, className, to, disabled }) {
  let navigate = useNavigate();

  const handleClick = () => {
    if (to && !disabled) {
      navigate(to);
    }
  };

  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 h-10 px-4 py-2 ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {texto}
    </button>
  );
}

export default Button;
