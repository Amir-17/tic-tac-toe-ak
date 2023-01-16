import React from "react";
import { useState } from "react";
import "./Board.css"

const Board = ({
    isLoginModalOpened,
    isEndgameModalOpened,
    players,
    valueList,
    result,
    isXPlayerOne,
    gameHistory,
    scoreState,
    setResult,
    setIsXPlayerOne,
    setGameHistory,
    setScoreState,
    setValueList,
}) => {
    const [warningMessage, setWarningMessage] = useState("")

    const checkField = (key) => {
        let response;
        const possibleWins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [0, 4, 8],
            [2, 5, 8],
            [6, 4, 2],
        ];
        setWarningMessage("");

        //chekc if field is already played
        if (valueList[key] === "x" || valueList[key] === "o") {
            setWarningMessage("Choose an unoccupied cell!")
            return ;
        }

        //check if game is over
        if (result.length) return;

        //update valueList
        valueList[key] = isXPlayerOne ? "x" : "o";
        setValueList(valueList);
        
        //change player turn
        setIsXPlayerOne(!isXPlayerOne)

        for (let i = 0; i< possibleWins.length; i++) {
            if (response !== true) 
            response = checkWinner (
                possibleWins[i][0],
                possibleWins[i][1],
                possibleWins[i][2]
            )
        }

        if (response === undefined) {
            isTied();
        }
    }

    const checkWinner = (fieldOne, fieldTwo, fieldThree) => {
        let playerX = "x".repeat(3);
        let playerO = "o".repeat(3);
        let winner = "";
        let date = new Date();
        let history = gameHistory;
        let score = scoreState;

        let fieldValues = valueList[fieldOne] + valueList[fieldTwo] + valueList[fieldThree]; 

        if (fieldValues === playerX) {
            winner = players.playerOne ? `${players.playerOne} wins!` : "";
            history = [
                ...history,
                {
                    datetime: date.toLocaleString(),
                    p1: players.playerOne,
                    p2: players.playerTwo,
                    winner: players.playerOne,
                },
            ]
            score = {...scoreState, playerOneScore: scoreState.playerOneScore + 1};

            setResult(winner);
            setScoreState({
                ...scoreState,
                playerOneScore: scoreState.playerOneScore + 1
            });
            setGameHistory([
                ...gameHistory,
                {
                    datetime: date.toLocaleString(),
                    p1: players.playerOne,
                    p2: players.playerTwo,
                    winner: players.playerOne,
                }
            ])
            updateLocalStorage(score, history);
            return true;
        } else if (fieldValues === playerO) {
            winner = players.playerTwo ? `${players.playerTwo} wins!` : "";
            history = [
                ...history,
                {
                    datetime: date.toLocaleString(),
                    p1: players.playerTwo,
                    p2: players.playerTwo,
                    winner: players.playerTwo,
                },
            ]
            score = {...score, playerTwoScore: scoreState.playerTwoScore + 1};

            setResult(winner);
            setScoreState({
                ...scoreState,
                playerTwoScore: scoreState.playerTwoScore + 1
            });
            setGameHistory([
                ...gameHistory,
                {
                    datetime: date.toLocaleString(),
                    p1: players.playerTwo,
                    p2: players.playerTwo,
                    winner: players.playerTwo,
                }
            ])
            updateLocalStorage(score, history);
            return true;
        }
    };

    const isTied = () => {
        let allFields = valueList.every((element) => element);
        let history = gameHistory;
        let score = scoreState;

        if (allFields && result.length === 0) {
            history = [
                ...history,
                {
                    datetime: new Date().toLocaleString(),
                    p1: players.playerTwo,
                    p2: players.playerTwo,
                    winner: "tie",
                },
            ]
            score = {...score, tieScore: scoreState.tieScore + 1};

            setResult("DRAW!");
            setGameHistory(history);
            setScoreState(score);
            updateLocalStorage(score, history);
        }
    }

    const updateLocalStorage = (score, history) => {
        localStorage.setItem("score", JSON.stringify(score));
        localStorage.setItem("gameHistory", JSON.stringify(history))
    };

    return (
        <div 
           className="board"
           style={{
            display: isLoginModalOpened || isEndgameModalOpened ? "none" : "flex"
           }}>
            <h3>
                { isXPlayerOne ? `It's ${players.playerOne}'s turn` : `It's ${players.playerTwo}'s turn`}
            </h3>
            {warningMessage ? (
                <h4 className="board-warning">{warningMessage}</h4>
            ): null}
            <div className="board-fields">
                {valueList.map((value, index)=> {
                    return (
                        <div 
                          style={result ? { pointerEvents: "none"} : {}}
                          className="board-field"
                          key={`field_${index}`}
                          onClick={()=> checkField(index)}> 
                          {value}
                          </div>
                    )
                })}
            </div>
           </div>
    )
}

export default Board;



