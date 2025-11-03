//++ Converts a PlainDateTime object to ISO string format
export default function toIsoDateTimeString(pdt: unknown): string | null {
	const ISO_DATETIME_PATTERN =
		/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,9})?$/

	if (
		pdt &&
		typeof (pdt as { toString: () => string }).toString === "function"
	) {
		const iso = (pdt as { toString: () => string }).toString()

		return ISO_DATETIME_PATTERN.test(iso) ? iso : null
	}

	return null
}
