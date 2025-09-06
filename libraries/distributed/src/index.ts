// CRDT implementations
export { default as createLWWRegister } from "./crdt/lww-register/index.ts"
export { default as createORSet } from "./crdt/or-set/index.ts"
export { default as createGSet } from "./crdt/g-set/index.ts"
export { default as createCounter } from "./crdt/counter/index.ts"
export { default as createRGA } from "./crdt/rga/index.ts"

// Storage adapters
export { default as createIndexedDBStorage } from "./storage/indexeddb/index.ts"

// Identity
export { default as createDIDKey } from "./identity/did-key/index.ts"

// IPFS adapters
export { default as createIPFSGateway } from "./adapters/ipfs/gateway/index.ts"

// Sync protocols
export { default as createStateSyncProtocol } from "./sync/state-based/index.ts"
export { default as createOpSyncProtocol } from "./sync/operation-based/index.ts"
export { default as createDeltaSyncProtocol } from "./sync/delta-based/index.ts"

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
