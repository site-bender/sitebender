// @sitebender/arborist/src/_helpers/ensureSwcInitialized
// Ensures SWC WASM is initialized before use

import initSwc from "npm:@swc/wasm-web@1.13.20"

// Create initialization promise once at module load
// This avoids mutations while ensuring single initialization
// The promise itself is immutable once created
const initializationPromise: Promise<void> = initSwc().then(() => undefined)

//++ Ensures SWC WASM module is initialized
//++ Returns a Promise that resolves when initialization is complete
//++ All calls return the same promise (idempotent, no mutations)
//++ Uses const with promise caching to avoid let/var
export default async function ensureSwcInitialized(): Promise<void> {
	return initializationPromise
}
