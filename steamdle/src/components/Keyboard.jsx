export default function Keyboard(){
    const keys = "1234567890qwertyuiopasdfghjklzxcvbnm"
    return(
        <section>
            {
                keys.split('').map(letter => (
                    <button>{letter}</button>
                ))
            }
        </section>
    )
}