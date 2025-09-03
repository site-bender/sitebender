export type ParsedArgs = {
	flags: Record<string, boolean>
	options: Record<string, string | string[]>
	positional: string[]
}

export default function parseArgs(
	argv: string[],
	config?: {
		booleans?: string[]
		strings?: string[]
		aliases?: Record<string, string>
	},
): ParsedArgs {
	const flags: Record<string, boolean> = {}
	const options: Record<string, string | string[]> = {}
	const positional: string[] = []
	const boolSet = new Set(config?.booleans ?? [])
	const _strSet = new Set(config?.strings ?? [])
	const alias = config?.aliases ?? {}

	function setOpt(key: string, value: string | boolean) {
		const k = alias[key] ?? key
		if (typeof value === "boolean") {
			flags[k] = value
			return
		}
		if (options[k] === undefined) options[k] = value
		else if (Array.isArray(options[k])) (options[k] as string[]).push(value)
		else options[k] = [options[k] as string, value]
	}

	for (let i = 0; i < argv.length; i++) {
		const a = argv[i]
		if (a === "--") {
			// remainder positional
			for (let j = i + 1; j < argv.length; j++) positional.push(argv[j])
			break
		}
		if (a.startsWith("--no-")) {
			setOpt(a.slice(5), false)
			continue
		}
		if (a.startsWith("--")) {
			const eq = a.indexOf("=")
			if (eq !== -1) {
				const k = a.slice(2, eq)
				const v = a.slice(eq + 1)
				if (boolSet.has(k)) setOpt(k, v !== "false")
				else setOpt(k, v)
			} else {
				const k = a.slice(2)
				if (boolSet.has(k)) setOpt(k, true)
				else {
					const v = argv[i + 1]
					if (v !== undefined && !v.startsWith("-")) {
						setOpt(k, v)
						i++
					} else setOpt(k, "true")
				}
			}
			continue
		}
		if (a.startsWith("-")) {
			// short flags cluster like -qv or -o value
			const cluster = a.slice(1)
			for (let c = 0; c < cluster.length; c++) {
				const k = cluster[c]
				const full = alias[k] ?? k
				if (boolSet.has(full)) setOpt(full, true)
				else {
					const v = argv[i + 1]
					if (v && !v.startsWith("-")) {
						setOpt(full, v)
						i++
					} else setOpt(full, "true")
				}
			}
			continue
		}
		positional.push(a)
	}

	// Normalize boolean-defaults to false when not set
	for (const b of boolSet) if (flags[b] === undefined) flags[b] = false

	return { flags, options, positional }
}
