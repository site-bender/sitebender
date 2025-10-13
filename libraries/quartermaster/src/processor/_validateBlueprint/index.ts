//++ Validate blueprint structure and contents for safety
//++ Returns Result with blueprint if valid, or validation errors if invalid
//++ Checks required fields, file specs, and path safety against traversal attacks

import type { Blueprint, FileSpec } from "../../schema/blueprint/index.ts"
import type { ProcessError } from "../types/index.ts"
import type { Result } from "../../../../toolsmith/src/types/fp/result/index.ts"
import ok from "../../../../toolsmith/src/monads/result/ok/index.ts"
import error from "../../../../toolsmith/src/monads/result/error/index.ts"
import _validateFileSpec from "./_validateFileSpec/index.ts"

export default function _validateBlueprint(blueprint: Blueprint) {
	return function validateBlueprintWithConfig(): Result<ReadonlyArray<ProcessError>, Blueprint> {
		const basicErrors: ReadonlyArray<ProcessError | null> = [
			// Check required string fields
			!blueprint.id || typeof blueprint.id !== "string" || blueprint.id.trim() === ""
				? {
						_tag: "ValidationError" as const,
						message: "Blueprint must have a non-empty 'id' field",
						field: "id",
					}
				: null,
			!blueprint.name || typeof blueprint.name !== "string" || blueprint.name.trim() === ""
				? {
						_tag: "ValidationError" as const,
						message: "Blueprint must have a non-empty 'name' field",
						field: "name",
					}
				: null,
			!blueprint.description || typeof blueprint.description !== "string" || blueprint.description.trim() === ""
				? {
						_tag: "ValidationError" as const,
						message: "Blueprint must have a non-empty 'description' field",
						field: "description",
					}
				: null,
			// Check outputs
			!blueprint.outputs
				? {
						_tag: "ValidationError" as const,
						message: "Blueprint must have an 'outputs' object",
						field: "outputs",
					}
				: null,
			blueprint.outputs && (!blueprint.outputs.appPath || typeof blueprint.outputs.appPath !== "string" || blueprint.outputs.appPath.trim() === "")
				? {
						_tag: "ValidationError" as const,
						message: "Blueprint must have a non-empty 'outputs.appPath' field",
						field: "outputs.appPath",
					}
				: null,
			// Check outputs.appPath for path traversal
			blueprint.outputs && blueprint.outputs.appPath && (blueprint.outputs.appPath.includes("..") || blueprint.outputs.appPath.startsWith("/"))
				? {
						_tag: "PathTraversal" as const,
						path: blueprint.outputs.appPath,
					}
				: null,
			// Check files is array
			blueprint.files && !Array.isArray(blueprint.files)
				? {
						_tag: "ValidationError" as const,
						message: "Blueprint 'files' must be an array",
						field: "files",
					}
				: null,
		]

		const filteredBasicErrors = basicErrors.filter((error): error is ProcessError => error !== null)

		// Validate file specs if present
		const fileValidationResults: ReadonlyArray<Result<ReadonlyArray<ProcessError>, FileSpec>> = blueprint.files && Array.isArray(blueprint.files)
			? blueprint.files.map((file, index) => _validateFileSpec(file)(index))
			: []

		const fileErrors: ReadonlyArray<ProcessError> = fileValidationResults
			.filter((result): result is Result<ReadonlyArray<ProcessError>, FileSpec> & { _tag: "Error" } => result._tag === "Error")
			.map(result => result.error)
			.reduce((accumulator, errors) => [...accumulator, ...errors], [] as ReadonlyArray<ProcessError>)

		const allErrors = [...filteredBasicErrors, ...fileErrors]
		return allErrors.length === 0 ? ok(blueprint) : error(allErrors)
	}
}
