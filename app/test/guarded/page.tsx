"use client";
import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const GuardedContent = () => {
  const [hasToken, setHasToken] = useState<boolean>(false);

  const handlePermission = async () => {
    const response = await fetch(`/api`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    const result = await response.status;

    if (result === 200) {
      setHasToken(true);
    } else {
      setHasToken(false);
    }
  };

  useEffect(() => {
    handlePermission();
  }, []);

  return (
    <>
      {hasToken ? (
        <Box sx={{ px: 10, py: 4 }}>
          <Typography variant="h3" gutterBottom>
            Conteúdo protegido
          </Typography>
        </Box>
      ) : (
        <Box sx={{ px: 10, py: 4 }}>
          <Typography variant="h3" gutterBottom>
            Você não tem permissão para acessar este conteúdo
          </Typography>
        </Box>
      )}

      <Divider variant="middle" sx={{ mb: 3 }} />
    </>
  );
};

export default GuardedContent;
