# @sitebender/agent

Distributed, offline-first data library for the web that belongs to THE PEOPLE.

## Philosophy

The web was built with PUBLIC money (through the military) and should belong TO THE PEOPLE. Not to sociopaths making billions while quality declines, surveilling us, stealing our data, and invading our privacy.

WE HAVE EMAIL. IT IS FREE AND DEMOCRATIC.

We had many other capabilities that are being lost to centralization. Agent brings them back.

## Core Beliefs

- **All web applications should work offline** (to the extent practicable)
- **Against centralization and privatization**
- **Web standards compliant code**
- **FOSS and DISTRIBUTED code**
- **Data belongs to users, not corporations**

## Features (Current & Planned)

### Offline-First Architecture

- **CRDTs** (Conflict-free Replicated Data Types) for distributed state
- **Eventual consistency** without central authority
- **Works offline, syncs when online**
- **No functionality breaks when network unavailable**

### Distributed Data Sources

- **Storacha** - Distributed storage network
- **Solid** - Personal data pods under user control
- **IPFS** - InterPlanetary File System integration
- **DIDs** - Decentralized Identifiers
- **Verifiable Credentials** - Self-sovereign identity

### Semantic Web (Fan Since RDF Was Invented)

- **RDF/RDFa** - Resource Description Framework
- **Turtle** - Terse RDF Triple Language
- **SHACL** - Shapes Constraint Language
- **OWL2** - Web Ontology Language
- **Ontologies** - Formal knowledge representation
- **Triple stores** - Graph-based data storage

### Cryptography (Maybe)

Most cryptographic needs are handled by the protocols themselves:

- **Solid** provides WebID, ACLs, authentication, pod encryption
- **IPFS** has keypair identity system
- **DIDs** have cryptographic proofs
- **Verifiable Credentials** have built-in signatures

Agent might directly need crypto only for:

- **Signing CRDT operations** - Know who made which changes
- **Encrypting local IndexedDB** - Protect offline data

But even these might be handled by the protocols. Agent focuses on integration, not reinventing security.

## The Vision

Agent is the least implemented library currently, but represents the future of the web:

- **User sovereignty** - You own your data
- **Offline-first** - Network is enhancement, not requirement
- **P2P collaboration** - No central servers needed
- **Semantic understanding** - Machines can reason about data
- **Privacy by default** - Your data stays yours

## State of the Art

Agent experiments with cutting-edge distributed technologies:

- Latest CRDT algorithms for conflict resolution
- Modern P2P protocols for direct communication
- Advanced cryptography for privacy and security
- Semantic web standards for interoperability

## Integration with @sitebender

While other @sitebender libraries have zero dependencies, Agent is special:

- **ONLY Agent can reach outside the project** (along with Linguist)
- Connects to distributed services and protocols
- Acts as the bridge to the decentralized web

## Use Cases

- **Collaborative editing** without Google Docs
- **Social networking** without Facebook
- **File sharing** without Dropbox
- **Messaging** without WhatsApp
- **All peer-to-peer, all user-controlled**

## Testing Ground

The `applications/the-agency` is the-workshop for Agent experiments:

- Testing CRDT implementations
- Exploring P2P protocols
- Building semantic web demos
- **Expect explosions** - This is bleeding edge

## Status

This is the least implemented library - we're building the foundation for a radically different web. Not Web 3.0 as crypto nonsense, but Web 3.0 as:

- User sovereignty
- Data ownership
- Resilient systems
- Offline-first
- Globally synchronized

## The Bottom Line

The web should work for PEOPLE, not corporations. Agent is how we take it back.

## Development

```bash
# Run tests
deno task test

# Coverage
deno task test:cov

# Type check
deno task type-check

# Lint
deno task lint
```

## License

MIT - Because this belongs to everyone.
