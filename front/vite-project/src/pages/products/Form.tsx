import { Box, Button, Checkbox, FormControl, FormControlLabel, TextField, Icon, InputLabel } from "@mui/material"
import React, { useCallback } from "react"
import { useNavigate } from "react-router-dom"

interface ProductFormProps{
    product: Partial<Product>,
    alter: (p: Partial<Product>) => void,
    send: (p: Partial<Product>) => void,
}
export default function ProductForm({product, alter, send}: ProductFormProps){
    const navigate = useNavigate()
    
    const alterProduct = useCallback(function<K extends keyof Product>(k: K, v: Partial<Product>[K]) {
        alter({[k]: v} as Partial<Product>) 
    }, [])

    return <form onSubmit={e => {e.preventDefault(); send(product)}} style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "1rem",
        padding: "2rem"
    }}>
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center", gridColumn: "span 2"}}>
            <h1>{product._id ? "Modifier un" : "Nouveau"} produit</h1>
            <Button onClick={() => navigate("/products")}>Retour aux produits</Button>
        </Box>
        {
            ([
                ["name", ["text", "Nom"]],
                ["type", ["text", "Type"]],
                ["price", ["number", "Prix"]],
                ["warranty_years", ["number", "Garantie (années)"]],
                ["available", ["checkbox", "Disponible"]],
            ] as [keyof typeof product, [string, string]][]).map(([key, [type, label]]) => <FormControl key={key}>
                {type != "checkbox" 
                    ? <TextField
                        // prevent typing other letters than numeric
                        onKeyDown={type == "number" ? (e) => { if(!/^[\d.]+$/.test(e.key) && !["Backspace"].includes(e.key)) {e.preventDefault()}} : undefined}
                        label={label} 
                        id={key} 
                        type={type} 
                        value={product[key] || ""} 
                        onChange={({target:{value}}) => alterProduct(key, value)}
                    ></TextField>
                    : <FormControlLabel control={<Checkbox id={key} checked={!!product[key]} onChange={() => alterProduct(key, !product[key])}/>} label={label}/>
                }
            </FormControl>)
        }
        <Box sx={{display: "flex", alignItems: "center"}}>
            <InputLabel style={{marginRight: "1rem"}}>Note:</InputLabel> 
            {[1,2,3,4,5].map(v => <a key={`rate_${v}`} onClick={() => alterProduct("rating", v)} style={{cursor: "pointer"}}>
                    <Icon>{(product.rating || 0) >= v ? "star" : "star_border"}</Icon>
            </a>)}
        </Box>
        <Button type="submit" variant='contained' sx={{gridColumn: "span 2"}}>Envoyer</Button>
    </form>
}