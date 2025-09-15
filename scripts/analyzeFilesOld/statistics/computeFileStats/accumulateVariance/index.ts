//++ Accumulates squared differences from mean for variance calculation
export default function accumulateVariance(mean: number): (acc: number, n: number) => number {
	return function accumulateVarianceWithMean(acc: number, n: number): number {
		return acc + Math.pow(n - mean, 2)
	}
}