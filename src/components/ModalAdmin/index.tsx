import { useState } from 'react';
import Modal from 'react-modal';
import './style.scss'

const styleModal = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  content: {
    backgroundColor: 'white',
    width: '50%',
    height: '40%',
    margin: 'auto',
    border: 'none'
  }
}

interface ModalAdminProps {
  image: string;
  title: string;
  content: string;
  buttonText: string;
  state: boolean
}

export const ModalAdmin = ({ image, title, content, buttonText, state }: ModalAdminProps) => {

  return (
    <Modal
      isOpen={false}
      style={styleModal}
    >
      <div className='container_modal'>
        <img src={image} alt="" />
        <h2>{title}</h2>
        <p>{content}</p>
        <div className='buttons_modal'>
          <button className='button_cancel'>Cancelar</button>
          <button className='button_excluir'>{buttonText}</button>
        </div>
      </div>
    </Modal>
  )
}