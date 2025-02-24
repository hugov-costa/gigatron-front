"use client";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const CreateUser = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    setLoading(true);

    const response = await fetch(`/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    const result = await response.json();
    const token = result.data;
    localStorage.setItem("token", token);

    setLoading(false);

    window.location.href = "http://localhost:3000/test/guarded";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <Box sx={{ px: 10, py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Autenticação
      </Typography>

      <Divider variant="middle" sx={{ mb: 3 }} />

      <Stack
        direction={"column"}
        spacing={2}
        sx={{ mb: 3, width: "50%" }}
        justifyContent={"center"}
      >
        <TextField
          id="email"
          name="email"
          label="E-mail"
          variant="outlined"
          onChange={handleChange}
          sx={{ bgcolor: "#fff" }}
          disabled={loading}
        />

        <Button
          variant="contained"
          sx={{ mt: 1, mr: 3, width: "30%" }}
          disabled={loading}
          onClick={handleSubmit}
        >
          Obter Token
        </Button>
      </Stack>
    </Box>
  );
};

export default CreateUser;
