// Ambient types for scripts and build-time helpers
// Keep minimal and non-intrusive.

declare global {
	interface Logger {
		log: (...args: unknown[]) => void;
		info: (...args: unknown[]) => void;
		warn: (...args: unknown[]) => void;
		error: (...args: unknown[]) => void;
		debug?: (...args: unknown[]) => void;
	}
}

export {};
