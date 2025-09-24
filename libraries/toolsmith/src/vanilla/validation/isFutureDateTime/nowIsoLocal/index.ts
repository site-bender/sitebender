//++ Returns current datetime as ISO string in local timezone
export default function nowIsoLocal(): string {
	const d = new Date()
	const y = d.getFullYear()
	const m = String(d.getMonth() + 1).padStart(2, "0")
	const day = String(d.getDate()).padStart(2, "0")
	const hh = String(d.getHours()).padStart(2, "0")
	const mm = String(d.getMinutes()).padStart(2, "0")
	const ss = String(d.getSeconds()).padStart(2, "0")
	const ms = String(d.getMilliseconds()).padStart(3, "0")

	return `${y}-${m}-${day}T${hh}:${mm}:${ss}.${ms}`
}

//?? [EXAMPLE] nowIsoLocal() // "2024-01-15T14:30:45.123"
