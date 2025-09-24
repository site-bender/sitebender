import type { AliasViolation } from "../../types/index.ts"

import join from "@sitebender/toolsmith/vanilla/array/join/index.ts"
import length from "@sitebender/toolsmith/vanilla/array/length/index.ts"
import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"

import formatViolation from "../formatViolation/index.ts"

//++ Formats all violations into a complete error report
export default function formatViolationsReport(violations: Array<AliasViolation>): string {
	const header = "Alias policy violations:\n"
	const formattedViolations = map(formatViolation)(violations)
	const violationLines = join("\n")(formattedViolations)
	const footer = `\nTotal: ${length(violations)} violation(s).`

	return header + "\n" + violationLines + "\n" + footer
}
