// Shared form field types (types/ lives alongside component folders per CLAUDE.md)

export type ValidationStatus = "valid" | "invalid" | "warning" | undefined

export type FieldCommonProps = {
	name: string
	label?: string
	help?: string
	required?: boolean
	error?: string
}

export type FieldControlProps<TValue = unknown> = {
	value?: TValue
	onChange?: (value: TValue) => void
}

// Avoid JSX-specific types; use minimal structural types
export type InputAttributes = Partial<
	Pick<
		HTMLInputElement,
		| "type"
		| "value"
		| "name"
		| "id"
		| "placeholder"
		| "required"
		| "pattern"
		| "min"
		| "max"
		| "minLength"
		| "maxLength"
		| "size"
	>
>

export type TextAreaAttributes = Partial<
	Pick<
		HTMLTextAreaElement,
		| "name"
		| "id"
		| "placeholder"
		| "required"
		| "minLength"
		| "maxLength"
		| "rows"
		| "cols"
	>
>

export type WithIds = {
	id?: string
	describedById?: string
	labelId?: string
}

export type FieldAria = {
	"aria-invalid"?: boolean
	"aria-required"?: boolean
	"aria-describedby"?: string
}
