import React from "react";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";

const footerLinks = [
  { label: "Home", path: "/" },
  { label: "Tutorial", path: "/tutorial" },
  { label: "About Us", path: "/about" },
  { label: "Profile", path: "/profile" },
  { label: "History", path: "/history" },
];

function Footer() {
  const router = useRouter();

  // Function to chunk the array into smaller arrays of specified size
  const chunkArray = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
      arr.slice(index * size, index * size + size)
    );

  // Chunk the footerLinks array into smaller arrays of 1, 1, 1, and 2 items each
  const columns = chunkArray(footerLinks, 1);

  return (
    <Box
      component="footer"
      sx={{
        mt: 5,
        py: 3,
        bgcolor: "background.paper",
        color: "text.secondary",
        marginTop: "5%",
        borderTop: "1px solid",
        backgroundColor: "whitesmoke",
        paddingBottom: "0px",
      }}
    >
      <Container
        maxWidth="xl"
        sx={{ background: "whitesmoke" }}
      >
        <Typography
          variant="h6"
          gutterBottom
        >
          Sitemap
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Box display="flex">
          {columns.map((column, index) => (
            <nav
              key={index}
              style={{ flex: 1 }}
            >
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {column.map((link) => (
                  <li
                    key={link.label}
                    style={{ marginBottom: "8px" }}
                  >
                    <a
                      href={link.path}
                      style={{
                        textDecoration: "none",
                        color:
                          router.pathname === link.path
                            ? "primary.main"
                            : "inherit",
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </Box>
        <Box
          textAlign="center"
          sx={{ marginTop: "2%" }}
        >
          <Typography style={{ margin: 0 }}>Copyright &copy; 2024</Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
