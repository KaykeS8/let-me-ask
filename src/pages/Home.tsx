import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleImg from '../assets/images/google-icon.svg';
import '../styles/auth.scss'


export const Home = () => {
  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="ilustração simbolizando perguntas e respostas"/>
        <strong>Crie salas de de Q&amp;A  ao-vivo</strong>
        <p>Tire as dúvidas da sua audiencia em tempo-real</p>
      </aside>
      <main>
        <div>
          <img src={logoImg} alt="letmeask" />
          <button>
            <img src={googleImg} alt="Logo do google" />
            Crie sua sala com o google
          </button>
          <div>
            Ou entre em uma sala
          </div>
          <form>
            <input
              type="text"
              placeholder='Digite o código da sala'
            />
            <button type='submit'>Entrar na sala</button>
          </form>
        </div>
      </main>
    </div>
  )
}