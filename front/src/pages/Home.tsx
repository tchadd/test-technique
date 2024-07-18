import React, { useCallback, useState } from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { vt } from '../utils/vt';

export default function Home() {
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem("token"))

  const disconnect = useCallback(() => {
    localStorage.removeItem("token")
    setToken(localStorage.getItem("token"))
  }, [])

  return <Box sx={{display: "flex", flexDirection: "column", gap: "1rem", justifyContent: "center", alignItems: "center", height: "100%"}}>
    <Button variant='contained' onClick={() => vt(() => navigate("/products"))} style={{viewTransitionName: "title"}}>Liste des produits</Button>
    {token && <Button variant='contained' onClick={() =>vt(() => disconnect())}>Déconnexion</Button>}
  </Box>
}