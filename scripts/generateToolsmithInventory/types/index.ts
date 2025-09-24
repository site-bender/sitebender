export type FunctionInfo = {
	signature: string
	path: string
	curried: boolean
}

export type ToolsmithInventory = {
	[category: string]: {
		[functionName: string]: FunctionInfo
	}
}

export type ProcessResult = {
	inventory: ToolsmithInventory
	processedCount: number
	failedFiles: string[]
	aliasedFiles: string[]
	typeOrConstantFiles: string[]
}
