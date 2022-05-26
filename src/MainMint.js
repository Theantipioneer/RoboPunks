import React, { useState } from "react";
import { ethers, BigNumber } from "ethers";
import roboPunks from "./roboPunks.json";

const roboPunksAddress = "0xa3044597f5912d593a8d7d5ebfb85aaa1a8f3fa3";

function MainMint({ accounts, setAccounts }) {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                roboPunksAddress,
                roboPunks.abi,
                signer
            );
            try {
                const res = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther(
                        (0.02 * mintAmount).toString()
                    ),
                });
                console.log("response", res);
            } catch (error) {
                console.log("error", error);
            }
        }
    }

    function handleDecrement() {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    }
    function handleIncrement() {
        if (mintAmount > 3) return;
        setMintAmount(mintAmount + 1);
    }
    return (
        <div>
            <h1>RoboPunks</h1>
            <p>Pre-sale opens 28 August</p>
            {isConnected ? (
                <div>
                    <div>
                        <button onClick={handleDecrement}>-</button>
                        <input type="number" value={mintAmount} />
                        <button onClick={handleIncrement}>+</button>
                    </div>
                    <button onClick={handleMint}>Mint Now</button>
                </div>
            ) : (
                <p>You must be connected to mint.</p>
            )}
        </div>
    );
}

export default MainMint;
