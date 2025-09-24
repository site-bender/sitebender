export default function splitArgs(argsStr: string): string[] {
	const args: string[] = []
	let current = ""
	let inQuotes = false
	let quoteChar = ""

	for (let i = 0; i < argsStr.length; i++) {
		const char = argsStr[i]

		if ((char === '"' || char === "'") && !inQuotes) {
			inQuotes = true
			quoteChar = char
			current += char
		} else if (char === quoteChar && inQuotes) {
			inQuotes = false
			quoteChar = ""
			current += char
		} else if (char === "," && !inQuotes) {
			args.push(current.trim())
			current = ""
		} else {
			current += char
		}
	}

	if (current.trim()) {
		args.push(current.trim())
	}

	return args
}
