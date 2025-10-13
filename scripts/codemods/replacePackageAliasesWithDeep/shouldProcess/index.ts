import endsWith from "@sitebender/toolsmith/string/endsWith/index.ts"

//++ Determines if a file should be processed based on its extension
export default function shouldProcess(path: string): boolean {
	return endsWith(".ts")(path) || endsWith(".tsx")(path)
}

//?? [EXAMPLE]
// shouldProcess("/path/to/file.ts") // Returns: true
// shouldProcess("/path/to/component.tsx") // Returns: true
// shouldProcess("/path/to/readme.md") // Returns: false
