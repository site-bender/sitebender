import { WEEK_START_DAY } from "../../semantic/temporal/constants/index.ts"

/**
 * Get week start day for locale
 */
export default function getWeekStartDay(locale?: string): number {
	if (!locale) return WEEK_START_DAY.default

	const baseLocale = locale.split("-")[0]
	return WEEK_START_DAY[locale] ?? WEEK_START_DAY[baseLocale] ??
		WEEK_START_DAY.default
}
