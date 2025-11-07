//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
export default function formatDurationPart(
	value: number,
	unit: Intl.RelativeTimeFormatUnit,
	locale?: string,
	style: "short" | "long" | "narrow" = "long",
): string {
	// Format as positive relative time, then remove "in" prefix
	const rtf = new Intl.RelativeTimeFormat(locale || "en-US", {
		numeric: "always",
		style,
	})

	// Get the formatted string and clean it up
	const formatted = rtf.format(value, unit)
	// Remove "in" prefix for future times in various languages
	return formatted.replace(
		/^(in |dans |tra |في |בעוד |через |om |en |за |में |)\s*/i,
		"",
	)
}
