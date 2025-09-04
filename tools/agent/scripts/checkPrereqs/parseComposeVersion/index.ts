import type { Parsed } from "../../../types/index.ts"

export default function parseComposeVersion(
	output: string,
	exitCode: number,
): Parsed {
	if (exitCode !== 0) return { ok: false }

	const match = output.match(/v?\d+[^\s]*/)

	return { ok: !!match, version: match?.[0] }
}
