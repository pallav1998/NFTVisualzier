import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useNFTBalances } from "react-moralis";
import NavBar from "./Components/NavBar";
import NFTCard from "./Components/NFTCard";

import CircularProgress from "@mui/material/CircularProgress";
import AuthenticationSVG from "./login.svg";

function App() {
  const [Address, setAddress] = useState("");
  const [NFTdata, setNFTData] = useState();
  const { authenticate, isAuthenticated, logout } = useMoralis();

  const { data, error, isLoading } = useNFTBalances();

  const login = async () => {
    if (!isAuthenticated) {
      await authenticate({ signingMessage: "NFTVisualizer using Moralis" })
        .then(function (user) {
          setAddress(user?.get("ethAddress"));
          // console.log("logged in user:", user);
          // console.log(user?.get("ethAddress"));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const logOut = async () => {
    await logout();
    setAddress("");
    setNFTData("");
    console.log("logged out");
  };

  useEffect(() => {
    setNFTData(data);
  }, [Address, data]);

  return (
    <div className="text-center">
      <NavBar
        address={Address}
        ConnectWallet={login}
        DisconnectWallet={logOut}
      />

      {!Address ? (
        <>
          <h1>Welcome to the NFT MarketPlace</h1>
          <h3>
            To show your minted NFT's you Need to Authenticate First to access
            the App
          </h3>
          <img
            style={{ maxHeight: "65vh", marginTop: "2rem" }}
            src={AuthenticationSVG}
            alt="SVG"
          />
        </>
      ) : (
        <>
          {isLoading ? (
            <div style={{ marginTop: "18%" }}>
              <CircularProgress color="success" />
              <strong>Loading....</strong>
            </div>
          ) : (
            <div>
              {error ? (
                <>{JSON.stringify(error)}</>
              ) : (
                <NFTCard NFTdata={NFTdata} isLoading={isLoading} />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
