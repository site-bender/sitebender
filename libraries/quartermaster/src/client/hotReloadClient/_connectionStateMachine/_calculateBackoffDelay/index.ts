//++ Calculates next reconnect delay using exponential backoff with maximum cap
export default function _calculateBackoffDelay(
	currentDelay: number,
) {
	return function calculateBackoffDelayWithCurrent(
		multiplier: number,
	) {
		return function calculateBackoffDelayWithMultiplier(
			maxDelay: number,
		) {
			return function calculateBackoffDelayWithMax(): number {
				return Math.min(currentDelay * multiplier, maxDelay)
			}
		}
	}
}
