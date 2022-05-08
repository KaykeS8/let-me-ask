import { useParams } from 'react-router-dom';
import LogoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import '../styles/room.scss'

type RoomParams = {
  id: string;
}

export const Room = () => {
  const params = useParams<RoomParams>()

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={LogoImg} alt="Logo da letmeask" />
          <RoomCode code={params.id as string}/>
        </div >
      </header>

      <main>
        <div className="room-title">
          <h1>Sala react</h1>
          <span>4 perguntas</span>
        </div>

        <form>
          <textarea placeholder='O que você que perguntar?' />

          <div className="form-footer">
            <span>Para enviar uma pergunta <button>Faça seu login</button>.</span>
            <Button type='submit'>Enviar pergunta</Button>
          </div>
        </form>
      </main>
    </div>
  )
}
