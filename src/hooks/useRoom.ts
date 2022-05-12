import { useState, useEffect } from 'react'
import { database } from '../services/firebase';
import { useAuth } from './useAuth';

type firebaseQuestion = Record<string, {
  author: {
    name: string,
    avatar: string,
  }
  content: string,
  isAnswerd: boolean,
  isHighLighted: boolean
  likes: Record<string, {
    authorId: string;
  }>
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
  likeCount: number
  likeId: string | undefined
}


export const useRoom = (roomId: string | undefined) => {
  const { user } = useAuth()
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
          isAnswerd: value.isAnswerd,
          likeCount: Object.values(value.likes || {}).length,
          likeId: Object.entries(value.likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
        }
      })
      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })
    return () => {
      roomRef.off("value")
    }
  }, [roomId, user?.id])

  return { questions, title }
}