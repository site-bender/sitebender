import type { AliasViolation } from "../../types/index.ts"

import checkFileForAliasViolations from "../checkFileForAliasViolations/index.ts"

//++ Processes a single file for import violations
export default async function processFile(
	file: string,
): Promise<Array<AliasViolation>> {
	const text = await Deno.readTextFile(file)
	return checkFileForAliasViolations(file, text)
}
