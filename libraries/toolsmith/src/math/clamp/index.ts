import max from "@sitebender/toolsmith/math/max/index.ts"
import min from "@sitebender/toolsmith/math/min/index.ts"

//++ Clamps a value between minimum and maximum bounds (inclusive)
export default function clamp(minimum: number) {
	return function clampWithMinimum(maximum: number) {
		return function clampWithMinimumAndMaximum(value: number): number {
			return min(maximum)(max(minimum)(value))
		}
	}
}
