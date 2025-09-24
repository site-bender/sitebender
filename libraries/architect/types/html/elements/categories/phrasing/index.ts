import type { DeletionElement } from "../../edits/del/index.ts"
import type { InsertionElement } from "../../edits/ins/index.ts"
import type { AreaElement } from "../../embedded/area/index.ts"
import type { AudioElement } from "../../embedded/audio/index.ts"
import type { EmbedElement } from "../../embedded/embed/index.ts"
import type { IFrameElement } from "../../embedded/iframe/index.ts"
import type { ImageElement } from "../../embedded/img/index.ts"
import type { MapElement } from "../../embedded/map/index.ts"
import type { ObjectElement } from "../../embedded/object/index.ts"
import type { PictureElement } from "../../embedded/picture/index.ts"
import type { VideoElement } from "../../embedded/video/index.ts"
import type { ButtonElement } from "../../forms/button/index.ts"
import type { DataListElement } from "../../forms/datalist/index.ts"
import type { InputElement } from "../../forms/input/index.ts"
import type { LabelElement } from "../../forms/label/index.ts"
import type { MeterElement } from "../../forms/meter/index.ts"
import type { OutputElement } from "../../forms/output/index.ts"
import type { ProgressElement } from "../../forms/progress/index.ts"
import type { SelectElement } from "../../forms/select/index.ts"
import type { TextAreaElement } from "../../forms/textarea/index.ts"
import type { Override } from "../../index.ts"
import type { LinkElement } from "../../metadata/link/index.ts"
import type { MetaElement } from "../../metadata/meta/index.ts"
import type { CanvasElement } from "../../scripting/canvas/index.ts"
import type { NoScriptElement } from "../../scripting/noscript/index.ts"
import type { ScriptElement } from "../../scripting/script/index.ts"
import type { SlotElement } from "../../scripting/slot/index.ts"
import type { TemplateElement } from "../../scripting/template/index.ts"
import type { AnchorElement } from "../../text-level-semantics/a/index.ts"
import type { AbbreviationElement } from "../../text-level-semantics/abbr/index.ts"
import type { BringAttentionElement } from "../../text-level-semantics/b/index.ts"
import type { BidirectionalIsolateElement } from "../../text-level-semantics/bdi/index.ts"
import type { BidirectionalTextOverrideElement } from "../../text-level-semantics/bdo/index.ts"
import type { BreakElement } from "../../text-level-semantics/br/index.ts"
import type { CiteElement } from "../../text-level-semantics/cite/index.ts"
import type { CodeElement } from "../../text-level-semantics/code/index.ts"
import type { DataElement } from "../../text-level-semantics/data/index.ts"
import type { DefinitionElement } from "../../text-level-semantics/dfn/index.ts"
import type { EmphasisElement } from "../../text-level-semantics/em/index.ts"
import type { IdiomaticTextElement } from "../../text-level-semantics/i/index.ts"
import type { KeyboardElement } from "../../text-level-semantics/kbd/index.ts"
import type { MarkElement } from "../../text-level-semantics/mark/index.ts"
import type { QuoteElement } from "../../text-level-semantics/q/index.ts"
import type { RubyElement } from "../../text-level-semantics/ruby/index.ts"
import type { StrikethroughElement } from "../../text-level-semantics/s/index.ts"
import type { SampleElement } from "../../text-level-semantics/samp/index.ts"
import type { SmallElement } from "../../text-level-semantics/small/index.ts"
import type { SpanElement } from "../../text-level-semantics/span/index.ts"
import type { StrongEmphasisElement } from "../../text-level-semantics/strong/index.ts"
import type { SubscriptElement } from "../../text-level-semantics/sub/index.ts"
import type { SuperscriptElement } from "../../text-level-semantics/sup/index.ts"
import type { TimeElement } from "../../text-level-semantics/time/index.ts"
import type { UnarticulatedAnnotationElement } from "../../text-level-semantics/u/index.ts"
import type { VariableElement } from "../../text-level-semantics/var/index.ts"
import type { WordBreakOpportunityElement } from "../../text-level-semantics/wbr/index.ts"
import type { TextNode } from "../../text-node/index.ts"

// TODO(@chasm): add Math, Svg

export type PhrasingContent =
	| AbbreviationElement
	| AnchorElement
	| AreaElement // TODO(@chasm): narrow type
	| AudioElement
	| BidirectionalIsolateElement
	| BidirectionalTextOverrideElement
	| BreakElement
	| BringAttentionElement
	| ButtonElement
	| CanvasElement
	| CiteElement
	| CodeElement
	| DataElement
	| DataListElement
	| DefinitionElement
	| DeletionElement // TODO(@chasm): narrow type
	| EmbedElement
	| EmphasisElement
	| IdiomaticTextElement
	| IFrameElement
	| ImageElement
	| InputElement
	| InsertionElement // TODO(@chasm): narrow type
	| KeyboardElement
	| LabelElement
	| Override<LinkElement, { itemprop: string }>
	| MapElement // TODO(@chasm): narrow type
	| MarkElement
	| Override<MetaElement, { itemprop: string }>
	| MeterElement
	| NoScriptElement
	| ObjectElement
	| OutputElement
	| PictureElement
	| ProgressElement
	| QuoteElement
	| RubyElement
	| SampleElement
	| ScriptElement
	| SelectElement
	| SlotElement
	| SmallElement
	| SpanElement
	| StrikethroughElement
	| StrongEmphasisElement
	| SubscriptElement
	| SuperscriptElement
	| TemplateElement
	| TextAreaElement
	| TextNode
	| TextNode
	| TimeElement
	| UnarticulatedAnnotationElement
	| VariableElement
	| VideoElement
	| WordBreakOpportunityElement
