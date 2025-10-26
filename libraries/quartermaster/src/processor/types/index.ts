//++ Types for the blueprint processor
//++ Processor-specific types for options, results, errors, and file specifications

export type ProcessOptions = {
	readonly appName: string
	readonly outputPath: string
	readonly dryRun?: boolean
	readonly verbose?: boolean
}

export type ProcessResult = {
	readonly success: boolean
	readonly appPath: string
	readonly filesCreated: ReadonlyArray<string>
	readonly messages: ReadonlyArray<string>
	readonly errors?: ReadonlyArray<ProcessError>
}

export type ProcessError =
	| {
		readonly _tag: "ValidationError"
		readonly message: string
		readonly field?: string
	}
	| { readonly _tag: "FileNotFound"; readonly path: string }
	| {
		readonly _tag: "PermissionDenied"
		readonly path: string
		readonly operation: string
	}
	| {
		readonly _tag: "TemplateError"
		readonly message: string
		readonly file: string
	}
	| { readonly _tag: "PathTraversal"; readonly path: string }
	| { readonly _tag: "UnknownError"; readonly error: Error }

export type FileSpec = {
	readonly targetPath: string
	readonly mode: "copy" | "template"
	readonly sourcePath?: string
	readonly executable?: boolean
}

export type SubstitutionVariables = {
	readonly [key: string]: string
}
