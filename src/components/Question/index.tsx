import { ReactNode } from 'react';
import './style.scss'
type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  }
  children?: ReactNode;
  isAnswerd?: boolean;
  isHighLighted?: boolean;
}


export const Question = ({ content, author, children, isAnswerd = false, isHighLighted = false }: QuestionProps) => {
  const { name, avatar } = author
  return (
    <div
     className={`question ${isAnswerd ? 'answerd' : ''} ${isHighLighted && !isAnswerd ? 'highLighted' : ''} `}>
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={avatar} alt={name} />
          <span>{name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  )
} 