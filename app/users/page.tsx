"use client";
import DeleteModal from "@/components/common/DeleteModal";
import { Delete, Edit, Visibility } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

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

const tableHeaders = [
  { key: "name", label: "Nome" },
  { key: "email", label: "E-mail" },
  { key: "phone", label: "Telefone" },
  { key: "actions", label: "Ações" },
];

const UsersIndex = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const handleOpen = (id: number) => {
    setUserId(id);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const fetchUsers = async () => {
    const response = await fetch(`/api/users`);
    const result: ApiResponse<User[]> = await response.json();
    setUsers(result.data);
  };

  const handleDelete = async () => {
    if (userId === null) return;

    setLoading(true);

    await fetch(`/api/users/${userId}`, {
      method: "DELETE",
    });

    setUsers(users.filter((user) => user.id !== userId));
    handleClose();

    setLoading(false);
  };

  const filteredUsers = users.map(({ id, name, email, phone }) => ({
    id,
    name,
    email,
    phone,
  }));

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box sx={{ px: 10, py: 4 }}>
      <Stack direction="row" justifyContent={"space-between"}>
        <Typography variant="h3" gutterBottom>
          Listagem de usuários
        </Typography>

        <Box>
          <Button
            variant="contained"
            href="http://localhost:3000/users/create"
            sx={{ mt: 1, mr: 3 }}
          >
            Novo usuário
          </Button>
        </Box>
      </Stack>

      <Divider variant="middle" sx={{ mb: 3 }} />

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableCell
                    key={header.key}
                    align="left"
                    style={{ minWidth: 100, fontWeight: "bold" }}
                  >
                    {header.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{user.name}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left">{user.phone}</TableCell>
                  <TableCell align="left">
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      href={`http://localhost:3000/users/view/${user.id}`}
                      disabled={loading}
                    >
                      <Visibility />
                    </IconButton>

                    <IconButton
                      aria-label="edit"
                      color="primary"
                      href={`http://localhost:3000/users/edit/${user.id}`}
                      disabled={loading}
                    >
                      <Edit />
                    </IconButton>

                    <IconButton
                      aria-label="edit"
                      color="error"
                      onClick={() => handleOpen(user.id)}
                      disabled={loading}
                    >
                      <Delete />
                    </IconButton>

                    <DeleteModal
                      open={open}
                      handleClose={handleClose}
                      handleDelete={handleDelete}
                      loading={loading}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default UsersIndex;
