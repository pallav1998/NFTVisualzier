import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import styles from "./styles.module.css";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/material/Grid";
import { FaEthereum } from "react-icons/fa";

export default function NFTCard({ NFTdata }) {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    if (NFTdata) {
      console.log("NFTdata:", NFTdata.result[0].metadata.description);
      setData(NFTdata.result);
    }
  }, [NFTdata]);

  return (
    <Box
      sx={{ flexGrow: 1, maxWidth: "85%", margin: "auto", marginTop: "50px" }}
    >
      <h3>Your Minted NFT's</h3>
      <Grid container spacing={4}>
        {data &&
          data.map((e, i) => {
            console.log(e);
            return (
              <Grid item lg={4} md={6}>
                <Card key={e.token_hash} sx={{ maxWidth: 360 }}>
                  <CardActionArea>
                    <CardMedia
                      className={styles.image}
                      component="img"
                      image={e?.metadata?.image}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {e?.metadata?.name}
                      </Typography>
                      <div className="d-flex flex-row justify-content-between">
                        <Typography variant="body1" color="text.primary">
                          {e.symbol}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <span>
                            <FaEthereum />
                          </span>
                          <span>{e?.amount}</span>
                        </Typography>
                      </div>

                      <Typography
                        className="mt-2"
                        variant="body2"
                        color="text.secondary"
                      >
                        {e?.metadata?.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Box>
  );
}
