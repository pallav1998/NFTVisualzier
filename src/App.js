import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { useNFTBalances } from "react-moralis";
import NavBar from "./Components/NavBar";
import NFTCard from "./Components/NFTCard";

function App() {
  const [Address, setAddress] = useState("");
  const [NFTdata, setNFTData] = useState();
  const { authenticate, isAuthenticated, logout } = useMoralis();

  const { getNFTBalances, data, error, isLoading, isFetching } =
    useNFTBalances();

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
    <div>
      <NavBar
        address={Address}
        ConnectWallet={login}
        DisconnectWallet={logOut}
      />
      <h1>Moralis Hello World!</h1>
      <div>
        <button onClick={() => getNFTBalances({ params: { chain: "0x1" } })}>
          Refetch NFTBalances
        </button>
        {error ? <>{JSON.stringify(error)}</> : <NFTCard NFTdata={NFTdata} />}
        {/* <pre>{NFTdata}</pre> */}
      </div>
    </div>
  );
}

export default App;
