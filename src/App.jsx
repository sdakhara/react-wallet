import React, { useState } from "react";
import { ethers } from "ethers";
import $ from "jquery";

const contractAddress = "0x109805Ed47F990FEf83d602F955793f34A8C9c45";
const contractAbi = [
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "limit",
                "type": "uint256"
            }
        ],
        "name": "addPeople",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [],
        "name": "depositeMoney",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "address payable",
                "name": "_addr",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferTo",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "ammount",
                "type": "uint256"
            }
        ],
        "name": "withdrawMoney",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "withdrawMoneyOwnerOnly",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "balance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
];


function App() {
    const [contract, setContract] = useState();
    const [balance, setBalance] = useState();
    function showBalance() {
        contract.balance().then(value=>{setBalance(ethers.utils.formatEther(value.toNumber()))});
        console.log(balance);
    }
    function connectAccount() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const contracts = new ethers.Contract(contractAddress, contractAbi, signer);
        console.log(contracts);
        setContract(contracts);
    }
    function depositeMoney(){
        const tx = contract.depositeMoney({value: $('#ammount').val()});
        tx.then(console.log).catch(console.log);
    }
    function withdrawMoney(){
        const tx = contract.withdrawMoneyOwnerOnly($('#ammount').val());
        tx.then(console.log).catch(console.log);
    }
    return (<><center>
        <h1>Welcome to Your Ethereum Wallet</h1>
        <h3>{balance} Eth</h3>
        <input type="text" id="ammount"></input>
        <button onClick={depositeMoney}>Add Ether</button>
        <button onClick={withdrawMoney}>Withdraw Ether</button>
        <button onClick={showBalance}>Check Balance</button>
        <button onClick={connectAccount}>Connect Metamask</button>
    </center></>);
}

export default App;