import or from "@sitebender/toolsmith/logic/or/index.ts"

export default function _convertReference(ref: unknown): {
	file: string
	line: number
	column: number
	start: number
	end: number
} {
	return {
		file: or((ref as Record<string, unknown>).file)("") as string,
		line: or((ref as Record<string, unknown>).line)(0) as number,
		column: or((ref as Record<string, unknown>).column)(0) as number,
		start: or((ref as Record<string, unknown>).start)(0) as number,
		end: or((ref as Record<string, unknown>).end)(0) as number,
	}
}
