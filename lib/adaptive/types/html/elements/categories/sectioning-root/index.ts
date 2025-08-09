import type { FieldSetElement } from "../forms/fieldset"
import type { BlockquoteElement } from "../grouping/blockquote"
import type { DetailsElement } from "../interactive/details"
import type { DialogElement } from "../interactive/dialog"
import type { TableDataCellElement } from "../tabular/td"

export type SectioningRootContent =
	| BlockquoteElement
	| DetailsElement
	| DialogElement
	| FieldSetElement
	| TableDataCellElement
