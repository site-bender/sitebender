// CRDT implementations
export { default as createLWWRegister } from "./crdt/lwwRegister/index.ts"
export { default as createORSet } from "./crdt/orSet/index.ts"
export { default as createGSet } from "./crdt/gSet/index.ts"
export { default as createCounter } from "./crdt/counter/index.ts"
export { default as createRGA } from "./crdt/rga/index.ts"

// Storage adapters
export { default as createIndexedDBStorage } from "./storage/indexedDb/index.ts"

// Identity
export { default as createDIDKey } from "./identity/didKey/index.ts"

// IPFS adapters
export { default as createIPFSGateway } from "./adapters/ipfs/gateway/index.ts"

// Sync protocols
export { default as createStateSyncProtocol } from "./sync/stateBased/index.ts"
export { default as createOpSyncProtocol } from "./sync/operationBased/index.ts"
export { default as createDeltaSyncProtocol } from "./sync/deltaBased/index.ts"

// Export types
export type {
	Counter,
	CRDT,
	DIDDocument,
	DIDKey,
	GSet,
	IPFSGateway,
	KeyPair,
	LWWRegister,
	ORSet,
	ORSetItem,
	RGA,
	RGANode,
	Storage,
	SyncProtocol,
	Transport,
} from "./types/index.ts"
