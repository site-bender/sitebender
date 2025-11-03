//++ Gets today's date in ISO format (YYYY-MM-DD) using Temporal API
export default function todayIsoLocal(): string {
	try {
		return Temporal.Now.plainDateISO().toString()
	} catch {
		// Fallback if Temporal is not available
		const d = new Date()
		const y = d.getFullYear()
		const m = String(d.getMonth() + 1).padStart(2, "0")
		const day = String(d.getDate()).padStart(2, "0")

		return `${y}-${m}-${day}`
	}
}
