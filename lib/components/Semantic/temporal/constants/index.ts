/**
 * Constants for temporal components
 */

// First day of week by locale/culture
// 0 = Sunday, 1 = Monday, etc.
export const WEEK_START_DAY: Record<string, number> = {
	"en-US": 0,      // Sunday
	"en-GB": 1,      // Monday
	"ar-SA": 6,      // Saturday
	"he-IL": 0,      // Sunday
	"default": 1     // Monday (ISO)
}