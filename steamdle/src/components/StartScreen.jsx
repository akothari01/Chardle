export default function StartScreen(props){
    return(
    <section className="start-screen">
        <h1>Chardle</h1>
        <h3>Wordle with your favorite characters!</h3>
        <button onClick={props.starting}>lets go</button>
    </section>
    )
}