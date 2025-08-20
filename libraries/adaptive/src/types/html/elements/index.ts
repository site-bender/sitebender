import type { EditsContent } from "./categories/edits/index.ts"
import type { FlowContent } from "./categories/flow/index.ts"
import type { InteractiveContent } from "./categories/interactive/index.ts"
import type { MetadataContent } from "./categories/metadata/index.ts"
import type { SectioningContent } from "./categories/sectioning/index.ts"
import type { HtmlElement } from "./document/html/index.ts"
import type { SourceElement } from "./embedded/source/index.ts"
import type { TrackElement } from "./embedded/track/index.ts"
import type { LegendElement } from "./forms/legend/index.ts"
import type { OptionGroupElement } from "./forms/optgroup/index.ts"
import type { OptionElement } from "./forms/option/index.ts"
import type { Fragment } from "./fragment/index.ts"
import type { DescriptionDetailsElement } from "./grouping/dd/index.ts"
import type { DescriptionTermElement } from "./grouping/dt/index.ts"
import type { FigcaptionElement } from "./grouping/figcaption/index.ts"
import type { ListItemElement } from "./grouping/li/index.ts"
import type { SummaryElement } from "./interactive/summary/index.ts"
import type { HeadElement } from "./metadata/head/index.ts"
import type { BodyElement } from "./sections/body/index.ts"
import type { TableCaptionElement } from "./tabular/caption/index.ts"
import type { TableColumnElement } from "./tabular/col/index.ts"
import type { TableColumnGroupElement } from "./tabular/colgroup/index.ts"
import type { TableBodyElement } from "./tabular/tbody/index.ts"
import type { TableDataCellElement } from "./tabular/td/index.ts"
import type { TableFooterElement } from "./tabular/tfoot/index.ts"
import type { TableHeaderCellElement } from "./tabular/th/index.ts"
import type { TableHeaderElement } from "./tabular/thead/index.ts"
import type { TableRowElement } from "./tabular/tr/index.ts"
import type { RubyFallbackParenthesisElement } from "./text-level-semantics/rp/index.ts"
import type { RubyTextElement } from "./text-level-semantics/rt/index.ts"

export type Element =
	| BodyElement
	| DescriptionDetailsElement
	| DescriptionTermElement
	| EditsContent
	| FigcaptionElement
	| FlowContent
	| Fragment
	| HeadElement
	| HtmlElement
	| InteractiveContent
	| LegendElement
	| ListItemElement
	| MetadataContent
	| OptionElement
	| OptionGroupElement
	| RubyFallbackParenthesisElement
	| RubyTextElement
	| SectioningContent
	| SourceElement
	| SummaryElement
	| TableBodyElement
	| TableCaptionElement
	| TableColumnElement
	| TableColumnGroupElement
	| TableDataCellElement
	| TableFooterElement
	| TableHeaderCellElement
	| TableHeaderElement
	| TableRowElement
	| TrackElement
