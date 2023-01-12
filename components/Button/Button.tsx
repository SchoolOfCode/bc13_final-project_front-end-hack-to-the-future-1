export interface ButtonProps {
  buttonText: string;
  onClick: () => void;
  className: string;
}

export default function Button({ buttonText, onClick, className }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="border-2 bg-red-400 box-border h-10 w-32 border-slate-600 text-slate-600 rounded-md shadow-md shadow-slate-300 font-Open-semibold z-10"
    >
      {buttonText}
    </button>
  );
}
