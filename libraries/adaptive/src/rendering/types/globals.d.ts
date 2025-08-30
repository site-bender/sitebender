// Ambient globals for Adaptive rendering runtime (browser-only)
// Keep scoped and minimal; do not alter precise HTML/ARIA attribute types.

declare global {
	interface Document {
		__sbDisplayCache?: Record<string, HTMLElement>
		__sbDisplayCallbacks?: Record<string, Array<(arg?: unknown, localValues?: unknown) => Promise<void> | void>>
 		__sbCalculators?: Set<string>
 		__sbCalculations?: Record<string, Set<string>>
 		__sbFormatters?: Set<string>
 		__sbFormatted?: Record<string, Set<string>>
 	}

	interface HTMLElement {
 		__sbCalculate?: (arg?: unknown) => Promise<unknown> | unknown
 		__sbFormat?: (arg?: unknown) => Promise<unknown> | unknown
 		__sbValidate?: (arg: unknown, localValues?: unknown) => Promise<unknown> | unknown
 	}
}

export {}
