//++ Detects Envoy marker from comment text
//++ Returns EnvoyMarker if found, undefined otherwise
import type { EnvoyMarker } from "../../types/index.ts"

export default function detectEnvoyMarker(text: string): EnvoyMarker | undefined {
	const trimmed = text.trim()

	if (trimmed.startsWith("++")) {
		return {
			marker: "++",
			description: trimmed.slice(2).trim(),
		}
	}

	if (trimmed.startsWith("--")) {
		return {
			marker: "--",
			techDebt: trimmed.slice(2).trim(),
		}
	}

	if (trimmed.startsWith("!!")) {
		return {
			marker: "!!",
			critical: trimmed.slice(2).trim(),
		}
	}

	if (trimmed.startsWith("??")) {
		return {
			marker: "??",
			help: trimmed.slice(2).trim(),
		}
	}

	if (trimmed.startsWith(">>")) {
		return {
			marker: ">>",
			link: trimmed.slice(2).trim(),
		}
	}

	return undefined
}
