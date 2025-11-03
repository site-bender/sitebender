import defaultTo from "../../../logic/defaultTo/index.ts"
import not from "../../../logic/not/index.ts"
import add from "../../../math/add/index.ts"

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
	const currentCount = defaultTo(0)(acc.frequencyMap.get(item))
	acc.frequencyMap.set(
		item,
		add(1)(currentCount) as number,
	)
	return acc
}
