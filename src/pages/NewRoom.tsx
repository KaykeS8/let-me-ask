import { Link } from 'react-router-dom';

import logoImg from '../assets/images/logo.svg';
import illustrationImg from '../assets/images/illustration.svg';
import { Button } from '../components/Button';

import '../styles/auth.scss'
import { useContext } from 'react';
import { AuthContext } from '../App';

export const NewRoomm = () => {

  const {user} = useContext(AuthContext)

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
          <h1>{user?.name}</h1>
          <h2>Crie um nova sala</h2>
          <form>
            <input
              type="text"
              placeholder='Nome da sala'
            />
            <Button type='submit'>Criar sala</Button>
          </form>
          <p>Quer entrar em uma sala já existente? <Link to="/">Clique aqui</Link></p>
        </div>
      </main>
    </div>
  )

}