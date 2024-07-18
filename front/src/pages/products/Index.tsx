import React, { useCallback, useEffect, useState } from 'react';
import { TableContainer, Paper, TableCell, TableHead, TableRow, Table, TableBody, Box, Button, Dialog, DialogContent } from '@mui/material';
import useCustomSWR, { fetcher } from '../../hook/useCustomSWR';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { vt } from '../../utils/vt';

export default function ProductIndex() {
  const navigate = useNavigate()
  const {data, isLoading, mutate} = useCustomSWR<Product[]>('/api/products')
  const [deletingId, setDeletingId] = useState(undefined as number | undefined)
  

  const tryDelete = useCallback(async (id: number) => { setDeletingId(id) }, [])

  const confirmDelete = useCallback(async () => {
    const id = deletingId
    if(!id) return
    await fetcher(`/api/products/${id}`, {method: "DELETE"})
    setDeletingId(undefined)
  }, [deletingId])

  useEffect(() => {
    const ws = io(import.meta.env.VITE_API_URL, {auth: { token: localStorage.getItem("token") }})
    ws.on("products:needs_update", () => vt(() => mutate()))
    return () =>{ ws.disconnect() }
  }, [])

  return <>
    <Box sx={{display: "flex", flexDirection: "column", gap: "1rem", padding: "2rem"}}>
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <h1 style={{viewTransitionName: "title"}}>Liste des produits</h1>
            <Button onClick={() => vt(() => navigate("/"))} style={{viewTransitionName: "back"}}>Retour a l'accueil</Button>
            <Button variant='contained' onClick={() => vt(() => navigate("/products/new"))}>Ajouter un produit</Button>
        </Box>
        <TableContainer component={Paper} variant="outlined">
            <Table aria-label="demo table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nom</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Prix (€)</TableCell>
                        <TableCell>Dispo</TableCell>
                        <TableCell>Note /5</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {isLoading ? 
                        <TableRow>
                            <TableCell colSpan={6} style={{textAlign: "center"}}>Chargement...</TableCell>
                        </TableRow>
                        : data?.map((item) => 
                            <TableRow key={item._id} sx={{viewTransitionName: `row_${item._id}`}}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.type}</TableCell>
                                <TableCell>{item.price}</TableCell>
                                <TableCell>{item.available ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{item.rating}</TableCell>
                                <TableCell>
                                    <Button color="error" onClick={() => vt(() => tryDelete(item._id))} sx={{viewTransitionName: !deletingId ? "dialog_" + item._id : undefined}}>DELETE</Button>
                                    <Button color="info" onClick={() =>vt(() => navigate(`/products/${item._id}/edit`))}>EDIT</Button>
                                </TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
    <Dialog open={!!deletingId} PaperProps={{style:{viewTransitionName: !!deletingId ? "dialog_" + deletingId : undefined}}}>
        <DialogContent>
            Êtes-vous sur de vouloir supprimer ce produit?
            <Box sx={{display: "flex", justifyContent: "end", gap: "1rem", alignItems: "center", marginTop: "1rem"}}>
                <Button onClick={() => vt(() => setDeletingId(undefined))}>Non</Button>
                <Button variant='contained' onClick={confirmDelete}>Oui</Button>
            </Box>
        </DialogContent>
    </Dialog>
  </>
}