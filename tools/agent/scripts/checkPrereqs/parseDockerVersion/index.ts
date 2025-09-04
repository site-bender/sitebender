import type { Parsed } from "../../../types/index.ts"

export default function parseDockerVersion(output: string): Parsed {
	const match = output.match(/version\s+(\d+[^\s,]*)/i)

	return { ok: !!match, version: match?.[1] }
}
