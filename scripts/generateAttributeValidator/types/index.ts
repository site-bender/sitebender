export type ValidationType =
	| "string"
	| "enum"
	| "boolean"
	| "number"
	| "pattern"

export type AttributeConfig = Readonly<{
	attributeName: string
	validationType: ValidationType
	validValues?: ReadonlyArray<string>
	pattern?: string
	description?: string
	converter?: "_convertBooleanToTrueFalse" | "_convertBooleanToYesNo"
	allowEmpty?: boolean
}>

export type GeneratorResult = Readonly<{
	validatorPath: string
	testPath: string
	success: boolean
	message: string
}>
