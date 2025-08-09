import type { AreaElement } from "../embedded/area"
import type { FieldSetElement } from "../forms/fieldset"
import type { FormElement } from "../forms/form"
import type { InputElement } from "../forms/input"
import type { BlockquoteElement } from "../grouping/blockquote"
import type { DivisionElement } from "../grouping/div"
import type { DescriptionListElement } from "../grouping/dl"
import type { FigureElement } from "../grouping/figure"
import type { HorizontalRuleElement } from "../grouping/hr"
import type { MainElement } from "../grouping/main"
import type { MenuElement } from "../grouping/menu"
import type { OrderedListElement } from "../grouping/ol"
import type { ParagraphElement } from "../grouping/p"
import type { PreformattedTextElement } from "../grouping/pre"
import type { SearchElement } from "../grouping/search"
import type { UnorderedListElement } from "../grouping/ul"
import type { DetailsElement } from "../interactive/details"
import type { DialogElement } from "../interactive/dialog"
import type { AddressElement } from "../sections/address"
import type { ArticleElement } from "../sections/article"
import type { AsideElement } from "../sections/aside"
import type { FooterElement } from "../sections/footer"
import type { HeaderElement } from "../sections/header"
import type { NavigationElement } from "../sections/nav"
import type { SectionElement } from "../sections/section"
import type { TableElement } from "../tabular/table"
import type { HeadingContent } from "./heading"
import type { PhrasingContent } from "./phrasing"

export type FlowContent =
	| PhrasingContent
	| AddressElement
	| AreaElement // TODO: narrow type (descendant of map)
	| ArticleElement
	| AsideElement
	| BlockquoteElement
	| DescriptionListElement
	| DetailsElement
	| DialogElement
	| DivisionElement
	| FieldSetElement
	| FigureElement
	| FooterElement
	| FormElement
	| HeaderElement
	| HeadingContent
	| HorizontalRuleElement
	| InputElement
	| MainElement
	| MenuElement
	| NavigationElement
	| OrderedListElement
	| ParagraphElement
	| PreformattedTextElement
	| SearchElement
	| SectionElement
	| TableElement
	| UnorderedListElement
