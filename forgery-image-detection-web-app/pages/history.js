import { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase"; // Assuming your firebase config is in "@/firebase"
import { getSession } from "next-auth/react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import FullImageModal from "@/components/modal/fullImageModal";

const History = ({ historyData }) => {
  const [fullImageOpen, setFullImageOpen] = useState(null);

  const handleFullImageOpen = (index) => {
    setFullImageOpen(index);
  };

  const handleModalClose = () => {
    setFullImageOpen(null);
  };

  return (
    <div>
      <h2>Upload History</h2>
      {historyData.length > 0 ? (
        <>
          <Table sx={{ width: "100%", margin: "auto" }}>
            <TableHead>
              <TableRow>
                <TableCell>Image Name</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Uploaded At</TableCell>
                <TableCell>Forgery Result</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historyData.map((item, index) => {
                const createdAt = new Date(item.createdAt);
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.imageName}</TableCell>
                    <TableCell>
                      <Grid
                        container
                        spacing={0}
                      >
                        <Grid
                          item
                          xs={3}
                        >
                          <img
                            src={item.imageURL}
                            alt={item.imageName}
                            style={{ maxWidth: 300, cursor: "pointer" }}
                            onClick={() => handleFullImageOpen(index)}
                          />
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>
                      {createdAt.toLocaleDateString() +
                        " " +
                        createdAt.toLocaleTimeString()}
                    </TableCell>
                    <TableCell>
                      {item.result === 0 ? "Authentic" : "Forged."}
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        <DeleteIcon color="deleteIcon" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {fullImageOpen !== null && (
            <FullImageModal
              open={true}
              imageUrl={historyData[fullImageOpen].imageURL}
              onClose={handleModalClose}
            />
          )}
        </>
      ) : (
        <p>No history found.</p>
      )}
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const userId = session.user.id;

  try {
    const userImagesRef = collection(db, "userImages");
    const q = query(userImagesRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate().toISOString(), // Convert to ISO string
    }));

    return {
      props: {
        historyData: data,
      },
    };
  } catch (error) {
    console.error("Error fetching history data:", error);
    return {
      props: {
        historyData: [],
      },
    };
  }
}

export default History;
