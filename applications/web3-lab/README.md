# @sitebender/web3-lab

## Overview

This is an experimental sandbox for exploring Web3 technologies and their integration with Sitebender's progressive enhancement philosophy. This application is isolated from the main project but can import and use existing Sitebender libraries.

## Purpose

- Experiment with IPFS for distributed content storage
- Test Solid Pods for user-owned data
- Explore blockchain-anchored RDF concepts
- Develop patterns for distributed SPARQL queries
- Prototype decentralized identity solutions

## Structure

```
web3-lab/
├── src/
│   ├── main.ts           # Main entry point
│   ├── ipfs/             # IPFS experiments
│   ├── solid/            # Solid Pod experiments
│   ├── blockchain/       # Blockchain/smart contract experiments
│   ├── rdf/              # Distributed RDF experiments
│   └── examples/         # Working examples
├── public/               # Static assets
├── tests/                # Test files
└── deno.jsonc           # Workspace configuration
```

## Getting Started

### Prerequisites

Choose what you want to experiment with:

- **IPFS**: Install IPFS Desktop from https://ipfs.tech/install/ipfs-desktop/ OR use public gateways
- **Solid**: Create a free pod at https://solidcommunity.net OR run local server
- **RDF**: Use existing Fuseki OR included Oxigraph
- **Blockchain**: Use testnet OR install Ganache for local development

### Installation

```bash
# From the web3-lab directory
cd applications/web3-lab

# Install dependencies (handled by Deno automatically)
deno cache src/main.ts
```

### Running Experiments

```bash
# Run the development server
deno task dev

# Run specific experiments
deno task ipfs       # IPFS experiments
deno task solid      # Solid Pod experiments
deno task rdf        # RDF distribution experiments
deno task blockchain # Blockchain experiments

# Run all tests
deno task test
```

## Examples

### 1. Store RDF on IPFS

```typescript
import { storeRDFOnIPFS } from "./src/ipfs/store.ts"

const rdf = `
@prefix schema: <http://schema.org/> .
:Article schema:headline "My Article" .
`

const cid = await storeRDFOnIPFS(rdf)
console.log(`Stored at: ipfs://${cid}`)
```

### 2. Query Solid Pod

```typescript
import { querySolidPod } from "./src/solid/query.ts"

const results = await querySolidPod({
	webId: "https://alice.solidcommunity.net/profile/card#me",
	sparql: "SELECT ?name WHERE { ?s schema:name ?name }",
})
```

### 3. Distributed SPARQL

```typescript
import { federatedQuery } from "./src/rdf/federated.ts"

const results = await federatedQuery({
	endpoints: [
		"http://localhost:3030/sparql",
		"ipfs://QmDataset",
		"solid://alice.pod/sparql",
	],
	query: "SELECT * WHERE { ?s ?p ?o } LIMIT 10",
})
```

## Development Principles

1. **Progressive Enhancement**: Everything should work offline-first
2. **Fallback Patterns**: Always provide non-Web3 alternatives
3. **No Production Code**: This is purely experimental
4. **Document Findings**: Record what works and what doesn't
5. **Test Everything**: Especially offline/online transitions

## Current Experiments

- [ ] IPFS content-addressed RDF storage
- [ ] Solid Pod integration with Sitebender components
- [ ] Federated SPARQL across distributed sources
- [ ] Blockchain-anchored dataset integrity
- [ ] Decentralized identity (DIDs)
- [ ] Peer-to-peer data synchronization

## Integration Path

Successful patterns from this lab will be:

1. Refined and tested here
2. Extracted to `libraries/distributed`
3. Integrated into Sitebender components
4. Eventually used in production docs app

## Safety Notes

⚠️ **Never commit**:

- Private keys or seed phrases
- Personal Solid Pod credentials
- Real cryptocurrency wallets
- API keys or tokens

⚠️ **Always use**:

- Testnets for blockchain experiments
- Dummy data for IPFS uploads
- Test accounts for Solid Pods

## Resources

- [IPFS Docs](https://docs.ipfs.tech/)
- [Solid Project](https://solidproject.org/)
- [RDF Primer](https://www.w3.org/TR/rdf-primer/)
- [Ethereum Testnets](https://ethereum.org/en/developers/docs/networks/)

## Questions to Explore

1. How can IPFS content addressing enhance RDF immutability?
2. Can Solid Pods work with server-side rendering?
3. What's the minimal JavaScript needed for wallet connections?
4. How do we handle SPARQL queries across slow/unreliable networks?
5. Can we achieve true offline-first with distributed data?

## Contributing

This is an experimental space. Feel free to:

- Try wild ideas
- Break things
- Document failures as much as successes
- Share findings in `/docs` folder

## Status

🚧 **Experimental** - Not for production use

---

For production-ready distributed utilities, see `libraries/distributed/`
