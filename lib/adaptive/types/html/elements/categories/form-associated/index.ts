import type { LabelElement } from "../../forms/label"
import type { LabelableFormAssociatedContent } from "./labelable"
import type { ListedFormAssociatedContent } from "./listed"
import type { ResettableFormAssociatedContent } from "./resettable"
import type { SubmittableFormAssociatedContent } from "./submittable"

export type FormAssociatedContent =
	| LabelableFormAssociatedContent
	| LabelElement
	| ListedFormAssociatedContent
	| ResettableFormAssociatedContent
	| SubmittableFormAssociatedContent
