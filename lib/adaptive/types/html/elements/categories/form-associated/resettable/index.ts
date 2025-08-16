import type { InputElement } from "../../../forms/input/index.ts"
import type { OutputElement } from "../../../forms/output/index.ts"
import type { SelectElement } from "../../../forms/select/index.ts"
import type { TextAreaElement } from "../../../forms/textarea/index.ts"

export type ResettableFormAssociatedContent =
	| InputElement
	| OutputElement
	| SelectElement
	| TextAreaElement
