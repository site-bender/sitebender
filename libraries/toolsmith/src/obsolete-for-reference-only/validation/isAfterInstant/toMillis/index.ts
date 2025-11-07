import type { InstantInput } from "../../../../types/temporal/index.ts"

//++ Converts an InstantInput value to milliseconds since epoch
export default function toMillis(
	value: InstantInput | null | undefined,
): number | null {
	if (value === null || value === undefined) {
		return null
	}

	try {
		if (typeof value === "string") {
			const d = new Date(value)
			const ms = d.getTime()
			return Number.isNaN(ms) ? null : ms
		}

		if (typeof value === "number") {
			return Number.isFinite(value) ? value : null
		}

		return null
	} catch {
		return null
	}
}
