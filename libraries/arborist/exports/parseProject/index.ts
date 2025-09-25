import { readdirSync, statSync } from "node:fs"
import { extname, join } from "node:path"

//++ Parses all TypeScript/JavaScript files in a project directory

import type {
	ArboristContractOutput,
	ParsedFile,
	ParsedProject,
} from "../types"

import createContractOutput from "../../../warden/src/utils/createContractOutput/index.ts"
import parseFile from "../parseFile"

export default function parseProject(
	rootPath: string,
): ArboristContractOutput<ParsedProject> {
	const files: Array<ParsedFile> = []
	let totalFunctions = 0
	let totalTypes = 0
	let totalConstants = 0
	let totalComponents = 0

	// Recursively find all TypeScript/JavaScript files
	function findFiles(dir: string): void {
		try {
			const entries = readdirSync(dir)

			for (const entry of entries) {
				const fullPath = join(dir, entry)
				const stat = statSync(fullPath)

				if (stat.isDirectory()) {
					// Skip node_modules and hidden directories
					if (!entry.startsWith(".") && entry !== "node_modules") {
						findFiles(fullPath)
					}
				} else if (stat.isFile()) {
					const ext = extname(entry)
					if ([".ts", ".tsx", ".js", ".jsx"].includes(ext)) {
						// Parse the file
						const result = parseFile(fullPath)

						// Validate the contract output
						if (result.validate()) {
							const parsedFile = result.data
							files.push(parsedFile)

							// Update totals
							totalFunctions += parsedFile.functions.length
							totalTypes += parsedFile.types.length
							totalConstants += parsedFile.constants.length
							totalComponents += parsedFile.components.length
						}
					}
				}
			}
		} catch (error) {
			console.error(`Error reading directory ${dir}:`, error)
		}
	}

	// Start the recursive search
	findFiles(rootPath)

	// Create the project result
	const project: ParsedProject = {
		rootPath,
		files: Object.freeze(files),
		totalFunctions,
		totalTypes,
		totalConstants,
		totalComponents,
	}

	// Wrap in contract output
	return createContractOutput(
		project,
		"arborist",
		"1.0.0",
	)
}
