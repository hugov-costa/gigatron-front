"use client";
import {
  Box,
  Divider,
  Paper,
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
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const response = await fetch(`/api/users`);
    const result: ApiResponse<User[]> = await response.json();
    setUsers(result.data);
  };

  const filteredUsers = users.map(({ name, email, phone }) => ({
    name,
    email,
    phone,
  }));

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Box sx={{ px: 6, py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Listagem de usuários
      </Typography>

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
                    style={{ minWidth: 170, fontWeight: "bold" }}
                  >
                    {header.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredUsers.map((user, index) => (
                <TableRow
                  key={users[index].id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{user.name}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left">{user.phone}</TableCell>
                  <TableCell align="left">ação</TableCell>
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
