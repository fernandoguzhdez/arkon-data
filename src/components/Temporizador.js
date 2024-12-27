import React, { useEffect, useState } from "react";
import {
    Timer,
    Countdown,
    Buttons,
} from "./styles";

export function Temporizador( {tiempo} ) {
    const [time, setTime] = useState(); // time in seconds 
    const [isActive, setIsActive] = useState(false);
    const [initialTime, setInitialTime] = useState(time);


    const getTime = () => {
        const minutes = Math.floor(time / 60);
        const seconds = time - minutes * 60;
        return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    }

    const toggleTimer = () => {
        setIsActive(!isActive);
    }

    const resetTimer = () => {
        setTime(initialTime);
        setIsActive(false);
    }

    useEffect(() => {
        setTime(tiempo)
        if (time > 0 && isActive) {
            const interval = setInterval(() => {
                setTime(time - 1);
            }, 1000);
            return () => clearInterval(interval);
        }

    }, [time, isActive]);


    return (
            <Timer initialTime={initialTime}>
                <Countdown>
                    <h3>
                        {getTime()}
                    </h3>
                </Countdown>
                <Buttons>
                    <button onClick={toggleTimer} >{isActive ? 'stop' : 'start'}</button>
                    <button onClick={resetTimer}>reset</button>
                </Buttons>
            </Timer>
    );
}

export default Temporizador;