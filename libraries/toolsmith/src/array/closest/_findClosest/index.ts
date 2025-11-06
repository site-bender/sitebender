//++ Finds the closest value to a target (private, not curried for use in reduce)
//++ [EXCEPTION] Using native Math.abs() for performance
export default function _findClosest(
	target: number,
	closestValue: number,
	currentValue: number,
): number {
	const currentDistance = Math.abs(currentValue - target)
	const closestDistance = Math.abs(closestValue - target)

	return currentDistance < closestDistance ? currentValue : closestValue
}
