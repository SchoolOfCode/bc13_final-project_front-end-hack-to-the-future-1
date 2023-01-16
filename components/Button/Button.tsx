export interface ButtonProps {
  buttonText: string;
  onClick: () => void;
  className?: string;
}

export default function Button({
  buttonText,
  onClick,
  className = "",
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`border-2 bg-indigo-400 box-border h-10 w-32 border-slate-900 text-slate-800 rounded-md shadow-md shadow-slate-900 font-Open-semibold z-10 ${className}`}
    >
      {buttonText}
    </button>
  );
}
