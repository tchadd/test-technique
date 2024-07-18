import { Box, Button, Checkbox, FormControl, FormControlLabel, TextField, Icon, InputLabel } from "@mui/material"
import React, { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetcher } from "../../hook/useCustomSWR"

export default function AuthLogin(){
    const navigate = useNavigate()
    const [user, setUser] = useState({} as Partial<User>)
    const [hasError, setHasError] = useState(false)
    
    const alter = useCallback(function<K extends keyof User>(k: K, v: Partial<User>[K]) {
        console.log(k, v, user)
        setUser(o => ({...o, [k]: v}))
    }, [])

    const send = useCallback(async function() {
        try{
            setHasError(false)
            const r = await fetcher("/api/auth/login", {method: "POST", body: JSON.stringify(user)})
            if(r?.token){
                localStorage.setItem("token", r.token)
                navigate("/")
            } else throw new Error()
        } catch(e) {
            console.log(e)
            setHasError(true)
        }
    }, [user])



    return <form onSubmit={e => {e.preventDefault(); send()}} style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem",
        padding: "2rem"
    }}>
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", gridColumn: "span 2"}}>
            <h1>Se connecter</h1>
            <Button onClick={() => navigate("/")} style={{viewTransitionName: "back"}}>Retour à l'accueil</Button>
        </Box>
        {hasError && <Box color="red" sx={{display: "flex", justifyContent: "center", alignItems: "center", gridColumn: "span 2"}}>
            Mot de passe ou email invalides
        </Box>}
        {
            ([
                ["email", ["email", "Email"]],
                ["password", ["password", "Mot de passe"]],
            ] as [keyof typeof user, [string, string]][]).map(([key, [type, label]]) => <FormControl key={key}>
                <TextField
                    label={label} 
                    id={key} 
                    type={type} 
                    value={user[key] || ""} 
                    onChange={({target:{value}}) => alter(key, value)}
                />
            </FormControl>)
        }
        <Button type="submit" variant='contained' sx={{gridColumn: "span 2"}}>Se connecter</Button>
    </form>
}