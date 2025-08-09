import type { NumericOperation } from "@sitebender/operations/lib/types"

import type { Either } from "../../fp/either/index.ts"
import type { Option } from "../../fp/option/index.ts"
import type { Element } from "./elements"
import type { LinkElement } from "./elements/metadata/link"
import type { ScriptElement } from "./elements/scripting/script"

export type Override<T1, T2> = Omit<T1, keyof T2> & T2

export type DocumentWithDisplayCache = typeof document & {
	__sbDisplayCache: Record<string, HTMLElement>
	__sbDisplayCallbacks: Record<string, (id: string) => void>
}

export type WithCalculatorCallbacks = typeof document & {
	__sbCalculations: Record<string, Array<string>>
}

export type CalculateF = (this: HTMLElement) => void

export type WithCalculate = HTMLElement & {
	__sbCalculate: CalculateF
}

export type Result<T> = Either<Array<string>, Option<T>>

export type Conditional = Record<PropertyKey, never>
export type Validation = Record<PropertyKey, never>

export type Publishes = Record<PropertyKey, never>
export type Subscribes = Record<PropertyKey, never>

export type FullElement = Element & {
	attributes?: GlobalAttributes
	calculation?: NumericOperation
	children?: Array<FullElement>
	dataset?: Dataset
	display?: Conditional
	scripts?: Array<ScriptElement> | ScriptElement
	stylesheets?: Array<LinkElement> | LinkElement
	validation?: Validation
}

export type GlobalAttributeOverrides = {
	accessKey?: never
	autocapitalize?: Autocapitalize
	contenteditable?: ContentEditable
	dir?: Direction
	enterkeyhint?: EnterKeyHint
	hidden?: Hidden
	inputmode?: InputMode
	popover?: Popover
	spellcheck?: Spellcheck
	translate?: Translate
}

export type RenderOptions = {
	level?: number
}

export type AriaRole =
	| "alert"
	| "alertdialog"
	| "application"
	| "article"
	| "banner"
	| "button"
	| "cell"
	| "checkbox"
	| "columnheader"
	| "combobox"
	| "comment"
	| "complementary"
	| "contentinfo"
	| "definition"
	| "dialog"
	| "directory"
	| "document"
	| "document"
	| "feed"
	| "figure"
	| "form"
	| "generic"
	| "grid"
	| "gridcell"
	| "group"
	| "heading"
	| "img"
	| "link"
	| "list"
	| "listbox"
	| "listitem"
	| "log"
	| "main"
	| "mark"
	| "marquee"
	| "math"
	| "menu"
	| "menubar"
	| "menuitem"
	| "menuitemcheckbox"
	| "menuitemradio"
	| "meter"
	| "navigation"
	| "none"
	| "note"
	| "option"
	| "presentation"
	| "progressbar"
	| "radio"
	| "radiogroup"
	| "region"
	| "row"
	| "rowgroup"
	| "rowheader"
	| "scrollbar"
	| "search"
	| "searchbox"
	| "separator"
	| "slider"
	| "spinbutton"
	| "status"
	| "suggestion"
	| "switch"
	| "tab"
	| "table"
	| "tablist"
	| "tabpanel"
	| "term"
	| "textbox"
	| "timer"
	| "toolbar"
	| "tooltip"
	| "tree"
	| "treegrid"
	| "treeitem"

export type Autocapitalize =
	| "none"
	| "off"
	| "sentences"
	| "on"
	| "words"
	| "characters"

export type Autocomplete = "off" | "on" | string

export type ContentEditable = "" | boolean

export type CrossOrigin = "anonymous" | "use-credentials"

export type Dataset = {
	[key: string]: string | number | boolean
}

export type Decoding = "async" | "auto" | "sync"

export type Direction = "auto" | "ltr" | "rtl"

export type EnterKeyHint =
	| "done"
	| "enter"
	| "go"
	| "next"
	| "previous"
	| "search"
	| "send"

export type FetchPriority = "auto" | "low" | "high"

export type FormEnctype =
	| "application/x-www-form-urlencoded"
	| "multipart/form-data"
	| "text/plain"

export type FormMethod = "dialog" | "get" | "post"

export type FormPopoverTarget = "hide" | "show" | "toggle"

export type FormTarget = "_blank" | "_parent" | "_self" | "_top"

export type FormType = "button" | "reset" | "submit"

export type GlobalAttributes = {
	accesskey?: string
	autocapitalize?: Autocapitalize
	class?: string
	contenteditable?: ContentEditable
	dir?: Direction
	draggable?: boolean
	enterkeyhint?: EnterKeyHint
	hidden?: Hidden
	id?: string
	inert?: boolean
	inputmode?: InputMode
	itemid?: string
	itemref?: string
	itemscope?: boolean
	itemtype?: string
	lang?: string
	nonce?: string
	popover?: Popover
	spellcheck?: Spellcheck
	style?: CSSStyleDeclaration
	tabindex?: string
	title?: string
	translate?: Translate
}

export type Hidden = "" | "hidden" | "until-found"

export type HttpEquiv =
	| "content-security-policy"
	| "content-type"
	| "default-style"
	| "refresh"
	| "x-ua-compatible"

export type InputElementTypes =
	| "button"
	| "checkbox"
	| "color"
	| "date"
	| "datetime-local"
	| "email"
	| "file"
	| "hidden"
	| "image"
	| "month"
	| "number"
	| "password"
	| "radio"
	| "range"
	| "reset"
	| "search"
	| "submit"
	| "tel"
	| "text"
	| "time"
	| "url"
	| "week"

export type InputMode =
	| "decimal"
	| "email"
	| "none"
	| "numeric"
	| "search"
	| "tel"
	| "text"
	| "url"

export type ListType = "a" | "A" | "i" | "I" | "1"

export type Loading = "eager" | "lazy"

export type Popover = "auto" | "manual"

export type ReferrerPolicy =
	| "no-referrer-when-downgrade"
	| "no-referrer"
	| "origin-when-cross-origin"
	| "origin"
	| "same-origin"
	| "strict-origin-when-cross-origin"
	| "strict-origin"
	| "unsafe-url"

// TODO: For space-separated string (DOMTokenList)
export type Sandbox =
	| "allow-downloads"
	| "allow-downloads-without-user-activation" // experimental
	| "allow-forms"
	| "allow-modals"
	| "allow-orientation-lock"
	| "allow-pointer-lock"
	| "allow-popups"
	| "allow-popups-to-escape-sandbox"
	| "allow-presentation"
	| "allow-same-origin"
	| "allow-scripts"
	| "allow-storage-access-by-user-activation" // experimental
	| "allow-top-navigation"
	| "allow-top-navigation-by-user-activation"
	| "allow-top-navigation-to-custom-protocols"

export type Spellcheck = "" | "default" | "false" | "true" | boolean

export type TagName =
	| "A"
	| "ABBR"
	| "ADDRESS"
	| "AREA"
	| "ARTICLE"
	| "ASIDE"
	| "AUDIO"
	| "B"
	| "BASE"
	| "BDI"
	| "BDO"
	| "BLOCKQUOTE"
	| "BODY"
	| "BR"
	| "BUTTON"
	| "CANVAS"
	| "CAPTION"
	| "CITE"
	| "CODE"
	| "COL"
	| "COLGROUP"
	| "DATA"
	| "DATALIST"
	| "DD"
	| "DEL"
	| "DETAILS"
	| "DFN"
	| "DIALOG"
	| "DIV"
	| "DL"
	| "DT"
	| "EM"
	| "EMBED"
	| "FIELDSET"
	| "FIGCAPTION"
	| "FIGURE"
	| "FOOTER"
	| "FORM"
	| "H1"
	| "H2"
	| "H3"
	| "H4"
	| "H5"
	| "H6"
	| "HEAD"
	| "HEADER"
	| "HGROUP"
	| "HR"
	| "HTML"
	| "I"
	| "IFRAME"
	| "IMG"
	| "INPUT"
	| "INS"
	| "KBD"
	| "LABEL"
	| "LEGEND"
	| "LI"
	| "LINK"
	| "MAIN"
	| "MAP"
	| "MARK"
	| "MENU"
	| "META"
	| "METER"
	| "NAV"
	| "NOSCRIPT"
	| "OBJECT"
	| "OL"
	| "OPTGROUP"
	| "OPTION"
	| "OUTPUT"
	| "P"
	| "PICTURE"
	| "PRE"
	| "PROGRESS"
	| "Q"
	| "RP"
	| "RT"
	| "RUBY"
	| "S"
	| "SAMP"
	| "SCRIPT"
	| "SEARCH"
	| "SECTION"
	| "SELECT"
	| "SLOT"
	| "SMALL"
	| "SOURCE"
	| "SPAN"
	| "STRONG"
	| "STYLE"
	| "SUB"
	| "SUMMARY"
	| "SUP"
	| "TABLE"
	| "TBODY"
	| "TD"
	| "TEMPLATE"
	| "TEXTAREA"
	| "TFOOT"
	| "TH"
	| "THEAD"
	| "TIME"
	| "TITLE"
	| "TR"
	| "TRACK"
	| "U"
	| "UL"
	| "VAR"
	| "VIDEO"
	| "WBR"

export type Translate = "" | "no" | "yes"
