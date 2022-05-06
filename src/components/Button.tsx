import React from "react"

interface IButtonProps {
    nome?:string
}

export const Button = ({nome}: IButtonProps) => {
    const [count, setCount] = React.useState(0)
    return (
     <button onClick={() => setCount(count + 1)}>{nome  || 'OK'}</button>
    )
}
