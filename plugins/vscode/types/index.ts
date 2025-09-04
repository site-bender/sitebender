// Named exports for types used across the agent scripts

export type CommandResult = {
	code: number
	stdout: string
	stderr: string
}

export type Parsed = {
	ok: boolean
	version?: string
}

export type MakeReportDependencies = {
	joinLines: (lines: Array<string>) => string
	makeGuidance: (names: Array<string>) => string
}

export type PrerequisiteCheckResult = { name: string } & Parsed

export type MakeGuidanceDependencies = {
	isMacOS: () => boolean
	joinLines: (lines: Array<string>) => string
}

export type DenoTasksMap = Record<string, string>
