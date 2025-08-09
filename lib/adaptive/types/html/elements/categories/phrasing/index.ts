import type { Override } from "../../shared"
import type { DeletionElement } from "../edits/del"
import type { InsertionElement } from "../edits/ins"
import type { AreaElement } from "../embedded/area"
import type { AudioElement } from "../embedded/audio"
import type { EmbedElement } from "../embedded/embed"
import type { IFrameElement } from "../embedded/iframe"
import type { ImageElement } from "../embedded/img"
import type { MapElement } from "../embedded/map"
import type { ObjectElement } from "../embedded/object"
import type { PictureElement } from "../embedded/picture"
import type { VideoElement } from "../embedded/video"
import type { ButtonElement } from "../forms/button"
import type { DataListElement } from "../forms/datalist"
import type { InputElement } from "../forms/input"
import type { LabelElement } from "../forms/label"
import type { MeterElement } from "../forms/meter"
import type { OutputElement } from "../forms/output"
import type { ProgressElement } from "../forms/progress"
import type { SelectElement } from "../forms/select"
import type { TextAreaElement } from "../forms/textarea"
import type { LinkElement } from "../metadata/link"
import type { MetaElement } from "../metadata/meta"
import type { CanvasElement } from "../scripting/canvas"
import type { NoScriptElement } from "../scripting/noscript"
import type { ScriptElement } from "../scripting/script"
import type { SlotElement } from "../scripting/slot"
import type { TemplateElement } from "../scripting/template"
import type { AnchorElement } from "../text-level-semantics/a"
import type { AbbreviationElement } from "../text-level-semantics/abbr"
import type { BringAttentionElement } from "../text-level-semantics/b"
import type { BidirectionalIsolateElement } from "../text-level-semantics/bdi"
import type { BidirectionalTextOverrideElement } from "../text-level-semantics/bdo"
import type { BreakElement } from "../text-level-semantics/br"
import type { CiteElement } from "../text-level-semantics/cite"
import type { CodeElement } from "../text-level-semantics/code"
import type { DataElement } from "../text-level-semantics/data"
import type { DefinitionElement } from "../text-level-semantics/dfn"
import type { EmphasisElement } from "../text-level-semantics/em"
import type { IdiomaticTextElement } from "../text-level-semantics/i"
import type { KeyboardElement } from "../text-level-semantics/kbd"
import type { MarkElement } from "../text-level-semantics/mark"
import type { QuoteElement } from "../text-level-semantics/q"
import type { RubyElement } from "../text-level-semantics/ruby"
import type { StrikethroughElement } from "../text-level-semantics/s"
import type { SampleElement } from "../text-level-semantics/samp"
import type { SmallElement } from "../text-level-semantics/small"
import type { SpanElement } from "../text-level-semantics/span"
import type { StrongEmphasisElement } from "../text-level-semantics/strong"
import type { SubscriptElement } from "../text-level-semantics/sub"
import type { SuperscriptElement } from "../text-level-semantics/sup"
import type { TimeElement } from "../text-level-semantics/time"
import type { UnarticulatedAnnotationElement } from "../text-level-semantics/u"
import type { VariableElement } from "../text-level-semantics/var"
import type { WordBreakOpportunityElement } from "../text-level-semantics/wbr"
import type { TextNode } from "../text-node"

// TODO: add Math, Svg

export type PhrasingContent =
	| AbbreviationElement
	| AnchorElement
	| AreaElement // TODO: narrow type
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
	| DeletionElement // TODO: narrow type
	| EmbedElement
	| EmphasisElement
	| IdiomaticTextElement
	| IFrameElement
	| ImageElement
	| InputElement
	| InsertionElement // TODO: narrow type
	| KeyboardElement
	| LabelElement
	| Override<LinkElement, { itemprop: string }>
	| MapElement // TODO: narrow type
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
