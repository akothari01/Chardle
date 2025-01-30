export default function Keyboard(props){
    const keys = "1234567890qwertyuiopasdfghjklzxcvbnm"
    return(
        <section className="keyboard">
            <button onClick={props.del} style={{backgroundColor:"#f54248"}}>❌ </button>
            {
                keys.split('').map(letter => (
                    <button onClick={() => (props.typing)(letter)} key={letter}>{letter}</button>
                ))
            }
            <button onClick={props.ent} style={{backgroundColor: "#1df067", width:"60%"}}>ENT</button>
        </section>
    )
}