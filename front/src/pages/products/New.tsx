import React, { FormEventHandler, useCallback, useState } from "react"
import { fetcher } from "../../hook/useCustomSWR"
import { FormControl, Input, InputLabel, Checkbox, FormControlLabel, TextField, Button, Box } from "@mui/material"
import { useNavigate } from "react-router-dom"
import ProductForm from "./Form"

export default function ProductNew(){
    const navigate = useNavigate()
    const [product, setProduct] = useState({} as Partial<Product>)

    const alterProduct = useCallback((p: typeof product) => {setProduct(o => ({...o, ...p}))},[])

    const send = useCallback(async (p:Partial<Product>) => {
        const prod = await fetcher("/api/products", {method: "POST", body: JSON.stringify(p)})
        navigate("/products")
    }, [])

    return <ProductForm product={product} alter={alterProduct} send={send} />
}