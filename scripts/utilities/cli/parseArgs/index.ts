import isArray from "@sitebender/toolsmith/array/isArray/index.ts"
import length from "@sitebender/toolsmith/array/length/index.ts"
import push from "@sitebender/toolsmith/array/push/index.ts"
import has from "@sitebender/toolsmith/set/has/index.ts"
import indexOf from "@sitebender/toolsmith/string/indexOf/index.ts"
import lengthStr from "@sitebender/toolsmith/string/length/index.ts"
import slice from "@sitebender/toolsmith/string/slice/index.ts"
import startsWith from "@sitebender/toolsmith/string/startsWith/index.ts"

export type ParsedArgs = {
	flags: Record<string, boolean>
	options: Record<string, string | Array<string>>
	positional: Array<string>
}

//++ Parses command-line arguments into flags, options, and positional arguments with support for aliases and type coercion
export default function parseArgs(
	argv: Array<string>,
	config?: {
		booleans?: Array<string>
		strings?: Array<string>
		aliases?: Record<string, string>
	},
): ParsedArgs {
	const flags: Record<string, boolean> = {}
	const options: Record<string, string | Array<string>> = {}
	const positional: Array<string> = []
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
		else if (isArray(options[k])) push(value)(options[k] as Array<string>)
		else options[k] = [options[k] as string, value]
	}

	for (let i = 0; i < length(argv); i++) {
		const a = argv[i]
		if (a === "--") {
			// remainder positional
			for (let j = i + 1; j < length(argv); j++) push(argv[j])(positional)
			break
		}
		if (startsWith("--no-")(a)) {
			setOpt(slice(5)(Infinity)(a), false)
			continue
		}
		if (startsWith("--")(a)) {
			const eq = indexOf("=")(a)
			if (eq !== -1) {
				const k = slice(2)(eq)(a)
				const v = slice(eq + 1)(Infinity)(a)
				if (has(k)(boolSet)) setOpt(k, v !== "false")
				else setOpt(k, v)
			} else {
				const k = slice(2)(Infinity)(a)
				if (has(k)(boolSet)) setOpt(k, true)
				else {
					const v = argv[i + 1]
					if (v !== undefined && !startsWith("-")(v)) {
						setOpt(k, v)
						i++
					} else setOpt(k, "true")
				}
			}
			continue
		}
		if (startsWith("-")(a)) {
			// short flags cluster like -qv or -o value
			const cluster = slice(1)(Infinity)(a)
			for (let c = 0; c < lengthStr(cluster); c++) {
				const k = cluster[c]
				const full = alias[k] ?? k
				if (has(full)(boolSet)) setOpt(full, true)
				else {
					const v = argv[i + 1]
					if (v && !startsWith("-")(v)) {
						setOpt(full, v)
						i++
					} else setOpt(full, "true")
				}
			}
			continue
		}
		push(a)(positional)
	}

	// Normalize boolean-defaults to false when not set
	for (const b of boolSet) if (flags[b] === undefined) flags[b] = false

	return { flags, options, positional }
}
