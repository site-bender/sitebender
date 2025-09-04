import type { ButtonElement } from "../../forms/button/index.ts"
import type { FieldSetElement } from "../../forms/fieldset/index.ts"
import type { FormElement } from "../../forms/form/index.ts"
import type { SelectElement } from "../../forms/select/index.ts"
import type { BlockquoteElement } from "../../grouping/blockquote/index.ts"
import type { DescriptionListElement } from "../../grouping/dl/index.ts"
import type { FigureElement } from "../../grouping/figure/index.ts"
import type { MainElement } from "../../grouping/main/index.ts"
import type { MenuElement } from "../../grouping/menu/index.ts"
import type { OrderedListElement } from "../../grouping/ol/index.ts"
import type { ParagraphElement } from "../../grouping/p/index.ts"
import type { PreformattedTextElement } from "../../grouping/pre/index.ts"
import type { SearchElement } from "../../grouping/search/index.ts"
import type { UnorderedListElement } from "../../grouping/ul/index.ts"
import type { DetailsElement } from "../../interactive/details/index.ts"
import type { AddressElement } from "../../sections/address/index.ts"
import type { FooterElement } from "../../sections/footer/index.ts"
import type { BreakElement } from "../../text-level-semantics/br/index.ts"
import type { StrikethroughElement } from "../../text-level-semantics/s/index.ts"
import type { SmallElement } from "../../text-level-semantics/small/index.ts"
import type { SpanElement } from "../../text-level-semantics/span/index.ts"
import type { WordBreakOpportunityElement } from "../../text-level-semantics/wbr/index.ts"
import type { TextNode } from "../../text-node/index.ts"
import type { PhrasingContent } from "../phrasing/index.ts"
import type { SectioningContent } from "../sectioning/index.ts"

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
	| DescriptionListElement // TODO(@chasm): narrow type
	| FigureElement
	| MainElement
	| MenuElement // TODO(@chasm): narrow type
	| OrderedListElement // TODO(@chasm): narrow type
	| UnorderedListElement // TODO(@chasm): narrow type
	| PreformattedTextElement
	| SearchElement
	| DetailsElement
	| ButtonElement
	| FieldSetElement
	| FormElement
