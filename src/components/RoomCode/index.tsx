import copyImg from '../../assets/images/copy.svg'
import '../RoomCode/style.scss'

type RoomCodeProps  = {
  code: string
}

export const RoomCode = ({ code }: RoomCodeProps) => {
  const copyRoomCodeToClipboard = () => {
    navigator.clipboard.writeText(code)
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Icone de copiar" />
      </div>
      <span>{code}</span>
    </button>
  )
}