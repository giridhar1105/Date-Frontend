import Header from "./Header/page";
import Home from "./Home/page";

export default function Homee() {
  return (
    <div>
      <Header />
      <Home />
    </div>
  );
}


// "use client"
// import { useState } from 'react';
// import crypto from 'crypto';

// // Block and Blockchain Classes

// class Block {
//   constructor(index, timestamp, data, previousHash = '') {
//     this.index = index;
//     this.timestamp = timestamp;
//     this.data = data;
//     this.previousHash = previousHash;
//     this.hash = this.calculateHash();
//   }

//   calculateHash() {
//     const blockString = `${this.index}${this.timestamp}${JSON.stringify(this.data)}${this.previousHash}`;
//     return crypto.createHash('sha256').update(blockString).digest('hex');
//   }
// }

// class Blockchain {
//   constructor() {
//     this.chain = [];
//     this.createGenesisBlock();
//   }

//   createGenesisBlock() {
//     const genesisBlock = new Block(0, Date.now(), 'Genesis Block', '0');
//     this.chain.push(genesisBlock);
//   }

//   addBlock(data) {
//     const previousBlock = this.chain[this.chain.length - 1];
//     const newBlock = new Block(this.chain.length, Date.now(), data, previousBlock.hash);
//     this.chain.push(newBlock);
//   }

//   getChain() {
//     return this.chain;
//   }
// }

// // API Route Handler
// let blockchain = new Blockchain();

// export default function Home() {
//   const [blockData, setBlockData] = useState('');
//   const [blockchainData, setBlockchainData] = useState([]);

//   const fetchBlockchain = async () => {
//     setBlockchainData(blockchain.getChain());
//   };

//   const addBlock = () => {
//     if (!blockData) {
//       alert('Please provide data for the new block!');
//       return;
//     }

//     blockchain.addBlock(blockData);
//     alert('New block added!');
//     fetchBlockchain(); // Refresh blockchain state
//     setBlockData(''); // Clear input field
//   };

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
//       <h1>Blockchain in Next.js</h1>
//       <input
//         type="text"
//         value={blockData}
//         onChange={(e) => setBlockData(e.target.value)}
//         placeholder="Enter block data"
//         style={{ padding: '10px', fontSize: '16px', marginBottom: '10px', width: '300px' }}
//       />
//       <button
//         onClick={addBlock}
//         style={{
//           padding: '10px 20px',
//           fontSize: '16px',
//           backgroundColor: '#4CAF50',
//           color: 'white',
//           border: 'none',
//           cursor: 'pointer',
//         }}
//       >
//         Add Block
//       </button>

//       <h2 style={{ marginTop: '20px' }}>Blockchain</h2>
//       <button
//         onClick={fetchBlockchain}
//         style={{
//           padding: '10px 20px',
//           fontSize: '16px',
//           backgroundColor: '#008CBA',
//           color: 'white',
//           border: 'none',
//           cursor: 'pointer',
//           marginBottom: '20px',
//         }}
//       >
//         Fetch Blockchain
//       </button>
//       <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
//         {JSON.stringify(blockchainData, null, 2)}
//       </pre>
//     </div>
//   );
// }
