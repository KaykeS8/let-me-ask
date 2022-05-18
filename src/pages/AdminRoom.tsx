import { useNavigate, useParams } from 'react-router-dom';
import LogoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import deleteImg from '../assets/images/delete.svg';
import '../styles/room.scss'
import '../styles/modal.scss';
import { database } from '../services/firebase';
import deleteRoom from '../assets/images/DeleteRoom.png';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import { useState } from 'react';
import Modal from 'react-modal';
import { Widget } from '../components/Widget';

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


const contentModalRoom = {
  title: 'Encerrar sala',
  content: 'Tem certeza que você deseja encerrar esta sala?',
  image: deleteRoom,
  buttonText: 'Sim, encerrar'
}

type RoomParams = {
  id: string;
}

export const AdminRoom = () => {
  // const { user } = useAuth();
  const history = useNavigate();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [modal, setModal] = useState(false);

  const { questions, title } = useRoom(roomId)

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  const handleEndRoom = async () => {
    if (modal) {
      await database.ref(`rooms/${roomId}`).update({
        endeAt: new Date(),
      })
      history("/")
    } else {
      return
    }
  }

  const handleCheckQuestionAnswered = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswerd: true,
    })
  }

  const handleHighLightQuestion = async (questionId: string) => {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighLighted: true,
    })
  }

  const openModal = () => setModal(true)

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImg} alt="Logo da letmeask" />
          <div>
            <RoomCode code={roomId as string} />
            <Button isOutlined onClick={() => {
              openModal()
            }}>Encerra sala</Button>
          </div>
        </div >
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswerd={question.isAnswerd}
                isHighLighted={question.isHighLighted}
              >
                {!question.isAnswerd && (
                  <>
                    <button
                      type='button'
                      onClick={() => handleCheckQuestionAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>
                    <button
                      type='button'
                      onClick={() => handleHighLightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque a pergunta" />
                    </button>
                  </>
                )}
                <button
                  type='button'
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Imagem para deletar pergunta" />
                </button>
              </Question>
            )
          })}
        </div>
        {modal && <Modal
          isOpen={modal}
          style={styleModal}
        >
          <div className='container_modal'>
            <img src={contentModalRoom.image} alt="" />
            <h2>{contentModalRoom.title}</h2>
            <p>{contentModalRoom.content}</p>
            <div className='buttons_modal'>
              <button
                className='button_cancel'
                onClick={() => setModal(!modal)}
              >
                Cancelar
              </button>
              <button
                className='button_excluir'
                onClick={() => handleEndRoom()}
              >
                {contentModalRoom.buttonText}
              </button>
            </div>
          </div>
        </Modal>}
        <Widget />
      </main >
    </div >
  )
}
