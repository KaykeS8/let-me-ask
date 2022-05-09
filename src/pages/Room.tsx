import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LogoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import '../styles/room.scss'

type firebaseQuestion = Record<string, {
  author: {
    name: string,
    avatar: string,
  }
  content: string,
  isAnswerd: boolean,
  isHighLighted: boolean
}>

type Questions = {
  id: string,
  author: {
    name: string,
    avatar: string,
  }
  content: string,
  isAnswerd: boolean,
  isHighLighted: boolean

}
type RoomParams = {
  id: string;
}

export const Room = () => {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const [newQuestions, setNewQuestions] = useState('');
  const [questions, setQuestions] = useState<Questions[]>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestion: firebaseQuestion = databaseRoom.questions ?? {}
      const parsedQuestions = Object.entries(firebaseQuestion).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighLighted: value.isHighLighted,
          isAnswerd: value.isAnswerd
        }
      })
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })
  }, [roomId])

  const handleSendQuestion = async (event: FormEvent) => {
    event.preventDefault();
    if (newQuestions.trim() === '') {
      return
    }

    if (!user) {
      throw new Error('You must be logged in')
    }

    const question = {
      content: newQuestions,
      author: {
        name: user.avatar,
        avatar: user.avatar
      },
      isHighLighted: false,
      isAnswerd: false
    };

    await database.ref(`rooms/${roomId}/questions`).push(question)
    setNewQuestions("")
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
            <img src={LogoImg} alt="Logo da letmeask" />
          <RoomCode code={roomId as string} />
        </div >
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder='O que você que perguntar?'
            onChange={({ target }) => setNewQuestions(target.value)}
            value={newQuestions}
          />

          <div className="form-footer">
            {user ? (
              <div className='user-info'>
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta <button>Faça seu login</button>.</span>

            )}
            <Button type='submit' disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  )
}
