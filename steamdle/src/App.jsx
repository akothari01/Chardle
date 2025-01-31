import { useState } from 'react'
import {useEffect} from 'react'
import WordGuess from './components/WordGuess'
import Keyboard from './components/Keyboard'
import GameOver from './components/GameOver'
import StartScreen from './components/StartScreen'

export default function App() {
  const [wordToGuess, setWordToGuess] = useState("sonic")
  const [guesses, setGuesses] = useState(Array(wordToGuess.length * 6).fill(''))
  const [index, setIndex] = useState(0)
  const[currentGuess, setCurrentGuess] = useState(1)
  const[guessCorrect, setGuessCorrect] = useState(Array(wordToGuess.length * 6).fill('#c73858'))
  const [gameWon, setGameWon] = useState(false)
  const [openStatus, setOpenStatus] = useState(false)
  const [startGame, setStartGame] = useState(true)
  const [characters, setCharacters] = useState([])
  const [characterTracker, setCharacterTracker] = useState(0)
  const gameLost = index >= wordToGuess.length*6+1
  const gameOver = gameWon || gameLost

  useEffect(()=>{
    const charArr = []
    fetch('https://api.jikan.moe/v4/top/characters')
    .then(res => (res.json()))
    .then(data => {
      data.data.map((data) => {
        charArr.push(data.name.includes(' ') ? data.name.slice(0,data.name.indexOf(' ')).toLowerCase() : data.name.toLowerCase())
      })
    })
    console.log(charArr)
    setCharacters(charArr)
  }, [])

  
  function starting(){
    setStartGame(false)
    setWordToGuess(characters[characterTracker])
    setGuesses(Array(characters[characterTracker].length * 6).fill(''))
    setGuessCorrect(Array(characters[characterTracker].length * 6).fill('#c73858'))
    setCharacterTracker(prevTracker => prevTracker + 1)
  }

  function handleTyping(letter){
    if(!gameOver && index < wordToGuess.length*6){
    if(index < currentGuess * wordToGuess.length){
      setGuesses(prevGuess => {
        const newGuess = [...prevGuess]
        newGuess[index] = letter
        return newGuess
      })
      setIndex(prevIndex => prevIndex + 1)
    }
    } 
  }

  function deleteInput(){
    if(!gameOver){
      const newIndex = (index < currentGuess*wordToGuess.length+1 && index > (currentGuess-1)*wordToGuess.length) ? index - 1 : index
      setIndex(newIndex)
      setGuesses(prevGuess => {
        const newGuess = [...prevGuess]
        newGuess[newIndex] = ''
        return newGuess
      })
    }
  }

  function enterInput(){
    if(!gameOver){
      if(index === currentGuess*wordToGuess.length){
        const guess = guesses
        let gameStatus = true
        setGuessCorrect(prevCor => {
          const newCor = [...prevCor]
          const word = wordToGuess.split('')
          for(let i = index - wordToGuess.length; i <= index-1; i++){
            if(guess[i] === word[i%wordToGuess.length]){
              newCor[i] = '#34eb6b'
            }
            else if(word.includes(guess[i])){
              newCor[i] = '#ebcf34'
              gameStatus = false
            }
            else{
              newCor[i] = '#747877'
              gameStatus = false
            }
          }
          setGameWon(gameStatus)
          return newCor
        })
        setCurrentGuess(prevGuess => prevGuess + 1)
      }
    }
    console.log(index>=wordToGuess.length*6)
  }

  function restartGame(){
    setOpenStatus(false)
    setGuesses(Array(characters[characterTracker].length * 6).fill(''))
    setCurrentGuess(1)
    setGuessCorrect(Array(characters[characterTracker].length * 6).fill('#c73858'))
    setWordToGuess(characters[characterTracker])
    setCharacterTracker(prevTrack => prevTrack + 1)
    setGameWon(false)
    setIndex(0)
  }

  useEffect(() => {
    const handleKeyPress = (event) => {
      if(event.key === "Enter"){
        enterInput()
      }
      else if(event.key === "Backspace"){
        deleteInput()
      }
      else if(event.key.match(/^[0-9a-z]+$/)){
        handleTyping(event.key)
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () =>{
      window.removeEventListener('keydown', handleKeyPress);
    }
  }, [guesses, currentGuess])

  useEffect(() => {if(currentGuess > 6 || gameWon){
    setTimeout(() => {
      setOpenStatus(true)
    }, 100);
  }}, [openStatus, gameWon, currentGuess])

  return (
    startGame ? <StartScreen starting={starting}/> : openStatus ? <GameOver gameState={gameWon} answer={wordToGuess} startOver={restartGame}/> :
    <main className='main-content'>
      <WordGuess gridSize={guesses} coloring={guessCorrect}/>
      <Keyboard typing={handleTyping} del={deleteInput} ent={enterInput}/>
    </main>
  )
}
