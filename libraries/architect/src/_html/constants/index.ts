/*++
 + Global attribute names (always allowed)
 */
export const GLOBAL_ATTRIBUTES = [
	"accesskey",
	"autocapitalize",
	"class",
	"contenteditable",
	"dir",
	"draggable",
	"enterkeyhint",
	"exportparts",
	"hidden",
	"id",
	"inert",
	"inputmode",
	"is",
	"lang",
	"nonce",
	"part",
	"popover",
	"slot",
	"spellcheck",
	"style",
	"tabindex",
	"title",
	"translate",
] as const

/*++
 + HTML elements PERMITTED in the <head>
 + Some of these (meta, script, noscript) may also appear in <body>
 */
export const HEAD_ELEMENTS = [
	"BASE",
	"LINK",
	"META",
	"NOSCRIPT",
	"SCRIPT",
	"STYLE",
	"TEMPLATE",
	"TITLE",
] as const

/*++
 + Valid attributes for the <html> element (excluding global attributes)
 */
export const VALID_HTML_ATTRIBUTES = ["dir", "lang", "xmlns"] as const

/*++
 + Valid values for global attribute enums
 */
export const ENUMERATED_ATTRIBUTE_VALUES = {
	autocapitalize: [
		"off",
		"none",
		"on",
		"sentences",
		"words",
		"characters",
	] as const,
	contenteditable: [
		"true",
		"false",
		"plaintext-only",
		"",
	] as const,
	dir: ["auto", "ltr", "rtl"] as const,
	draggable: ["true", "false"] as const,
	enterkeyhint: [
		"enter",
		"done",
		"go",
		"next",
		"previous",
		"search",
		"send",
	] as const,
	hidden: ["", "until-found"] as const,
	inert: [""] as const,
	inputmode: [
		"none",
		"text",
		"decimal",
		"numeric",
		"tel",
		"search",
		"email",
		"url",
	] as const,
	popover: ["", "auto", "manual"] as const,
} as const

/*++
 + Permitted ARIA roles by HTML element (first pass - simplified)
 + This is a starting point - actual role validation is more complex
 */
export const ROLES_BY_ELEMENT: Readonly<Record<string, ReadonlyArray<string>>> = {
	html: [],
	head: [],
	body: [],
	a: ["button", "checkbox", "menuitem", "option", "radio", "switch", "tab", "treeitem"],
	article: ["feed", "presentation", "none"],
	aside: ["feed", "note", "presentation", "region", "search", "none"],
	button: ["checkbox", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "radio", "switch", "tab"],
	div: [],
	footer: ["contentinfo", "presentation", "none"],
	form: ["search", "presentation", "none"],
	h1: ["tab", "presentation", "none"],
	h2: ["tab", "presentation", "none"],
	h3: ["tab", "presentation", "none"],
	h4: ["tab", "presentation", "none"],
	h5: ["tab", "presentation", "none"],
	h6: ["tab", "presentation", "none"],
	header: ["banner", "presentation", "none"],
	img: ["button", "checkbox", "link", "menuitem", "menuitemcheckbox", "menuitemradio", "option", "progressbar", "scrollbar", "separator", "slider", "switch", "tab", "treeitem", "presentation", "none"],
	input: [],
	li: ["menuitem", "menuitemcheckbox", "menuitemradio", "option", "none", "presentation", "radio", "separator", "tab", "treeitem"],
	main: ["presentation", "none"],
	nav: ["presentation", "none"],
	ol: ["directory", "group", "listbox", "menu", "menubar", "none", "presentation", "radiogroup", "tablist", "toolbar", "tree"],
	p: [],
	section: ["alert", "alertdialog", "application", "banner", "complementary", "contentinfo", "dialog", "document", "feed", "log", "main", "marquee", "navigation", "none", "note", "presentation", "region", "search", "status", "tabpanel"],
	span: [],
	ul: ["directory", "group", "listbox", "menu", "menubar", "none", "presentation", "radiogroup", "tablist", "toolbar", "tree"],
} as const

/*++
 + Element-specific attribute names (non-global attributes per element)
 + First pass - basic elements only
 */
export const ELEMENT_SPECIFIC_ATTRIBUTES: Readonly<Record<string, ReadonlyArray<string>>> = {
	html: ["xmlns"],
	a: ["href", "target", "download", "ping", "rel", "hreflang", "type", "referrerpolicy"],
	area: ["alt", "coords", "shape", "href", "target", "download", "ping", "rel", "referrerpolicy"],
	audio: ["src", "crossorigin", "preload", "autoplay", "loop", "muted", "controls"],
	button: ["autofocus", "disabled", "form", "formaction", "formenctype", "formmethod", "formnovalidate", "formtarget", "name", "type", "value"],
	form: ["accept-charset", "action", "autocomplete", "enctype", "method", "name", "novalidate", "rel", "target"],
	img: ["alt", "src", "srcset", "sizes", "crossorigin", "usemap", "ismap", "width", "height", "referrerpolicy", "decoding", "loading", "fetchpriority"],
	input: ["accept", "alt", "autocomplete", "checked", "dirname", "disabled", "form", "formaction", "formenctype", "formmethod", "formnovalidate", "formtarget", "height", "list", "max", "maxlength", "min", "minlength", "multiple", "name", "pattern", "placeholder", "readonly", "required", "size", "src", "step", "type", "value", "width"],
	link: ["href", "crossorigin", "rel", "media", "hreflang", "type", "sizes", "imagesrcset", "imagesizes", "referrerpolicy", "integrity", "blocking", "color", "disabled", "fetchpriority"],
	meta: ["name", "http-equiv", "content", "charset", "media"],
	script: ["src", "type", "nomodule", "async", "defer", "crossorigin", "integrity", "referrerpolicy", "blocking", "fetchpriority"],
	select: ["autocomplete", "disabled", "form", "multiple", "name", "required", "size"],
	textarea: ["autocomplete", "cols", "dirname", "disabled", "form", "maxlength", "minlength", "name", "placeholder", "readonly", "required", "rows", "wrap"],
	video: ["src", "crossorigin", "poster", "preload", "autoplay", "playsinline", "loop", "muted", "controls", "width", "height"],
} as const
