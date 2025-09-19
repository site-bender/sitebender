export default function sortByKey([a]: [string, unknown], [b]: [string, unknown]): number {
	return a.localeCompare(b)
}
