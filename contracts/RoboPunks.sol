//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RoboPunks is ERC721, Ownable {
    uint public mintPrice;
    uint public totalSupply;
    uint public maxSupply;
    uint public maxPerWallet;
    bool public isPublicMintEnabled;
    string internal baseTokenUri;
    address payable public withdrawWallet;
    mapping(address => uint ) walletMints;
    
    constructor() payable ERC721("RoboPunks", "RP") {
        mintPrice = 0.02 ether;
        totalSupply = 0;
        maxSupply = 1000; 
        maxPerWallet = 3;
    }

    function setIsPublicMintEnabled(bool _isPublicMintEnabled) external onlyOwner {
        isPublicMintEnabled = _isPublicMintEnabled;
    }

    function setBaseTokenUri(string calldata _basetokenUri) external onlyOwner {
        baseTokenUri = _basetokenUri;
    }

    function tokenURI(uint _tokenId) public view override returns (string memory){
        require(_exists(_tokenId), "Token does not exist");
        return string(abi.encodePacked(baseTokenUri,Strings.toString(_tokenId), ".json"));

    }

    function withdraw() external onlyOwner {
        (bool success,) = withdrawWallet.call{value: address(this).balance}('');
        require(success, "Withdraw failed");

    }

    function mint(uint _quantity) public payable {
        require (isPublicMintEnabled, "Minting not enabled");
        require(msg.value == _quantity * mintPrice, "Wrong value");
        require(totalSupply + _quantity <= maxSupply, "Sold out");
        require(walletMints[msg.sender] + _quantity <= maxPerWallet, "Exceeds max per wallet");

        // Using the check interactions pattern
        for(uint i = 0; i < _quantity; i++){
            uint newTokenId = totalSupply + 1;
            totalSupply++;
            _safeMint(msg.sender, newTokenId);

        }

    }

}