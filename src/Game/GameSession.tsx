import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const RunGameSession = () => {
    let game_session_id = sessionStorage.getItem("game_session_id")

    if (!game_session_id) {
       game_session_id = crypto.randomUUID()
       sessionStorage.setItem("game_session_id", game_session_id) 
    }

    let game_sessions = localStorage.getItem('game_sessions')

    if (!game_sessions) {
        localStorage.setItem('game_sessions', JSON.stringify([{'game_session_id': game_session_id}]))
    } else {
        let game_session_parsed = JSON.parse(game_sessions)
        let find_game = game_session_parsed.find((v) => {return v['game_session_id'] == game_session_id})

        if (!find_game && game_session_parsed?.length + 1 > 2){
            const navigate = useNavigate()
            useEffect(() => {navigate("/double-session")}, [])
            return
        }

        if (!find_game){
            localStorage.setItem('game_sessions', JSON.stringify([...game_session_parsed, {'game_session_id': game_session_id}]))
        }

    }
    return game_session_id
}