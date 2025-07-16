export type Align = "left" | "right" | "center"

export type AnchorTarget =
	| "_self"
	| "_blank"
	| "_parent"
	| "_top"
	| string

export type Autocapitalize =
	| "off"
	| "none"
	| "on"
	| "sentences"
	| "words"
	| "characters"

export type ButtonType = "submit" | "reset" | "button"

export type ContentEditable = boolean | "true" | "false" | "plaintext-only" | ""

export type CrossOrigin = "anonymous" | "use-credentials"

export type Dir = "ltr" | "rtl" | "auto"

export type Draggable = boolean | "true" | "false" | ""

export type EnterKeyHint =
	| "enter"
	| "done"
	| "go"
	| "next"
	| "previous"
	| "search"
	| "send"

export type FormEncType =
	| "application/x-www-form-urlencoded"
	| "multipart/form-data"
	| "text/plain"

export type FormMethod = "get" | "post" | "dialog"

export type Hidden = boolean | "hidden" | "until-found"

export type InputMode =
	| "none"
	| "text"
	| "tel"
	| "url"
	| "email"
	| "numeric"
	| "decimal"
	| "search"

export type Loading = "eager" | "lazy"

export type Popover = boolean | "auto" | "manual"

export type Preload = "none" | "metadata" | "auto"

export type ReferrerPolicy =
	| "no-referrer-when-downgrade"
	| "no-referrer"
	| "origin-when-cross-origin"
	| "origin"
	| "same-origin"
	| "strict-origin-when-cross-origin"
	| "strict-origin"
	| "unsafe-url"

export type SpellCheck = boolean | "true" | "false" | ""

export type YesNo = "yes" | "no"

// ---------- Complete GlobalAttributes ----------
export type GlobalAttributes = {
	accessKey?: string
	autocapitalize?: Autocapitalize
	class?: string
	contentEditable?: ContentEditable
	dir?: Dir
	draggable?: Draggable
	enterKeyHint?: EnterKeyHint
	exportParts?: string
	hidden?: Hidden
	id?: string
	inert?: boolean
	inputMode?: InputMode
	is?: string
	itemId?: string
	itemProp?: string
	itemRef?: string
	itemScope?: boolean
	itemType?: string
	lang?: string
	nonce?: string
	part?: string
	popover?: Popover
	slot?: string
	spellCheck?: SpellCheck
	style?: string
	tabIndex?: number
	title?: string
	translate?: YesNo
}

/* +++++ Document Structure +++++ */

// HTML
export type HtmlAttributes = GlobalAttributes & {
	manifest?: string
	xmlns?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// HEAD
export type HeadAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// BODY
export type BodyAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

/* +++++ Embedded Content +++++ */

// AUDIO
export type AudioAttributes = GlobalAttributes & {
	autoplay?: boolean
	controls?: boolean
	crossOrigin?: CrossOrigin
	loop?: boolean
	muted?: boolean
	preload?: Preload
	src?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "audio"
}

// CANVAS
export type CanvasAttributes = GlobalAttributes & {
	height?: number
	width?: number

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "img" | "graphics-document" | "application"
}

// EMBED
export type EmbedAttributes = GlobalAttributes & {
	height?: number
	src?: string
	type?: string
	width?: number

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "application" | "document"
}

// IFRAME
export type InlineFrameAttributes = GlobalAttributes & {
	allow?: string
	allowFullScreen?: boolean
	csp?: string
	height?: number
	name?: string
	referrerPolicy?: ReferrerPolicy
	sandbox?: string
	src?: string
	srcDoc?: string
	width?: number

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "document" | "application"
}

// IMG
export type ImageAttributes = GlobalAttributes & {
	alt: string
	crossOrigin?: CrossOrigin
	decode?: "async" | "sync" | "auto"
	fetchPriority?: "high" | "low" | "auto"
	height?: number
	isMap?: boolean
	loading?: Loading
	referrerPolicy?: ReferrerPolicy
	sizes?: string
	src: string
	srcSet?: string
	useMap?: string
	width?: number

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "img" | "presentation" | "none"
}

// OBJECT
export type ObjectAttributes = GlobalAttributes & {
	data?: string
	height?: number
	name?: string
	type?: string
	useMap?: string
	width?: number

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "application" | "document"
}

// PICTURE
export type PictureAttributes = GlobalAttributes & {
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "img" | "presentation" | "none"
}

// SOURCE
export type SourceAttributes = GlobalAttributes & {
	src?: string
	srcSet?: string
	sizes?: string
	type?: string
	media?: string
	width?: number
	height?: number

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// VIDEO
export type VideoAttributes = GlobalAttributes & {
	autoplay?: boolean
	controls?: boolean
	crossOrigin?: CrossOrigin
	disablePictureInPicture?: boolean
	disableRemotePlayback?: boolean
	height?: number
	loop?: boolean
	muted?: boolean
	playsInline?: boolean
	poster?: string
	preload?: Preload
	src?: string
	width?: number

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "video"
}

// TRACK
export type TrackAttributes = GlobalAttributes & {
	default?: boolean
	kind?: "subtitles" | "captions" | "descriptions" | "chapters" | "metadata"
	label?: string
	src: string
	srcLang?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

/* +++++ Form Elements +++++ */

// FIELDSET
export type FieldSetAttributes = GlobalAttributes & {
	disabled?: boolean
	form?: string
	name?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "group"
}

// LEGEND
export type LegendAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// METER
export type MeterAttributes = GlobalAttributes & {
	form?: string
	high?: number
	low?: number
	max?: number
	min?: number
	optimum?: number
	value: number

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "meter"
}

// OUTPUT
export type OutputAttributes = GlobalAttributes & {
	form?: string
	for?: string
	name?: string
	value?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "status" | "alert" | "log"
}

// PROGRESS
export type ProgressAttributes = GlobalAttributes & {
	max?: number
	value?: number

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "progressbar"
}

/* +++++ Heading Elements +++++ */

// H1, H2, H3, H4, H5, H6
export type HeadingAttributes = GlobalAttributes & {
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "heading" | "tab" | "presentation" | "none"
}

// HGROUP
export type HeadingGroupAttributes = GlobalAttributes & {
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "group"
}

/* +++++ Interactive Elements +++++ */

// A
export type AnchorAttributes = GlobalAttributes & {
	href?: string
	target?: AnchorTarget
	download?: string | boolean
	ping?: string
	rel?: string
	hrefLang?: string
	type?: string
	referrerPolicy?: ReferrerPolicy

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "link" | "button" | "presentation" | "none"
}

// BUTTON
export type ButtonAttributes = GlobalAttributes & {
	autofocus?: boolean
	disabled?: boolean
	form?: string
	formAction?: string
	formEncType?: FormEncType
	formMethod?: FormMethod
	formNoValidate?: boolean
	formTarget?: string
	name?: string
	popoverTarget?: string
	popoverTargetAction?: "hide" | "show" | "toggle"
	type?: ButtonType
	value?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-pressed"?: boolean
	"aria-expanded"?: boolean
	"aria-hidden"?: boolean
	role?: "button" | "switch" | "tab" | "menuitem" | "checkbox" | "radio"
}

// DETAILS
export type DetailsAttributes = GlobalAttributes & {
	open?: boolean

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "group"
}

// SUMMARY
export type SummaryAttributes = GlobalAttributes & {
	// No attributes specific to summary beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "button" | "presentation" | "none"
}

// LABEL
export type LabelAttributes = GlobalAttributes & {
	for?: string
	form?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// SELECT
export type SelectAttributes = GlobalAttributes & {
	autocomplete?: string
	autofocus?: boolean
	disabled?: boolean
	form?: string
	multiple?: boolean
	name?: string
	required?: boolean
	size?: number

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "listbox"
}

// OPTION
export type OptionAttributes = GlobalAttributes & {
	disabled?: boolean
	label?: string
	selected?: boolean
	value?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "option"
}

// OPTGROUP
export type OptionGroupAttributes = GlobalAttributes & {
	disabled?: boolean
	label: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "group"
}

// TEXTAREA
export type TextAreaAttributes = GlobalAttributes & {
	autocomplete?: string
	autofocus?: boolean
	cols?: number
	dirName?: string
	disabled?: boolean
	form?: string
	maxLength?: number
	minLength?: number
	name?: string
	placeholder?: string
	readOnly?: boolean
	required?: boolean
	rows?: number
	wrap?: "soft" | "hard"

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "textbox"
}

/* +++++ Metadata Content +++++ */

// LINK
export type LinkAttributes = GlobalAttributes & {
	href?: string
	rel?: string
	as?: string
	crossOrigin?: CrossOrigin
	hrefLang?: string
	type?: string
	media?: string
	sizes?: string
	title?: string
	referrerPolicy?: ReferrerPolicy

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// META
export type MetaAttributes = GlobalAttributes & {
	charSet?: string
	content?: string
	httpEquiv?: string
	name?: string
	media?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// NOSCRIPT
export type NoScriptAttributes = GlobalAttributes & {
	// no element-specific attributes

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// SCRIPT
export type ScriptAttributes = GlobalAttributes & {
	async?: boolean
	defer?: boolean
	crossOrigin?: CrossOrigin
	nonce?: string
	referrerPolicy?: ReferrerPolicy
	src?: string
	type?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// TITLE
export type TitleAttributes = GlobalAttributes & {
	// no element-specific attributes

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// BASE
export type BaseAttributes = GlobalAttributes & {
	href?: string
	target?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// STYLE
export type StyleAttributes = GlobalAttributes & {
	media?: string
	type?: string
	nonce?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

/* +++++ Phrasing Elements +++++ */

// ABBR
export type AbbreviationAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// AREA
export type AreaAttributes = GlobalAttributes & {
	alt: string
	coords?: string
	download?: string | boolean
	href?: string
	hrefLang?: string
	ping?: string
	referrerPolicy?: ReferrerPolicy
	rel?: string
	shape?: "rect" | "circle" | "poly" | "default"
	target?: AnchorTarget
	type?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "link" | "button" | "presentation" | "none"
}

// B
export type BringAttentionToAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// BDI
export type BidirectionalIsolateAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// BDO
export type BidirectionalOverrideAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// BR
export type BreakAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "presentation" | "none"
}

// CITE
export type CitationAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// CODE
export type CodeAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// DATA
export type DataAttributes = GlobalAttributes & {
	value: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// DATALIST
export type DataListAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "listbox"
}

// DL
export type DescriptionListAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "list"
}

// DT
export type DescriptionTermAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// DD
export type DescriptionDetailsAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// DEL
export type DeleteAttributes = GlobalAttributes & {
	cite?: string
	dateTime?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// DFN
export type DefinitionAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// EM
export type EmphasisAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// I
export type IdiomaticTextAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// INS
export type InsertAttributes = GlobalAttributes & {
	cite?: string
	dateTime?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// KBD
export type KeyboardAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// MAP
export type MapAttributes = GlobalAttributes & {
	name: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// MARK
export type MarkAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// Q
export type QuoteAttributes = GlobalAttributes & {
	cite?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// RUBY
export type RubyAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// RT
export type RubyTextAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// RP
export type RubyParenthesesAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// S
export type StrikethroughAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// SAMP
export type SampleAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// SLOT
export type SlotAttributes = GlobalAttributes & {
	name?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// SMALL
export type SideCommentAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// SPAN
export type GenericContainerAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// STRONG
export type StrongAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// SUB
export type SubscriptAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// SUP
export type SuperscriptAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// TEMPLATE
export type TemplateAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global
	// Note: Template elements are not rendered and don't participate in accessibility tree
}

// TIME
export type TimeAttributes = GlobalAttributes & {
	dateTime?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// U
export type UnarticudatedAnnotationAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// VAR
export type VariableAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// WBR
export type LineBreakOpportunityAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "presentation" | "none"
}

/* +++++ Sectioning Content +++++ */

// ARTICLE
export type ArticleAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "article" | "document" | "main" | "region"
}

// ASIDE
export type AsideAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "complementary" | "banner" | "contentinfo" | "navigation" | "region"
}

// NAV
export type NavigationAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "navigation" | "menu" | "menubar" | "tablist"
}

// SECTION
export type SectionAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "region" | "group" | "main" | "banner" | "contentinfo"
}

/* +++++ Miscellaneous Flow Elements +++++ */

// ADDRESS
export type AddressAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// BLOCKQUOTE
export type BlockquoteAttributes = GlobalAttributes & {
	cite?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// DIALOG
export type DialogAttributes = GlobalAttributes & {
	open?: boolean

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "dialog" | "alertdialog"
}

// DIV
export type DivisionAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// FIGURE
export type FigureAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "figure" | "img"
}

// FIGCAPTION
export type FigcaptionAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// FOOTER
export type FooterAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "contentinfo" | "group"
}

// FORM
export type FormAttributes = GlobalAttributes & {
	acceptCharset?: string
	action?: string
	autocomplete?: "on" | "off"
	encType?: FormEncType
	method?: FormMethod
	name?: string
	noValidate?: boolean
	rel?: string
	target?: AnchorTarget

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "form" | "search"
}

// HEADER
export type HeaderAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "banner" | "group"
}

// HR
export type HorizontalRuleAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "separator" | "presentation" | "none"
}

// LI
export type ListItemAttributes = GlobalAttributes & {
	value?: number

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "listitem"
}

// MAIN
export type MainAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "main"
}

// MENU
export type MenuAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "menu" | "menubar" | "list"
}

// OL
export type OrderedListAttributes = GlobalAttributes & {
	reversed?: boolean
	start?: number
	type?: "1" | "a" | "A" | "i" | "I"

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "list"
}

// P
export type ParagraphAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// PRE
export type PreformattedAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// SEARCH
export type SearchAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "search"
}

// UL
export type UnorderedListAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "list"
}

// TABLE
export type TableAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "table" | "grid" | "treegrid"
}

// CAPTION
export type TableCaptionAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "caption"
}

// COL
export type ColumnAttributes = GlobalAttributes & {
	span?: number

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "columnheader"
}

// COLGROUP
export type ColumnGroupAttributes = GlobalAttributes & {
	span?: number

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "columnheader"
}

// TBODY
export type TableBodyAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "rowgroup"
}

// TD
export type TableDataAttributes = GlobalAttributes & {
	colSpan?: number
	rowSpan?: number
	headers?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "cell" | "gridcell"
}

// TFOOT
export type TableFootAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "rowgroup"
}

// TH
export type TableHeaderAttributes = GlobalAttributes & {
	abbr?: string
	colSpan?: number
	headers?: string
	rowSpan?: number
	scope?: "row" | "col" | "rowgroup" | "colgroup"

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "columnheader" | "rowheader"
}

// THEAD
export type TableHeadAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "rowgroup"
}

// TR
export type TableRowAttributes = GlobalAttributes & {
	// No element-specific attributes beyond global

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "row"
}

/* +++++ Input Elements +++++ */

// INPUT type="button"
export type InputButtonAttributes = GlobalAttributes & {
	type: "button"
	autofocus?: boolean
	disabled?: boolean
	form?: string
	name?: string
	value?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-pressed"?: boolean
	"aria-expanded"?: boolean
	"aria-hidden"?: boolean
	role?: "button"
}

// INPUT type="checkbox"
export type InputCheckboxAttributes = GlobalAttributes & {
	type: "checkbox"
	autofocus?: boolean
	checked?: boolean
	disabled?: boolean
	form?: string
	name?: string
	required?: boolean
	value?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-checked"?: boolean
	"aria-hidden"?: boolean
	role?: "checkbox"
}

// INPUT type="color"
export type InputColorAttributes = GlobalAttributes & {
	type: "color"
	autocomplete?: string
	autofocus?: boolean
	disabled?: boolean
	form?: string
	list?: string
	name?: string
	value?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// INPUT type="date"
export type InputDateAttributes = GlobalAttributes & {
	type: "date"
	autocomplete?: string
	autofocus?: boolean
	disabled?: boolean
	form?: string
	list?: string
	max?: string
	min?: string
	name?: string
	readOnly?: boolean
	required?: boolean
	step?: string | number
	value?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// INPUT type="datetime-local"
export type InputDateTimeLocalAttributes = GlobalAttributes & {
	type: "datetime-local"
	autocomplete?: string
	autofocus?: boolean
	disabled?: boolean
	form?: string
	list?: string
	max?: string
	min?: string
	name?: string
	readOnly?: boolean
	required?: boolean
	step?: string | number
	value?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// INPUT type="email"
export type InputEmailAttributes = GlobalAttributes & {
	type: "email"
	autocomplete?: string
	autofocus?: boolean
	disabled?: boolean
	form?: string
	list?: string
	maxLength?: number
	minLength?: number
	multiple?: boolean
	name?: string
	pattern?: string
	placeholder?: string
	readOnly?: boolean
	required?: boolean
	size?: number
	value?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "textbox"
}

// INPUT type="file"
export type InputFileAttributes = GlobalAttributes & {
	type: "file"
	accept?: string
	autofocus?: boolean
	disabled?: boolean
	form?: string
	multiple?: boolean
	name?: string
	required?: boolean

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// INPUT type="hidden"
export type InputHiddenAttributes = GlobalAttributes & {
	type: "hidden"
	form?: string
	name?: string
	value?: string
	// No ARIA attributes for hidden inputs
}

// INPUT type="image"
export type InputImageAttributes = GlobalAttributes & {
	type: "image"
	alt: string
	autofocus?: boolean
	disabled?: boolean
	form?: string
	formAction?: string
	formEncType?: FormEncType
	formMethod?: FormMethod
	formNoValidate?: boolean
	formTarget?: string
	height?: number
	name?: string
	src: string
	width?: number

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "button"
}

// INPUT type="month"
export type InputMonthAttributes = GlobalAttributes & {
	type: "month"
	autocomplete?: string
	autofocus?: boolean
	disabled?: boolean
	form?: string
	list?: string
	max?: string
	min?: string
	name?: string
	readOnly?: boolean
	required?: boolean
	step?: string | number
	value?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// INPUT type="number"
export type InputNumberAttributes = GlobalAttributes & {
	type: "number"
	autocomplete?: string
	autofocus?: boolean
	disabled?: boolean
	form?: string
	list?: string
	max?: string | number
	min?: string | number
	name?: string
	placeholder?: string
	readOnly?: boolean
	required?: boolean
	step?: string | number
	value?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "spinbutton"
}

// INPUT type="password"
export type InputPasswordAttributes = GlobalAttributes & {
	type: "password"
	autocomplete?: string
	autofocus?: boolean
	disabled?: boolean
	form?: string
	maxLength?: number
	minLength?: number
	name?: string
	pattern?: string
	placeholder?: string
	readOnly?: boolean
	required?: boolean
	size?: number
	value?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "textbox"
}

// INPUT type="radio"
export type InputRadioAttributes = GlobalAttributes & {
	type: "radio"
	autofocus?: boolean
	checked?: boolean
	disabled?: boolean
	form?: string
	name?: string
	required?: boolean
	value?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-checked"?: boolean
	"aria-hidden"?: boolean
	role?: "radio"
}

// INPUT type="range"
export type InputRangeAttributes = GlobalAttributes & {
	type: "range"
	autocomplete?: string
	autofocus?: boolean
	disabled?: boolean
	form?: string
	list?: string
	max?: string | number
	min?: string | number
	name?: string
	step?: string | number
	value?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-valuemin"?: number
	"aria-valuemax"?: number
	"aria-valuenow"?: number
	"aria-valuetext"?: string
	"aria-hidden"?: boolean
	role?: "slider"
}

// INPUT type="reset"
export type InputResetAttributes = GlobalAttributes & {
	type: "reset"
	autofocus?: boolean
	disabled?: boolean
	form?: string
	name?: string
	value?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "button"
}

// INPUT type="search"
export type InputSearchAttributes = GlobalAttributes & {
	type: "search"
	autocomplete?: string
	autofocus?: boolean
	disabled?: boolean
	form?: string
	list?: string
	maxLength?: number
	minLength?: number
	name?: string
	pattern?: string
	placeholder?: string
	readOnly?: boolean
	required?: boolean
	size?: number
	value?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "searchbox"
}

// INPUT type="submit"
export type InputSubmitAttributes = GlobalAttributes & {
	type: "submit"
	autofocus?: boolean
	disabled?: boolean
	form?: string
	formAction?: string
	formEncType?: FormEncType
	formMethod?: FormMethod
	formNoValidate?: boolean
	formTarget?: string
	name?: string
	value?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "button"
}

// INPUT type="tel"
export type InputTelAttributes = GlobalAttributes & {
	type: "tel"
	autocomplete?: string
	autofocus?: boolean
	disabled?: boolean
	form?: string
	list?: string
	maxLength?: number
	minLength?: number
	name?: string
	pattern?: string
	placeholder?: string
	readOnly?: boolean
	required?: boolean
	size?: number
	value?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "textbox"
}

// INPUT type="text"
export type InputTextAttributes = GlobalAttributes & {
	type: "text"
	autocomplete?: string
	autofocus?: boolean
	disabled?: boolean
	form?: string
	list?: string
	maxLength?: number
	minLength?: number
	name?: string
	pattern?: string
	placeholder?: string
	readOnly?: boolean
	required?: boolean
	size?: number
	value?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "textbox"
}

// INPUT type="time"
export type InputTimeAttributes = GlobalAttributes & {
	type: "time"
	autocomplete?: string
	autofocus?: boolean
	disabled?: boolean
	form?: string
	list?: string
	max?: string
	min?: string
	name?: string
	readOnly?: boolean
	required?: boolean
	step?: string | number
	value?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// INPUT type="url"
export type InputUrlAttributes = GlobalAttributes & {
	type: "url"
	autocomplete?: string
	autofocus?: boolean
	disabled?: boolean
	form?: string
	list?: string
	maxLength?: number
	minLength?: number
	name?: string
	pattern?: string
	placeholder?: string
	readOnly?: boolean
	required?: boolean
	size?: number
	value?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: "textbox"
}

// INPUT type="week"
export type InputWeekAttributes = GlobalAttributes & {
	type: "week"
	autocomplete?: string
	autofocus?: boolean
	disabled?: boolean
	form?: string
	list?: string
	max?: string
	min?: string
	name?: string
	readOnly?: boolean
	required?: boolean
	step?: string | number
	value?: string

	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-hidden"?: boolean
	role?: string
}

// Map element names to their attribute types
export type ElementAttributeMap = {
	a: AnchorAttributes
	abbr: AbbreviationAttributes
	address: AddressAttributes
	area: AreaAttributes
	article: ArticleAttributes
	aside: AsideAttributes
	audio: AudioAttributes
	b: BringAttentionToAttributes
	base: BaseAttributes
	bdi: BidirectionalIsolateAttributes
	bdo: BidirectionalOverrideAttributes
	blockquote: BlockquoteAttributes
	body: BodyAttributes
	br: BreakAttributes
	button: ButtonAttributes
	canvas: CanvasAttributes
	caption: CaptionAttributes
	cite: CiteAttributes
	code: CodeAttributes
	col: ColumnAttributes
	colgroup: ColumnGroupAttributes
	data: DataAttributes
	datalist: DataListAttributes
	dd: DescriptionDetailsAttributes
	del: DeleteAttributes
	details: DetailsAttributes
	dfn: DefinitionAttributes
	dialog: DialogAttributes
	div: DivisionAttributes
	dl: DescriptionListAttributes
	dt: DescriptionTermAttributes
	em: EmphasisAttributes
	embed: EmbedAttributes
	fieldset: FieldsetAttributes
	figcaption: FigcaptionAttributes
	figure: FigureAttributes
	footer: FooterAttributes
	form: FormAttributes
	h1: HeadingAttributes
	h2: HeadingAttributes
	h3: HeadingAttributes
	h4: HeadingAttributes
	h5: HeadingAttributes
	h6: HeadingAttributes
	head: HeadAttributes
	header: HeaderAttributes
	hgroup: HeadingGroupAttributes
	hr: HorizontalRuleAttributes
	html: HtmlAttributes
	i: IdiomaticTextAttributes
	iframe: IFrameAttributes
	img: ImageAttributes
	input: InputAttributes
	ins: InsertAttributes
	kbd: KeyboardAttributes
	label: LabelAttributes
	legend: LegendAttributes
	li: ListItemAttributes
	link: LinkAttributes
	main: MainAttributes
	map: MapAttributes
	mark: MarkAttributes
	meta: MetaAttributes
	meter: MeterAttributes
	nav: NavigationAttributes
	noscript: NoScriptAttributes
	object: ObjectAttributes
	ol: OrderedListAttributes
	optgroup: OptionGroupAttributes
	option: OptionAttributes
	output: OutputAttributes
	p: ParagraphAttributes
	picture: PictureAttributes
	pre: PreformattedAttributes
	progress: ProgressAttributes
	q: QuoteAttributes
	rp: RubyParenthesesAttributes
	rt: RubyTextAttributes
	ruby: RubyAttributes
	s: StrikethroughAttributes
	samp: SampleAttributes
	script: ScriptAttributes
	search: SearchAttributes
	section: SectionAttributes
	select: SelectAttributes
	slot: SlotAttributes
	small: SmallAttributes
	source: SourceAttributes
	span: GenericContainerAttributes
	strong: StrongAttributes
	style: StyleAttributes
	sub: SubscriptAttributes
	summary: SummaryAttributes
	sup: SuperscriptAttributes
	table: TableAttributes
	tbody: TableBodyAttributes
	td: TableDataAttributes
	template: TemplateAttributes
	textarea: TextareaAttributes
	tfoot: TableFootAttributes
	th: TableHeaderAttributes
	thead: TableHeadAttributes
	time: TimeAttributes
	title: TitleAttributes
	tr: TableRowAttributes
	track: TrackAttributes
	u: UnarticulatedAttributes
	ul: UnorderedListAttributes
	var: VariableAttributes
	video: VideoAttributes
	wbr: WordBreakAttributes
}
