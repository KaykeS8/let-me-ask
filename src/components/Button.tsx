import {ButtonHTMLAttributes} from 'react'
import '../styles/button.scss';

type buttoPropsTypes = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props: buttoPropsTypes) => {
    return (
     <button className="button" {...props}/>
    )
}
