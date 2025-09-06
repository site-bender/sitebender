import * as forms from "../../src/interact/forms/index.ts"

// Export a simple object so the file has side effects and satisfies noUnusedLocals
export const formsBarrelsSmoke = {
	hasForm: typeof forms.Form === "function",
	hasField: typeof forms.Field === "function",
	hasFieldSet: typeof forms.FieldSet === "function",
	hasNamespaces: typeof forms.elements === "object" &&
		typeof forms.fields === "object" && typeof forms.composites === "object" &&
		typeof forms.recipes === "object",
	spotCheck: typeof forms.elements.Input === "function" &&
		typeof forms.fields.EmailAddressField === "function",
}
