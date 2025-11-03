import absoluteValue from "../../../math/absoluteValue/index.ts"

//++ Finds the closest value to a target (private, not curried for use in reduce)
export default function _findClosest(
	target: number,
	closestValue: number,
	currentValue: number,
): number {
	const currentDistance = absoluteValue(currentValue - target)
	const closestDistance = absoluteValue(closestValue - target)

	return currentDistance < closestDistance ? currentValue : closestValue
}
