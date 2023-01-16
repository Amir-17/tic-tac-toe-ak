import "./Endgame.css"
import { useState } from "react"
import React from "react"

const Endgame = ({
    isEndgameModalOpened,
    setIsModalOpened,
    result,
    restart,
    newGame,
    history,
}) => {
    const [ isHistoryShown, setIsHistoryShown]= useState(false);
    const showHistory = () => {
        setIsHistoryShown(true);
    }

    return (
        <div 
        className="endgame-modal"
        style={{
            display: isEndgameModalOpened ? "flex" : "none"
        }}>
            <div className="endgame-modal-wrapper">
                {isHistoryShown ? (
                    <div className="endgame-game-result">
                        {history.map((game,index) => {
                            if (game.datetime === "") {
                                return;
                            } else {
                                return (
                                <p key={index}>
                                    {index}.{game.datetime} | {game.p1} vs {game.p2} | {" "}
                                    {game.winner === "tie" ? "It's a tie" : `${game.winner} won.`}
                                </p>
                                );
                            }
                        })}
                        </div>
                ) : (
                    <div className="endgame-result"> 
                    <h2 style={{color: "#85b0e7", fontStyle: "italic"}}>{result}</h2>
                    </div> 
                )}
                <div className="endgame-buttons">
                    <button
                      className="endgame-button"
                      onClick={()=> {
                        newGame();
                        setIsHistoryShown(false);
                      }}>
                        Wanna try again?
                      </button>
                      <button
                      className="endgame-button"
                      onClick={()=> {
                        restart();
                        setIsHistoryShown(false);
                      }}>
                        Reset                      
                      </button>
                      <button
                      className="endgame-button"
                      disabled={isHistoryShown}
                      onClick={()=> {
                        showHistory()
                      }}>
                       Show History
                      </button>
                </div>
                </div>
                </div>
    )
}

export default Endgame;