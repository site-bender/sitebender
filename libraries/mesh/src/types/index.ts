// Core CRDT interface that all CRDTs must implement
export interface CRDT<T> {
  readonly value: T;
  readonly version: number;
  readonly nodeId: string;
  merge(other: CRDT<T>): CRDT<T>;
  serialize(): string;
}

// LWW-Register specific types
export interface LWWRegister<T> extends CRDT<T> {
  readonly timestamp: number;
  set(value: T): LWWRegister<T>;
}

// OR-Set specific types
export interface ORSetItem<T> {
  readonly value: T;
  readonly id: string;
  readonly tombstone?: boolean;
}

export interface ORSet<T> extends CRDT<Array<ORSetItem<T>>> {
  add(value: T): ORSet<T>;
  remove(value: T): ORSet<T>;
  has(value: T): boolean;
  values(): Array<T>;
}

// G-Set specific types
export interface GSet<T> extends CRDT<Set<T>> {
  add(item: T): GSet<T>;
  has(item: T): boolean;
  toArray(): Array<T>;
}

// Counter specific types
export interface Counter extends CRDT<Map<string, number>> {
  increment(amount?: number): Counter;
  decrement(amount?: number): Counter;
  getValue(): number;
  merge(other: CRDT<Map<string, number>>): Counter;
}

// RGA specific types
export interface RGANode<T> {
  readonly value: T;
  readonly id: string;
  readonly prev: string | null;
  readonly next: string | null;
  readonly tombstone?: boolean;
}

export interface RGA<T> extends CRDT<Array<RGANode<T>>> {
  insertAfter(afterId: string | null, value: T): RGA<T>;
  delete(id: string): RGA<T>;
  toArray(): Array<T>;
}

// Storage interface
export interface Storage {
  save(key: string, crdt: CRDT<unknown>): Promise<void>;
  load<T>(key: string): Promise<CRDT<T> | null>;
  getAllKeys(): Promise<Array<string>>;
  delete(key: string): Promise<void>;
}

// Sync protocol interfaces
export interface Transport {
  isConnected(): boolean;
  send(message: unknown): Promise<void>;
  receive(): Promise<unknown>;
  onConnect(callback: () => void): void;
  onDisconnect(callback: () => void): void;
}

export interface SyncProtocol<T extends CRDT<unknown>> {
  push(): Promise<void>;
  pull(): Promise<T>;
  sync(): Promise<void>;
}

// Identity types
export interface KeyPair {
  readonly publicKey: Uint8Array;
  readonly privateKey: Uint8Array;
}

export interface DIDKey {
  readonly did: string;
  readonly keyPair: KeyPair;
  sign(data: Uint8Array): Promise<Uint8Array>;
  verify(signature: Uint8Array, data: Uint8Array): Promise<boolean>;
  toDIDDocument(): DIDDocument;
}

export interface DIDDocument {
  "@context": Array<string>;
  id: string;
  verificationMethod: Array<VerificationMethod>;
  authentication: Array<string>;
  assertionMethod: Array<string>;
}

export interface VerificationMethod {
  id: string;
  type: string;
  controller: string;
  publicKeyMultibase: string;
}

// IPFS types
export interface IPFSGateway {
  fetch(cid: string): Promise<Uint8Array>;
  pin(content: Uint8Array): Promise<string>;
  unpin(cid: string): Promise<void>;
}
