export interface ButtonProps {
    buttonText: string;
    onClick: ()=> void,
  }

export default function Button({buttonText, onClick}:ButtonProps){
    return(
        <button onClick={onClick}>{buttonText}</button>
    )
}
