import "./Header.css"
import React from "react"

const Header = ({score, players}) => {
    return (
      <div className="header">
        <div className="header-title">
            <h2>Tic Tac Toe</h2>
        </div>
        <div className="header-score">
            <div className="player-score">
                <h3>
                  {players.playerOne ? players.playerOne : "Player 1"}:{" "}
                  {score.playerOneScore}
                </h3>
            </div>
            <div className="player-score">
                <h3>
                  {players.playerTwo ? players.playerTwo : "Player 2"}:{" "}
                  {score.playerTwoScore}
                </h3>
            </div>
            <div className="player-score">
                <h3>Ties: {score.tieScore}</h3>
            </div>
        </div>
      </div>
    );
};

export default Header;