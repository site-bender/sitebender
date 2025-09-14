//++ Creates an error message for values outside acceptable range
export function outOfRange(op: string) {
	return function withParam(param: string) {
		return function withMin(min: number) {
			return function withMax(max: number) {
				return function withActual(actual: number) {
					return `${op}: ${param} must be between ${min} and ${max}, got ${actual}`
				}
			}
		}
	}
}

//?? [EXAMPLE]
// const error = outOfRange("setVolume")("volume")(0)(100)(150)
// // Returns: "setVolume: volume must be between 0 and 100, got 150"

//?? [EXAMPLE] Partial application for reusable validators
// const validatePercentage = outOfRange("setProgress")("percentage")(0)(100)
// const error1 = validatePercentage(-10)
// // Returns: "setProgress: percentage must be between 0 and 100, got -10"
// const error2 = validatePercentage(120)
// // Returns: "setProgress: percentage must be between 0 and 100, got 120"