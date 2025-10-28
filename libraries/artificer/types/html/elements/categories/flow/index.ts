import type { AreaElement } from "../../embedded/area/index.ts"
import type { FieldSetElement } from "../../forms/fieldset/index.ts"
import type { FormElement } from "../../forms/form/index.ts"
import type { InputElement } from "../../forms/input/index.ts"
import type { BlockquoteElement } from "../../grouping/blockquote/index.ts"
import type { DivisionElement } from "../../grouping/div/index.ts"
import type { DescriptionListElement } from "../../grouping/dl/index.ts"
import type { FigureElement } from "../../grouping/figure/index.ts"
import type { HorizontalRuleElement } from "../../grouping/hr/index.ts"
import type { MainElement } from "../../grouping/main/index.ts"
import type { MenuElement } from "../../grouping/menu/index.ts"
import type { OrderedListElement } from "../../grouping/ol/index.ts"
import type { ParagraphElement } from "../../grouping/p/index.ts"
import type { PreformattedTextElement } from "../../grouping/pre/index.ts"
import type { SearchElement } from "../../grouping/search/index.ts"
import type { UnorderedListElement } from "../../grouping/ul/index.ts"
import type { DetailsElement } from "../../interactive/details/index.ts"
import type { DialogElement } from "../../interactive/dialog/index.ts"
import type { AddressElement } from "../../sections/address/index.ts"
import type { ArticleElement } from "../../sections/article/index.ts"
import type { AsideElement } from "../../sections/aside/index.ts"
import type { FooterElement } from "../../sections/footer/index.ts"
import type { HeaderElement } from "../../sections/header/index.ts"
import type { NavigationElement } from "../../sections/nav/index.ts"
import type { SectionElement } from "../../sections/section/index.ts"
import type { TableElement } from "../../tabular/table/index.ts"
import type { HeadingContent } from "../heading/index.ts"
import type { PhrasingContent } from "../phrasing/index.ts"

export type FlowContent =
	| PhrasingContent
	| AddressElement
	| AreaElement // TODO(@chasm): narrow type (descendant of map)
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
