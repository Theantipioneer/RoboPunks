import React from "react";
import { Flex, Image, Link } from "@chakra-ui/react";
import Facebook from "./assets/facebook_32x32.png";
import Twitter from "./assets/twitter_32x32.png";
import Email from "./assets/email_32x32.png";

function Navbar({ accounts, setAccounts }) {
    const isConnected = Boolean(accounts[0]);
    async function connectAccount() {
        if (window.ethereum) {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        }
    }
    return (
        <Flex justify="space-between" align="center" padding="30px">
            <Flex justify="space-around" width="40%" padding="0 75px">
                <Link href="https://www.facebook.com">
                    <Image src={Facebook} boxSize="42px" margin="0 15px" />
                </Link>
                <Link href="https://www.twitter.com">
                    <Image src={Twitter} boxSize="42px" margin="0 15px" />
                </Link>
                <Link href="https://www.gmail.com">
                    <Image src={Email} boxSize="42px" margin="0 15px" />
                </Link>
            </Flex>

            <div>About</div>
            <div>Mint</div>
            <div>Team</div>

            {isConnected ? (
                <p>Connected</p>
            ) : (
                <button className="btn-connect" onClick={connectAccount}>
                    Connect Wallet
                </button>
            )}
        </Flex>
    );
}

export default Navbar;
