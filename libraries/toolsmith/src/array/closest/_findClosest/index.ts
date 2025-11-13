/*++
 + [EXCEPTION] Toolsmith functions are permitted to use JS operators and OOP methods for performance.
 + Finds the closest value to a target
 + [EXCEPTION] Using native Math.abs() for performance
 */
export default function _findClosest(target: number) {
	return function findClosestToTarget(closestValue: number) {
		return function findClosestToTargetAndClosest(
			currentValue: number,
		): number {
			const currentDistance = Math.abs(currentValue - target)
			const closestDistance = Math.abs(closestValue - target)

			return currentDistance < closestDistance ? currentValue : closestValue
		}
	}
}
