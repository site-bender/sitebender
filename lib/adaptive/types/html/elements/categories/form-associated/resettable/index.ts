import type { InputElement } from "../../forms/input"
import type { OutputElement } from "../../forms/output"
import type { SelectElement } from "../../forms/select"
import type { TextAreaElement } from "../../forms/textarea"

export type ResettableFormAssociatedContent =
	| InputElement
	| OutputElement
	| SelectElement
	| TextAreaElement
