//++ Public types exported by the Arborist library - contract compliant

import type { ContractOutput } from "../../../warden/src/types/enforcement.ts"

export type Comment = {
	readonly text: string
	readonly line: number
	readonly column: number
	readonly type: "single" | "multi" | "jsdoc"
}

export type ParsedParameter = {
	readonly name: string
	readonly type: string
	readonly optional: boolean
	readonly defaultValue?: string
}

export type ParsedFunction = {
	readonly name: string
	readonly filePath: string
	readonly line: number
	readonly column: number
	readonly signature: string
	readonly parameters: ReadonlyArray<ParsedParameter>
	readonly returnType: string
	readonly isAsync: boolean
	readonly isGenerator: boolean
	readonly isExported: boolean
	readonly isDefault: boolean
	readonly comments: ReadonlyArray<Comment>
}

export type ParsedType = {
	readonly name: string
	readonly filePath: string
	readonly line: number
	readonly column: number
	readonly definition: string
	readonly isExported: boolean
	readonly comments: ReadonlyArray<Comment>
}

export type ParsedConstant = {
	readonly name: string
	readonly filePath: string
	readonly line: number
	readonly column: number
	readonly type: string
	readonly value?: string
	readonly isExported: boolean
	readonly comments: ReadonlyArray<Comment>
}

export type ParsedComponent = {
	readonly name: string
	readonly filePath: string
	readonly line: number
	readonly column: number
	readonly props: ReadonlyArray<ParsedParameter>
	readonly isExported: boolean
	readonly isDefault: boolean
	readonly comments: ReadonlyArray<Comment>
}

export type ParsedFile = {
	readonly filePath: string
	readonly functions: ReadonlyArray<ParsedFunction>
	readonly types: ReadonlyArray<ParsedType>
	readonly constants: ReadonlyArray<ParsedConstant>
	readonly components: ReadonlyArray<ParsedComponent>
	readonly comments: ReadonlyArray<Comment>
	readonly imports: ReadonlyArray<string>
	readonly exports: ReadonlyArray<string>
}

export type ParsedProject = {
	readonly rootPath: string
	readonly files: ReadonlyArray<ParsedFile>
	readonly totalFunctions: number
	readonly totalTypes: number
	readonly totalConstants: number
	readonly totalComponents: number
}

export type ArboristContractOutput<T> = ContractOutput<T>
