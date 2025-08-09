import type { ButtonElement } from "../forms/button"
import type { FieldSetElement } from "../forms/fieldset"
import type { FormElement } from "../forms/form"
import type { SelectElement } from "../forms/select"
import type { BlockquoteElement } from "../grouping/blockquote"
import type { DescriptionListElement } from "../grouping/dl"
import type { FigureElement } from "../grouping/figure"
import type { MainElement } from "../grouping/main"
import type { MenuElement } from "../grouping/menu"
import type { OrderedListElement } from "../grouping/ol"
import type { ParagraphElement } from "../grouping/p"
import type { PreformattedTextElement } from "../grouping/pre"
import type { SearchElement } from "../grouping/search"
import type { UnorderedListElement } from "../grouping/ul"
import type { DetailsElement } from "../interactive/details"
import type { AddressElement } from "../sections/address"
import type { FooterElement } from "../sections/footer"
import type { BreakElement } from "../text-level-semantics/br"
import type { StrikethroughElement } from "../text-level-semantics/s"
import type { SmallElement } from "../text-level-semantics/small"
import type { SpanElement } from "../text-level-semantics/span"
import type { WordBreakOpportunityElement } from "../text-level-semantics/wbr"
import type { TextNode } from "../text-node"
import type { PhrasingContent } from "./phrasing"
import type { SectioningContent } from "./sectioning"

export type PalpableContent =
	| Exclude<
		PhrasingContent,
		| BreakElement
		| SmallElement
		| SpanElement
		| StrikethroughElement
		| TextNode
		| WordBreakOpportunityElement
		| SelectElement
	>
	| SectioningContent
	| AddressElement
	| FooterElement
	| ParagraphElement
	| BlockquoteElement
	| DescriptionListElement // TODO: narrow type
	| FigureElement
	| MainElement
	| MenuElement // TODO: narrow type
	| OrderedListElement // TODO: narrow type
	| UnorderedListElement // TODO: narrow type
	| PreformattedTextElement
	| SearchElement
	| DetailsElement
	| ButtonElement
	| FieldSetElement
	| FormElement
