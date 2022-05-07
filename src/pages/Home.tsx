import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';


import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleImg from '../assets/images/google-icon.svg';
import { Button } from '../components/Button';
import '../styles/auth.scss'
import { AuthContext } from '../App';


export const Home = () => {

  const history = useNavigate()
  const { signWithGoogle, user } = useContext(AuthContext)

  const handleCreateRoom = async () => {
    if (!user) {
      await signWithGoogle()
    }
    history('/rooms/new')

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
          <button className='create-room' onClick={handleCreateRoom}>
            <img src={googleImg} alt="Logo do google" />
            Crie sua sala com o google
          </button>
          <div className="separator">
            Ou entre em uma sala
          </div>
          <form>
            <input
              type="text"
              placeholder='Digite o código da sala'
            />
            <Button type='submit'>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}