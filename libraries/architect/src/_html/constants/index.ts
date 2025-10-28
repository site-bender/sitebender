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
 + Valid values for the dir attribute
 */
export const VALID_DIR_VALUES = ["auto", "ltr", "rtl"] as const
