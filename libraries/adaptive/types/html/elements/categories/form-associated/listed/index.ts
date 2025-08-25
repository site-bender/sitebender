import type { ObjectElement } from "../../../embedded/object/index.ts"
import type { ButtonElement } from "../../../forms/button/index.ts"
import type { FieldSetElement } from "../../../forms/fieldset/index.ts"
import type { InputElement } from "../../../forms/input/index.ts"
import type { OutputElement } from "../../../forms/output/index.ts"
import type { SelectElement } from "../../../forms/select/index.ts"
import type { TextAreaElement } from "../../../forms/textarea/index.ts"

export type ListedFormAssociatedContent =
	| ButtonElement
	| FieldSetElement
	| InputElement
	| ObjectElement
	| OutputElement
	| SelectElement
	| TextAreaElement
