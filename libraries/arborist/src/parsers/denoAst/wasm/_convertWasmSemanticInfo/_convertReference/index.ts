export default function _convertReference(ref: unknown): {
	file: string
	line: number
	column: number
	start: number
	end: number
} {
	const refData = ref as Record<string, unknown>
	return {
		file: (refData.file as string | undefined) ?? "",
		line: (refData.line as number | undefined) ?? 0,
		column: (refData.column as number | undefined) ?? 0,
		start: (refData.start as number | undefined) ?? 0,
		end: (refData.end as number | undefined) ?? 0,
	}
}
