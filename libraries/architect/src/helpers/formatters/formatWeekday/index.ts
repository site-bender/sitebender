//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function formatWeekday(
	date: Date | string,
	locale?: string,
	format: "narrow" | "short" | "long" = "long",
): string {
	const d = typeof date === "string" ? new Date(date) : date

	const formatter = new Intl.DateTimeFormat(locale || "en-US", {
		weekday: format,
	})

	return formatter.format(d)
}
