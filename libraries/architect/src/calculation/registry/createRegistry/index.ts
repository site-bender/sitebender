import type { Registry } from "../../types/index.ts"

//++ Creates an empty component registry
export default function createRegistry(): Registry {
	return {
		schemas: new Map(),
	}
}
