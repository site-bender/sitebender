import type { Parsed } from "../../../types/index.ts"

export default function parseDenoVersion(output: string): Parsed {
	const match = output.match(/deno\s+(\d+\.\d+\.\d+)/i)

	return { ok: !!match, version: match?.[1] }
}
