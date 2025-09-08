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

//?? [EXAMPLE] toMillis("2024-01-15T14:30:00Z") // 1705329000000
//?? [EXAMPLE] toMillis(1705329000000) // 1705329000000
//?? [EXAMPLE] toMillis(null) // null
//?? [EXAMPLE] toMillis("invalid") // null
//?? [EXAMPLE] toMillis(Infinity) // null