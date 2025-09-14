//++ Returns the repository root URL based on this file location
export default function repoRootUrl(): URL {
	// contracts/enforcement/detectViolations/findPattern/index.ts -> up 4
	return new URL("../../../../", import.meta.url)
}
