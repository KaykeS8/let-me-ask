import { createContext } from "react";

interface ModalContextType {
  image: string;
  title: string;
  content: string;
  buttonText: string;
  state: boolean
}
// Colocar as funções de deletar a pergunta e a sala dentro desse contexto, para poder usar dentro do modal as informações do estado, para usar dentro do modal na propriedade isOpen.

export const modalContext = createContext({} as ModalContextType);

export const ModalContext = () => {

}