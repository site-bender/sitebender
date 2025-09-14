//++ [GROUP] Type definitions for fixComponentsTypesImports codemod

//++ Import specification for barrel imports
export interface ImportSpec {
	original: string
	component: string // e.g., PersonComponent
	symbol: string // e.g., Person
}

//++ [END]