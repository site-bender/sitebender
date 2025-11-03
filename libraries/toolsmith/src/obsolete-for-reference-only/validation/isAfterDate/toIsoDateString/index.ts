//++ Converts a Temporal.PlainDate-like object to ISO date string format
export default function toIsoDateString(pd: unknown): string | null {
	// Best-effort use of toString for Temporal.PlainDate
	if (
		pd && typeof (pd as { toString: () => string }).toString === "function"
	) {
		const iso = (pd as { toString: () => string }).toString()
		return /^\d{4}-\d{2}-\d{2}$/.test(iso) ? iso : null
	}
	return null
}
