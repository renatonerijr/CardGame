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
        localStorage.setItem('game_sessions', JSON.stringify([{'game_session_id': game_session_id, 'is_odd': false}]))
    } else {
        let is_odd = false
        let game_session_parsed = JSON.parse(game_sessions)
        let find_game = game_session_parsed.find((v) => {return v['game_session_id'] == game_session_id})

        if (!find_game && game_session_parsed?.length + 1 > 2){
            const navigate = useNavigate()
            useEffect(() => {navigate("/double-session")}, [])
            return [null, null]
        }

        if (!find_game){
            is_odd = game_session_parsed.length != 0
            localStorage.setItem('game_sessions', JSON.stringify([...game_session_parsed, {'game_session_id': game_session_id, 'is_odd': is_odd}]))
        }

    }
    let game_session_parsed = JSON.parse(localStorage.getItem('game_sessions'))
    let session = game_session_parsed.find((v) => {return v['game_session_id'] == game_session_id})
    return [session['game_session_id'], session['is_odd']]
}