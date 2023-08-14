import "../../sass/components/formContainer.scss";
interface propFormContainer {
  children: string[] | string | JSX.Element | JSX.Element[];
}

export default function FormContainer({ children }: propFormContainer) {
  return <div className="formContainer">{children}</div>;
}
