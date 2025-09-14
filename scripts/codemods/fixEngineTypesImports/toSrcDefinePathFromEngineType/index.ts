import { resolve } from "https://deno.land/std@0.224.0/path/mod.ts"

import { WORKSPACE_ROOT } from "../constants/index.ts"

//++ Converts engine types path to components src/define path
export default function toSrcDefinePathFromEngineType(typeAbsPath: string): string {
	// Convert .../libraries/engine/types/schema.org/<schema path>/index.ts
	// to .../libraries/components/src/define/<schema path>/index.tsx
	const marker = "/engine/types/schema.org/"
	const idx = typeAbsPath.indexOf(marker)
	if (idx === -1) return ""

	const schemaPath = typeAbsPath.slice(idx + marker.length)

	return resolve(
		WORKSPACE_ROOT,
		"libraries/components/src/define",
		schemaPath.replace(/index\.ts$/, "index.tsx"),
	)
}

//?? [EXAMPLE]
// toSrcDefinePathFromEngineType("/project/libraries/engine/types/schema.org/Person/index.ts")
// Returns: "/project/libraries/components/src/define/Person/index.tsx"