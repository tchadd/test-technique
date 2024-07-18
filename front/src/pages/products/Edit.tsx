import React, { useCallback, useEffect, useState } from "react"
import { fetcher } from "../../hook/useCustomSWR"
import { useNavigate, useParams } from "react-router-dom"
import ProductForm from "./Form"
import { vt } from "../../utils/vt"

export default function ProductEdit(){
    const {id} = useParams<{id: string}>()
    const navigate = useNavigate()
    const [product, setProduct] = useState({} as Partial<Product>)
    useEffect(() => {fetcher<Product>(`/api/products/${id}`).then(setProduct)}, [])

    const alterProduct = useCallback((p: typeof product) => {setProduct(o => ({...o, ...p}))},[])

    const send = useCallback(async (p:Partial<Product>) => {
        const prod = await fetcher(`/api/products/${id}`, {method: "PUT", body: JSON.stringify(p)})
        vt(() => navigate("/products"))
    }, [])

    return <ProductForm product={product} alter={alterProduct} send={send} />
}