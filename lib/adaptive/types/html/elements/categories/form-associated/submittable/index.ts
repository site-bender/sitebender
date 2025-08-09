import type { ObjectElement } from "../../embedded/object"
import type { ButtonElement } from "../../forms/button"
import type { InputElement } from "../../forms/input"
import type { SelectElement } from "../../forms/select"
import type { TextAreaElement } from "../../forms/textarea"

export type SubmittableFormAssociatedContent =
	| ButtonElement
	| InputElement
	| ObjectElement
	| SelectElement
	| TextAreaElement
