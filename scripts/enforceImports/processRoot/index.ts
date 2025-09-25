import flatMap from "@sitebender/toolsmith/vanilla/array/flatMap/index.ts"
import map from "@sitebender/toolsmith/vanilla/array/map/index.ts"

import type { AliasViolation } from "../../types/index.ts"

import collectAllFiles from "../collectAllFiles/index.ts"
import processFile from "../processFile/index.ts"
import flattenViolations from "./flattenViolations/index.ts"

//++ Processes a single root directory for import violations
export default async function processRoot(
	root: string,
): Promise<Array<AliasViolation>> {
	try {
		// Collect all files
		const files = await collectAllFiles(root)

		// Process them all
		const violationPromises = map(processFile)(files)
		const violationArrays = await Promise.all(violationPromises)
		const allViolations = flatMap(flattenViolations)(violationArrays)

		return allViolations
	} catch (err) {
		if (!(err instanceof Deno.errors.NotFound)) {
			throw err
		}
		return []
	}
}
