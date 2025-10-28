import { resolve } from "https://deno.land/std@0.224.0/path/mod.ts"

//++ Converts types path to src/define path for components
export default function toSrcDefinePath(typeAbsPath: string): string {
	// Convert .../libraries/architect/types/schema.org/<schema path>/index.ts
	// to .../libraries/architect/src/define/<schema path>/index.tsx
	const idx = typeAbsPath.indexOf("/types/schema.org/")
	if (idx === -1) return ""

	const schemaPath = typeAbsPath.slice(idx + "/types/schema.org/".length)

	return resolve(
		typeAbsPath.slice(0, idx),
		"src/define",
		schemaPath.replace(/index\.ts$/, "index.tsx"),
	)
}

//?? [EXAMPLE]
// toSrcDefinePath("/project/libraries/architect/types/schema.org/Person/index.ts")
// Returns: "/project/libraries/architect/src/define/Person/index.tsx"
