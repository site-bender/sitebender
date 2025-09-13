//++ Type definitions for contract graph structures

export type ContractEdge = {
	readonly from: string
	readonly to: string
}

export type ContractGraph = {
	readonly version: number
	readonly libraries: ReadonlyArray<string>
	readonly edges: ReadonlyArray<ContractEdge>
}

export type BoundariesConfig = {
	readonly dependencies: Record<string, {
		readonly canImport: ReadonlyArray<string>
		readonly canBeImportedBy?: ReadonlyArray<string>
		readonly forbiddenImports?: ReadonlyArray<string>
	}>
}
