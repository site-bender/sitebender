import type {
	MakeReportDependencies,
	PrerequisiteCheckResult,
} from "../../../types/index.ts"

export default function makeReport(
	deps: MakeReportDependencies,
	results: Array<PrerequisiteCheckResult>,
	missingNames: Array<string>,
): string {
	const header = "\nSitebender prerequisites check:\n"
	const body = deps.joinLines(
		results.map((result) =>
			`- ${result.name}: ${result.ok ? "OK" : "Missing"}${
				result.version ? ` (${result.version})` : ""
			}`
		),
	)
	const tail = missingNames.length === 0
		? "\n\nAll prerequisites satisfied."
		: deps.makeGuidance(missingNames)

	return [header, body, tail, "\n"].join("\n")
}
