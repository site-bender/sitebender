import type { FileSpec } from "../../../schema/blueprint/index.ts"
import type { ProcessError } from "../../types/index.ts"
import type { Result } from "../../../../../toolsmith/src/types/fp/result/index.ts"
import ok from "../../../../../toolsmith/src/monads/result/ok/index.ts"
import error from "../../../../../toolsmith/src/monads/result/error/index.ts"

export default function _validateFileSpec(
	file: FileSpec,
): (index: number) => Result<ReadonlyArray<ProcessError>, FileSpec> {
	return function _validateFileSpecWithFile(
		index: number,
	): Result<ReadonlyArray<ProcessError>, FileSpec> {
		const fileErrors: ReadonlyArray<ProcessError | null> = [
			// Check targetPath
			!file.targetPath || typeof file.targetPath !== "string" ||
				file.targetPath.trim() === ""
				? {
					_tag: "ValidationError" as const,
					message: `File at index ${index} must have a non-empty 'targetPath'`,
					field: `files[${index}].targetPath`,
				}
				: null,
			// Check for path traversal in targetPath
			file.targetPath &&
				(file.targetPath.includes("..") || file.targetPath.startsWith("/"))
				? {
					_tag: "PathTraversal" as const,
					path: file.targetPath,
				}
				: null,
			// Check mode
			!file.mode || (file.mode !== "copy" && file.mode !== "template")
				? {
					_tag: "ValidationError" as const,
					message:
						`File at index ${index} must have a 'mode' of either "copy" or "template"`,
					field: `files[${index}].mode`,
				}
				: null,
			// Check sourcePath for template mode
			file.mode === "template" &&
				(!file.sourcePath || typeof file.sourcePath !== "string" ||
					file.sourcePath.trim() === "")
				? {
					_tag: "ValidationError" as const,
					message:
						`File at index ${index} with mode "template" must have a non-empty 'sourcePath'`,
					field: `files[${index}].sourcePath`,
				}
				: null,
			// Check for path traversal in sourcePath if present
			file.sourcePath &&
				(file.sourcePath.includes("..") || file.sourcePath.startsWith("/"))
				? {
					_tag: "PathTraversal" as const,
					path: file.sourcePath,
				}
				: null,
		]

		const filteredErrors = fileErrors.filter((error): error is ProcessError =>
			error !== null
		)
		return filteredErrors.length === 0 ? ok(file) : error(filteredErrors)
	}
}
