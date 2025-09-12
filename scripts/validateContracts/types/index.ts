//++ ViolationCheck describes a single contract enforcement grep command
export type ViolationCheck = {
	readonly name: string
	readonly command: string
	readonly errorMessage: string
	readonly severity: 'error' | 'warning'
}

//++ Aggregated formatted violation output buckets
export type FormattedViolations = {
	readonly errors: Array<string>
	readonly warnings: Array<string>
}

export default ViolationCheck
