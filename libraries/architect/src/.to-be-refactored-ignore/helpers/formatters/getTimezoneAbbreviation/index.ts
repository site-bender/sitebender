//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function getTimezoneAbbreviation(
	timezone: string,
	date: Date = new Date(),
	locale?: string,
): string {
	const formatter = new Intl.DateTimeFormat(locale || "en-US", {
		timeZoneName: "short",
		timeZone: timezone,
	})

	const parts = formatter.formatToParts(date)
	const timeZonePart = parts.find((part) => part.type === "timeZoneName")

	return timeZonePart?.value || timezone
}
