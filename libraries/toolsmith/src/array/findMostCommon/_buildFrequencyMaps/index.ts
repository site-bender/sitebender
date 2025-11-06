import not from "../../../logic/not/index.ts"
import add from "../../../math/arithmetic/add/index.ts"

type FrequencyAccumulator<T> = {
	frequencyMap: Map<T, number>
	firstOccurrence: Map<T, number>
}

//++ Builds frequency and first occurrence maps (private, not curried for use in reduce)
export default function _buildFrequencyMaps<T>(
	acc: FrequencyAccumulator<T>,
	item: T,
	index: number,
): FrequencyAccumulator<T> {
	if (not(acc.frequencyMap.has(item))) {
		acc.firstOccurrence.set(item, index)
	}
	const currentCount = acc.frequencyMap.get(item) ?? 0
	acc.frequencyMap.set(
		item,
		add(1)(currentCount) as number,
	)
	return acc
}
