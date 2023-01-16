import React from "react";
import { useState, useEffect } from "react";
import "./Login.css"

const Login = ({
    players,
    setPlayers,
    setIsModalOpened,
    isLoginModalOpened,
}) => {
    const usernameRegex = new RegExp("^[a-z0-9\\_\\.]+$");
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const submitForm = (e) => {
        e.preventDefault();
        
        if (
            players.playerOne.length > 0 &&
            players.playerTwo.length > 0 &&
            usernameRegex.test( players.playerOne) &&
            usernameRegex.test( players.playerTwo)
        ) {
            localStorage.setItem("playerOne", players.playerOne);
            localStorage.setItem("playerTwo", players.playerTwo)
            setIsModalOpened(false);
        } else {
            console.log("Bad username/s")
        }
    };

    const handleInput = (e) => {
        const {id, value}= e.target;
        e.preventDefault();

        setPlayers({
            ...players,
            [id]: value,
        });
    };

    const isButtonDisabled =()=> {
        if(players.playerOne.length > 0 && players.playerTwo.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    };

    useEffect(()=> {
        isButtonDisabled();
    }, [players])

    return (
        <div 
        className="login-modal"
        style={{
            display: isLoginModalOpened ? "flex" : "none",
            position: isLoginModalOpened ?? "absolute",
        }}
        >
            <div className="form-wrapper">
                <form id="login-form" className="login-form" onSubmit={submitForm}>
                    <div className="input-field-wrapper">
                        <label className="input-label">Player 1 Name</label>
                        <input
                          id="playerOne"
                          required
                          className="input-field"
                          placeholder="Enter name"
                          onChange={handleInput}
                          value={players.playerOne ?? players.playerOne} 
                        />
                    </div>
                    <div className="input-field-wrapper">
                        <label className="input-label">Player 2 Name</label>
                        <input
                          id="playerTwo"
                          required
                          className="input-field"
                          placeholder="Enter name"
                          onChange={handleInput}
                          value={players.playerTwo ?? players.playerTwo} 
                        />
                    </div>
                    <button
                          className="form-button"
                          type="submit"
                          disabled={buttonDisabled}
                    >
                      START
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login;