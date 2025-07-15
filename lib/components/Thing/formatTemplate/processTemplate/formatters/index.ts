import type { FormatFunction } from "../../../../../types/formatters/index.ts"

import cite from "./cite/index.tsx"
import familyFirst from "./familyFirst/index.tsx"
import givenFirst from "./givenFirst/index.tsx"
import year from "./year/index.tsx"

export const FORMATTERS: Record<string, FormatFunction> = {
	cite,
	familyFirst,
	givenFirst,
	year,
}

export default FORMATTERS
