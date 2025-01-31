export default function WordGuess(props){

    const gridDimension = {
        gridTemplateRows: "repeat(6, 1fr)",
        gridTemplateColumns: `repeat(${Math.floor(props.gridSize.length/6)}, 1fr)`
    }

    return(
        <section style={gridDimension} className="guess-blocks">
            {
                props.gridSize.map((letter, index) => (
                    <span style={{backgroundColor: props.coloring[index]}} key={index}>{letter}</span>
                ))
            }
        </section>
    )
}