export default function Keyboard(props){
    const keys = "1234567890qwertyuiopasdfghjklzxcvbnm"
    return(
        <section className="keyboard">
            <button style={{backgroundColor:"#f54248"}}>DLT</button>
            {
                keys.split('').map(letter => (
                    <button onClick={() => (props.typing)(letter)} key={letter}>{letter}</button>
                ))
            }
            <button style={{backgroundColor: "#1df067"}}>ENT</button>
        </section>
    )
}