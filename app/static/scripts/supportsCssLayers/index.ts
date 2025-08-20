export default function supportsCssLayers(): boolean {
	if (!globalThis.CSS || !globalThis.CSS.supports) {
		return false
	}

	try {
		return CSS.supports("@layer", "test")
	} catch {
		return false
	}
}
