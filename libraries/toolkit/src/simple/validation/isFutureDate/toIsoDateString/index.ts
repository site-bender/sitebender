import test from "../../../string/test/index.ts"

const ISO_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

//++ Extracts ISO date string from an object with toString method
export default function toIsoDateString(pd: unknown): string | null {
	if (
		pd && typeof (pd as { toString: () => string }).toString === "function"
	) {
		const iso = (pd as { toString: () => string }).toString()

		return test(ISO_DATE_PATTERN)(iso) ? iso : null
	}

	return null
}
