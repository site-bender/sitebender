export type FindDuplicatesAccumulator<T> = {
	seen: Map<T, number>
	duplicates: Array<{ item: T; firstIndex: number }>
	processedDuplicates: Set<T>
}

export type DuplicateEntry<T> = {
	item: T
	firstIndex: number
}
