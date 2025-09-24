//++ Predicate: returns true if the path should be scanned for matches
export default function isSearchableFile(path: string): boolean {
	return /(\.ts|\.tsx|\.js|\.jsx|\.md|\.json)$/.test(path)
}
