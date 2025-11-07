import type { Diagnostic } from "../../../../types/semantics/index.ts"

export default function _convertDiagnostic(d: unknown): Diagnostic {
	const diag = d as Record<string, unknown>
	return {
		message: (diag.message as string | undefined) ?? "Unknown diagnostic",
		severity: ((diag.severity as string | undefined) ?? "error") as Diagnostic[
			"severity"
		],
		start: (diag.start as number | undefined) ?? 0,
		end: (diag.end as number | undefined) ?? 0,
	}
}
