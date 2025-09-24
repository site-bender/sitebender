//++ Type definitions for integrity script aggregator

export type Phase = "pending" | "warn" | "block"

export type Status = "ok" | "warn" | "error" | "pending"

export type Severity = "critical" | "high" | "medium" | "info"

export type Decision = "allow" | "warn" | "block"

export type ScriptResult = {
	readonly name: string
	readonly phase: Phase
	readonly status: Status
	readonly messages?: ReadonlyArray<string>
	readonly severity?: Severity
}

export type Summary = {
	readonly critical: number
	readonly high: number
	readonly medium: number
	readonly info: number
	readonly blockers: number
}

export type AggregatedResults = {
	readonly runId: string
	readonly results: ReadonlyArray<ScriptResult>
	readonly decision: Decision
	readonly summary: Summary
}
