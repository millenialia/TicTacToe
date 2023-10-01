import { useEffect, useState } from "react";

import Square from "../components/Square";

type Player = 'X' | 'O' | 'BOTH' | null

const calcWinner = (squares: Player[]) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++){
            const [a, b, c] = lines[i]
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a]
        }
        }
        return null
    }

function Board() {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>('X')
    const [winner, setWinner] = useState<Player>(null)


    const setSquareValue = (index:number) => {
        const newData = squares.map((val, i) => {
        if (i === index) {
            return currentPlayer
        }
        return val
    })
    
    setSquares(newData)
    setCurrentPlayer(currentPlayer === 'X'?'O':'X')
    }
    
    const reset = () => {
        setSquares(Array(9).fill(null))
        setWinner(null)
        setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? 'X' : 'O')
    }
    
        useEffect(() => {
            const w = calcWinner(squares)
            if (w) {
                setWinner(w)
            }
            if (!w && !squares.filter((square) => !square).length) {
                setWinner('BOTH')
            }
        }, [setWinner, squares])
    
    return <div>
        {!winner && <p>hey {currentPlayer} it`s your turn</p>}
        {winner && winner !== 'BOTH' && <p>Congratulations {winner}</p>}
        {winner && winner === 'BOTH' && <p>Congratulations you`re both winners</p>}
        <div className="grid">
            {squares
                .map((_, i) => {
                    return (
                        <Square
                        winner={winner}
                        key={i}
                        onClick={() => setSquareValue(i)}
                        value={squares[i]} />)})}
        </div>
        <button className="reset" onClick={reset}>RESET</button>
    </div>
}

export default Board;