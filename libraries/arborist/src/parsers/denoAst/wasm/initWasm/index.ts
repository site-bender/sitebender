//++ Initialize the WASM module (bundler target doesn't need explicit init)
export default function initWasm() {
	return function initializeWasmModule(_wasmPath?: string) {
		// Bundler target loads WASM synchronously, no init needed
		return "WASM module initialized successfully"
	}
}
