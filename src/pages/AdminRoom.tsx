import { useNavigate, useParams } from 'react-router-dom';
import LogoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import deleteImg from '../assets/images/delete.svg';
import '../styles/room.scss'
import { database } from '../services/firebase';
import { ModalAdmin } from '../components/ModalAdmin';
import deleteRoom from '../assets/images/DeleteRoom.png';
import { useState } from 'react';


type RoomParams = {
  id: string;
}

export const AdminRoom = () => {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const history = useNavigate()

  const [modal, setModal] = useState(false)

  const { questions, title } = useRoom(roomId)

  const handleDeleteQuestion = async (questionId: string) => {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  const handleEndRoom = async () => {
    setModal(true)
    if (window.confirm('Tem certeza que você deseja encerrar esta sala?')) {
      await database.ref(`rooms/${roomId}`).update({
        endeAt: new Date(),
      })
      history("/")
    } else {
      return
    }
  }

  const contentModalRoom = {
    title: 'Encerrar sala',
    content: 'Tem certeza que você deseja encerrar esta sala?',
    image: deleteRoom,
    buttonText: 'Sim, encerrar'
  }


  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImg} alt="Logo da letmeask" />
          <div>
            <RoomCode code={roomId as string} />
            <Button isOutlined onClick={handleEndRoom}>Encerra sala</Button>
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
              >
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
        <ModalAdmin content={contentModalRoom.content} image={contentModalRoom.image} title={contentModalRoom.title} buttonText={contentModalRoom.buttonText} state={modal}/>
      </main >
    </div >
  )
}
