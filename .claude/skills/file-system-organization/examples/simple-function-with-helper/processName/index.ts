import trim from "@sitebender/toolsmith/string/trim/index.ts"

import _sanitizeName from "./_sanitizeName/index.ts"

//++ Processes a user's name by sanitizing and formatting it
export default function processName(name: string): string {
	const sanitized = _sanitizeName(name)

	return trim(sanitized)
}
