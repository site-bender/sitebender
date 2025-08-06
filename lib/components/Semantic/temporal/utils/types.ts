/**
 * Common types for temporal components
 */

import type { CalendarSystem } from "./calendars.ts"
import type { FormatOptions } from "./formatters.ts"

export interface TemporalBaseProps {
	// Core value - can be string or Date
	value: string | Date
	
	// Timezone (IANA name) - makes component "zoned"
	timezone?: string
	
	// Locale for formatting (BCP 47)
	locale?: string
	
	// Calendar system
	calendar?: CalendarSystem
	
	// Display format preset
	format?: "short" | "medium" | "long" | "full" | "iso" | "relative"
	
	// Custom format options (overrides format preset)
	formatOptions?: FormatOptions
	
	// For relative time display
	relativeTo?: string | Date
	
	// Show timezone in output
	showZone?: boolean
	
	// Custom className
	className?: string
	
	// Custom content (render prop)
	children?: string | ((formatted: FormattedTemporal) => JSX.Element)
}

export interface FormattedTemporal {
	// Formatted display string
	display: string
	
	// Machine-readable datetime attribute value
	datetime: string
	
	// Individual parts if needed
	parts?: Intl.DateTimeFormatPart[]
	
	// Relative time if applicable
	relative?: string
	
	// Timezone abbreviation if applicable
	timezone?: string
}