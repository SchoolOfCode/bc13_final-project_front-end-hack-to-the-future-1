export interface ButtonProps {
  buttonText: string;
  onClick: () => void;
}

export default function Button({ buttonText, onClick }: ButtonProps) {
  return (
    <button onClick={onClick} className="border-2">
      {buttonText}
    </button>
  );
}
