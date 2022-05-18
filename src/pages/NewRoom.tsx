import { Link } from 'react-router-dom';
import { FormEvent, useState } from 'react'

import logoImg from '../assets/images/logo.svg';
import illustrationImg from '../assets/images/illustration.svg';
import { Button } from '../components/Button';

import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { Widget } from '../components/Widget';

export const NewRoomm = () => {

  const { user } = useAuth();

  const navigate = useNavigate()
  const [newRoom, setNewRoom] = useState('');
  const handleCreateRoom = async (event: FormEvent) => {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return
    }

    const roomRef = database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    })

    navigate(`/rooms/${firebaseRoom.key}`)

  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de de Q&amp;A  ao-vivo</strong>
        <p>Tire as dúvidas da sua audiencia em tempo-real</p>
      </aside>
      <main>
        <div className='main-content'>
          <img src={logoImg} alt="letmeask" />
          <h2>Crie um nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder='Nome da sala'
              onChange={({ target }) => setNewRoom(target.value)}
              value={newRoom}
            />
            <Button type='submit'>Criar sala</Button>
          </form>
          <p>Quer entrar em uma sala já existente? <Link to="/">Clique aqui</Link></p>
        </div>
        <Widget />
      </main>
    </div>
  )
}
