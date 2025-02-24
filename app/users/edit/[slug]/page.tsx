"use client";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

interface User {
  id: number;
  city: string;
  email: string;
  name: string;
  phone: string;
  state: string;
  street: string;
  street_number: string;
  zip_code: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse<T> {
  statusCode: number;
  data: T;
}

const UpdateUser = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    zip_code: "",
    state: "",
    city: "",
    street: "",
    street_number: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
    zip_code: false,
    state: false,
    city: false,
    street: false,
    street_number: false,
  });

  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() === "",
      email: formData.email.trim() === "",
      phone: formData.phone.trim() === "",
      zip_code: formData.zip_code.trim() === "",
      state: formData.state.trim() === "",
      city: formData.city.trim() === "",
      street: formData.street.trim() === "",
      street_number: formData.street_number.trim() === "",
    };

    setErrors(newErrors);

    return !Object.values(newErrors).includes(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setLoading(false);

    window.location.href = "http://localhost:3000/users";
  };

  useEffect(() => {
    const currentUrl = window.location.pathname;
    const pathSegments = currentUrl.split("/");
    const userId = pathSegments[pathSegments.length - 1];

    if (userId) {
      setId(userId);
    }
  }, []);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const response = await fetch(`/api/users/${id}`);
        const result: ApiResponse<User> = await response.json();
        setUser(result.data);

        setLoading(false);
      };

      fetchData();
    }
  }, [id]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        zip_code: user.zip_code,
        state: user.state,
        city: user.city,
        street: user.street,
        street_number: user.street_number,
      });
    }
  }, [user]);

  return (
    <Box sx={{ px: 10, py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Editar usuário
      </Typography>

      <Divider variant="middle" sx={{ mb: 3 }} />

      <Stack
        direction="row"
        justifyContent={"space-between"}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <TextField
          id="name"
          name="name"
          label="Nome"
          required
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          variant="outlined"
          sx={{ bgcolor: "#fff", flex: 3 }}
          disabled={loading}
        />

        <TextField
          id="email"
          name="email"
          label="E-mail"
          required
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          variant="outlined"
          sx={{ bgcolor: "#fff", flex: 1.5 }}
          disabled={loading}
        />

        <TextField
          id="phone"
          name="phone"
          label="Telefone"
          required
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          variant="outlined"
          sx={{ bgcolor: "#fff", flex: 1.5 }}
          disabled={loading}
        />
      </Stack>

      <Stack
        direction="row"
        justifyContent={"space-between"}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <TextField
          id="zip_code"
          name="zip_code"
          label="CEP"
          required
          value={formData.zip_code}
          onChange={handleChange}
          error={errors.zip_code}
          variant="outlined"
          sx={{ bgcolor: "#fff", flex: 1 }}
          disabled={loading}
        />

        <TextField
          id="state"
          name="state"
          label="Estado"
          required
          value={formData.state}
          onChange={handleChange}
          error={errors.state}
          variant="outlined"
          sx={{ bgcolor: "#fff", flex: 0.5 }}
          disabled={loading}
        />

        <TextField
          id="city"
          name="city"
          label="Cidade"
          required
          value={formData.city}
          onChange={handleChange}
          error={errors.city}
          variant="outlined"
          sx={{ bgcolor: "#fff", flex: 1 }}
          disabled={loading}
        />

        <TextField
          id="street"
          name="street"
          label="Endereço"
          required
          value={formData.street}
          onChange={handleChange}
          error={errors.street}
          variant="outlined"
          sx={{ bgcolor: "#fff", flex: 3 }}
          disabled={loading}
        />

        <TextField
          id="street_number"
          name="street_number"
          label="Número"
          required
          value={formData.street_number}
          onChange={handleChange}
          error={errors.street_number}
          variant="outlined"
          sx={{ bgcolor: "#fff", flex: 0.5 }}
          disabled={loading}
        />
      </Stack>

      <Divider variant="middle" sx={{ mb: 3 }} />

      <Button
        variant="contained"
        sx={{ mt: 1, mr: 3 }}
        disabled={loading}
        onClick={handleSubmit}
      >
        Salvar alterações
      </Button>
    </Box>
  );
};

export default UpdateUser;
