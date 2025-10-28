import type { FieldSetElement } from "../../forms/fieldset/index.ts"
import type { BlockquoteElement } from "../../grouping/blockquote/index.ts"
import type { DetailsElement } from "../../interactive/details/index.ts"
import type { DialogElement } from "../../interactive/dialog/index.ts"
import type { TableDataCellElement } from "../../tabular/td/index.ts"

export type SectioningRootContent =
	| BlockquoteElement
	| DetailsElement
	| DialogElement
	| FieldSetElement
	| TableDataCellElement
