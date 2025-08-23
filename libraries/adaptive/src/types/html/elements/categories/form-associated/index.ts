import type { LabelElement } from "../../forms/label/index.ts"
import type { LabelableFormAssociatedContent } from "./labelable/index.ts"
import type { ListedFormAssociatedContent } from "./listed/index.ts"
import type { ResettableFormAssociatedContent } from "./resettable/index.ts"
import type { SubmittableFormAssociatedContent } from "./submittable/index.ts"

export type FormAssociatedContent =
	| LabelableFormAssociatedContent
	| LabelElement
	| ListedFormAssociatedContent
	| ResettableFormAssociatedContent
	| SubmittableFormAssociatedContent
