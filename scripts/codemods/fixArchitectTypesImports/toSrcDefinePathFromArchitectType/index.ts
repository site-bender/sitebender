import { resolve } from "https://deno.land/std@0.224.0/path/mod.ts"

import { WORKSPACE_ROOT } from "../constants/index.ts"

//++ Converts architect types path to components src/define path
export default function toSrcDefinePathFromArchitectType(typeAbsPath: string): string {
	// Convert .../libraries/architect/types/schema.org/<schema path>/index.ts
	// to .../libraries/codewright/src/define/<schema path>/index.tsx
	const marker = "/architect/types/schema.org/"
	const idx = typeAbsPath.indexOf(marker)
	if (idx === -1) return ""

	const schemaPath = typeAbsPath.slice(idx + marker.length)

	return resolve(
		WORKSPACE_ROOT,
		"libraries/codewright/src/define",
		schemaPath.replace(/index\.ts$/, "index.tsx"),
	)
}

//?? [EXAMPLE]
// toSrcDefinePathFromArchitectType("/project/libraries/architect/types/schema.org/Person/index.ts")
// Returns: "/project/libraries/codewright/src/define/Person/index.tsx"
