import "./Game.css"
import React from "react"
import { useState, useEffect } from "react"
import Header from "../header/Header"
import Login from "../login/Login"
import Board from "../board/Board"
import Endgame from "../endgame/Endgame"

const Game = () => {
    const [valueList, setValueList] = useState(Array(9).fill(null));
    const [result, setResult] = useState("")
    const [isXPlayerOne, setIsXPlayerOne] = useState(true);

    const [players, setPlayers] = useState ({
        playerOne: localStorage.getItem("playerOne") ? localStorage.getItem("playerOne"): "",
        playerTwo: localStorage.getItem("playerTwo") ? localStorage.getItem("playerTwo") : "",
    });

    const [scoreState, setScoreState] = useState (
        localStorage.getItem("score") ? JSON.parse(localStorage.getItem("score")) : {
            playerOneScore: 0,
            playerTwoScore: 0,
            tieScore: 0,
        }
    );

    const [gameHistory, setGameHistory] = useState (
        localStorage.getItem("gameHistory") ? JSON.parse(localStorage.getItem("gameHistory")) : [
            {
                datetime:"",
                p1: "",
                p2: "",
                winner: "",
            },
        ]
    );

    const [isLoginModalOpened, setIsLoginModalOpened] = useState(false);
    const [isEndgameModalOpened, setIsEndgameModalOpened] = useState(false);
    
    useEffect(()=> {
        if (
            !players.playerOne ||
            !players.playerTwo ||
            players.playerOne.length < 1 ||
            players.playerTwo.length < 1
        ) {
            setIsLoginModalOpened(true)
        } else {
            setIsLoginModalOpened(false)
        }
    }, [isLoginModalOpened]);

    useEffect(()=> {
        if (result && result.length > 0) {
            setIsEndgameModalOpened(true)
        }
    }, [result])

    const newGame = () => {
        setResult("")
        setValueList(Array(9).fill(null));
        setIsEndgameModalOpened(false)
    }

    const restartGame = () => {
        localStorage.clear();
        setResult("")
        setValueList(Array(9).fill(null));
        setIsXPlayerOne(true)
        setScoreState({
            playerOneScore: 0,
            playerTwoScore: 0,
            tieScore: 0,
        });
        setPlayers({
            playerOne: "",
            playerTwo: ""
        });
        setGameHistory([
            {
                datetime:"",
                p1: "",
                p2: "",
                winner: "",
            },
        ]);
        setIsLoginModalOpened(true);
        setIsEndgameModalOpened(false);
    };

    return (
        <div className="game">
            <Header 
            players={players} 
            score={scoreState}
            />
            <Login 
            isLoginModalOpened={isLoginModalOpened}
            players={players}
            setPlayers={setPlayers}
            setIsModalOpened={setIsLoginModalOpened}
            />
            <Board
            isLoginModalOpened={isLoginModalOpened}
            isEndgameModalOpened={isEndgameModalOpened}
            players={players}
            valueList={valueList}
            result={result}
            isXPlayerOne={isXPlayerOne}
            gameHistory={gameHistory}
            scoreState={scoreState}
            setResult={setResult}
            setIsXPlayerOne={setIsXPlayerOne}
            setGameHistory={setGameHistory}
            setScoreState={setScoreState}
            setValueList={setValueList}
            />
            <Endgame
            isEndgameModalOpened={isEndgameModalOpened}
            setIsModalOpened={setIsEndgameModalOpened}
            result={result}
            restart={restartGame}
            newGame={newGame}
            history={gameHistory}
          />
        </div>
    )
}

export default Game;