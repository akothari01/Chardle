import Confetti from 'react-confetti'

export default function GameOver(props){
    return(
        <div>
        {props.gameState ? <Confetti/> : undefined}
        <section className="game-over-window">
            {props.gameState ? <Confetti/> && <h1>You Won!</h1> : <h1>You Lose..</h1>}
            {props.gameState ? undefined : <h2>The correct answer was {props.answer}</h2>}
            <button onClick={props.startOver}>One More Round</button>
        </section>
        </div>
    )
}