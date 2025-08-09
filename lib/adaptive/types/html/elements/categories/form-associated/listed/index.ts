import type { ObjectElement } from "../../embedded/object"
import type { ButtonElement } from "../../forms/button"
import type { FieldSetElement } from "../../forms/fieldset"
import type { InputElement } from "../../forms/input"
import type { OutputElement } from "../../forms/output"
import type { SelectElement } from "../../forms/select"
import type { TextAreaElement } from "../../forms/textarea"

export type ListedFormAssociatedContent =
	| ButtonElement
	| FieldSetElement
	| InputElement
	| ObjectElement
	| OutputElement
	| SelectElement
	| TextAreaElement
