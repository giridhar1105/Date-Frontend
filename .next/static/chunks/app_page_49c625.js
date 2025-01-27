(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_page_49c625.js", {

"[project]/app/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
// import Header from "./Header/page";
// import Home from "./Home/page";
// export default function Homee() {
//   return (
//     <div>
//       <Header />
//       <Home />
//     </div>
//   );
// }
__turbopack_esm__({
    "default": (()=>Home)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$crypto$2d$browserify$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/crypto-browserify/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
// Block and Blockchain Classes
class Block {
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    calculateHash() {
        const blockString = `${this.index}${this.timestamp}${JSON.stringify(this.data)}${this.previousHash}`;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$crypto$2d$browserify$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].createHash('sha256').update(blockString).digest('hex');
    }
}
class Blockchain {
    constructor(){
        this.chain = [];
        this.createGenesisBlock();
    }
    createGenesisBlock() {
        const genesisBlock = new Block(0, Date.now(), 'Genesis Block', '0');
        this.chain.push(genesisBlock);
    }
    addBlock(data) {
        const previousBlock = this.chain[this.chain.length - 1];
        const newBlock = new Block(this.chain.length, Date.now(), data, previousBlock.hash);
        this.chain.push(newBlock);
    }
    getChain() {
        return this.chain;
    }
}
// API Route Handler
let blockchain = new Blockchain();
function Home() {
    _s();
    const [blockData, setBlockData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [blockchainData, setBlockchainData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const fetchBlockchain = async ()=>{
        setBlockchainData(blockchain.getChain());
    };
    const addBlock = ()=>{
        if (!blockData) {
            alert('Please provide data for the new block!');
            return;
        }
        blockchain.addBlock(blockData);
        alert('New block added!');
        fetchBlockchain(); // Refresh blockchain state
        setBlockData(''); // Clear input field
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '20px',
            fontFamily: 'Arial, sans-serif'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                children: "Blockchain in Next.js"
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 82,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                value: blockData,
                onChange: (e)=>setBlockData(e.target.value),
                placeholder: "Enter block data",
                style: {
                    padding: '10px',
                    fontSize: '16px',
                    marginBottom: '10px',
                    width: '300px'
                }
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 83,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: addBlock,
                style: {
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer'
                },
                children: "Add Block"
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                style: {
                    marginTop: '20px'
                },
                children: "Blockchain"
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 104,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: fetchBlockchain,
                style: {
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#008CBA',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                    marginBottom: '20px'
                },
                children: "Fetch Blockchain"
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                style: {
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word'
                },
                children: JSON.stringify(blockchainData, null, 2)
            }, void 0, false, {
                fileName: "[project]/app/page.js",
                lineNumber: 119,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.js",
        lineNumber: 81,
        columnNumber: 5
    }, this);
}
_s(Home, "sF4LpQ11bECUT6iFYQRhhORH8Mk=");
_c = Home;
var _c;
__turbopack_refresh__.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/page.js [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=app_page_49c625.js.map