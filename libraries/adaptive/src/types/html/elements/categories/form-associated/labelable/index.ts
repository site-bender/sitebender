import type { ButtonElement } from "../../../forms/button/index.ts"
import type { HiddenInputElement } from "../../../forms/input/hidden/index.ts"
import type { InputElement } from "../../../forms/input/index.ts"
import type { MeterElement } from "../../../forms/meter/index.ts"
import type { OutputElement } from "../../../forms/output/index.ts"
import type { ProgressElement } from "../../../forms/progress/index.ts"
import type { SelectElement } from "../../../forms/select/index.ts"
import type { TextAreaElement } from "../../../forms/textarea/index.ts"

export type LabelableFormAssociatedContent =
	| ButtonElement
	| Exclude<InputElement, HiddenInputElement>
	| MeterElement
	| OutputElement
	| ProgressElement
	| SelectElement
	| TextAreaElement
