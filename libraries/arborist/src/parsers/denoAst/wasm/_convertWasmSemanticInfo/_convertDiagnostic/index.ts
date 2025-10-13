import or from "@sitebender/toolsmith/logic/or/index.ts"
import type { Diagnostic } from "../../../../types/semantics/index.ts"

export default function _convertDiagnostic(d: unknown): Diagnostic {
	const diag = d as Record<string, unknown>
	return {
		message: or(diag.message)("Unknown diagnostic") as string,
		severity: (or(diag.severity)("error") as string) as Diagnostic["severity"],
		start: or(diag.start)(0) as number,
		end: or(diag.end)(0) as number,
	}
}
