import { ButtonHTMLAttributes } from 'react'
import '../Button/style.scss';

type buttoPropsTypes = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean
}

export const Button = ({ isOutlined = false, ...props }: buttoPropsTypes) => {
    return (
        <button className={`button ${isOutlined ? "outline" : ""} bg-brand-300`} {...props} />
    )
}
