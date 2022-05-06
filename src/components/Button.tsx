import React from "react"

export const Button = () => {
    const [count, setCount] = React.useState(0)
    return (
        <button onClick={() => setCount(count + 1)}>{count}</button>
    )
}