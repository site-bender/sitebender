import type { ButtonElement } from "../../forms/button"
import type { InputElement } from "../../forms/input"
import type { HiddenInputElement } from "../../forms/input/hidden"
import type { MeterElement } from "../../forms/meter"
import type { OutputElement } from "../../forms/output"
import type { ProgressElement } from "../../forms/progress"
import type { SelectElement } from "../../forms/select"
import type { TextAreaElement } from "../../forms/textarea"

export type LabelableFormAssociatedContent =
	| ButtonElement
	| Exclude<InputElement, HiddenInputElement>
	| MeterElement
	| OutputElement
	| ProgressElement
	| SelectElement
	| TextAreaElement
