/*++
 + ARIA Standards Data (Minimal POC Version)
 + Source: https://github.com/dequelabs/axe-core/tree/develop/lib/standards
 + Based on W3C WAI-ARIA 1.2 and ARIA in HTML specifications
 +
 + This file contains ARIA validation data for POC elements only.
 + Full expansion will include all ~120 HTML elements and ~150 ARIA roles.
 +
 + POC Elements: html, body, div, button, article, section, nav, aside,
 +               h1-h3, span, a, p, ul, ol, li, header, footer, main, figure, title
 */

/*++
 + ARIA attribute value types
 */
export type AriaAttributeType =
	| "boolean" // "true" | "false"
	| "nmtoken" // Single token from enum
	| "nmtokens" // Space-separated tokens from enum
	| "idref" // Single element ID reference
	| "idrefs" // Space-separated element ID references
	| "string" // Free-form text
	| "int" // Integer number
	| "decimal" // Decimal number

/*++
 + ARIA attribute definition
 */
export type AriaAttributeDefinition = Readonly<{
	type: AriaAttributeType
	values?: ReadonlyArray<string> // Enumerated values for token types
	global?: boolean // Available on all elements with roles
	allowEmpty?: boolean // Can be empty string
	minValue?: number // Minimum value for int/decimal types
}>

/*++
 + ARIA role definition
 */
export type AriaRoleDefinition = Readonly<{
	type: "abstract" | "structure" | "widget" | "composite" | "window" | "landmark"
	allowedAttrs?: ReadonlyArray<string>
	requiredAttrs?: ReadonlyArray<string>
	prohibitedAttrs?: ReadonlyArray<string>
	accessibleNameRequired?: boolean
}>

/*++
 + HTML element ARIA rules
 */
export type HtmlElementAriaRules = Readonly<{
	implicitRole?: string // Default role if no explicit role
	allowedRoles?: ReadonlyArray<string> | "any" | false // Permitted explicit roles
	namingProhibited?: boolean // Cannot have aria-label/aria-labelledby without role
	noAriaAttrs?: boolean // No ARIA attributes allowed at all
}>

/*++
 + All ARIA attributes with type and value definitions
 + Source: axe-core/lib/standards/aria-attrs.js
 +
 + Global attributes are allowed on all elements with roles
 + Non-global attributes are role-specific
 */
export const ARIA_ATTRIBUTES: Readonly<
	Record<string, AriaAttributeDefinition>
> = {
	// === Global Attributes (allowed on all elements with roles) ===

	"aria-atomic": {
		type: "boolean",
		global: true,
	},
	"aria-busy": {
		type: "boolean",
		global: true,
	},
	"aria-controls": {
		type: "idrefs",
		allowEmpty: true,
		global: true,
	},
	"aria-current": {
		type: "nmtoken",
		allowEmpty: true,
		values: ["page", "step", "location", "date", "time", "true", "false"],
		global: true,
	},
	"aria-describedby": {
		type: "idrefs",
		allowEmpty: true,
		global: true,
	},
	"aria-description": {
		type: "string",
		allowEmpty: true,
		global: true,
	},
	"aria-details": {
		type: "idref",
		allowEmpty: true,
		global: true,
	},
	"aria-disabled": {
		type: "boolean",
		global: true,
	},
	"aria-dropeffect": {
		type: "nmtokens",
		values: ["copy", "execute", "link", "move", "none", "popup"],
		global: true,
	},
	"aria-errormessage": {
		type: "idref",
		allowEmpty: true,
		global: true,
	},
	"aria-flowto": {
		type: "idrefs",
		allowEmpty: true,
		global: true,
	},
	"aria-grabbed": {
		type: "nmtoken",
		values: ["true", "false", "undefined"],
		global: true,
	},
	"aria-haspopup": {
		type: "nmtoken",
		allowEmpty: true,
		values: ["true", "false", "menu", "listbox", "tree", "grid", "dialog"],
		global: true,
	},
	"aria-hidden": {
		type: "nmtoken",
		values: ["true", "false", "undefined"],
		global: true,
	},
	"aria-invalid": {
		type: "nmtoken",
		values: ["grammar", "false", "spelling", "true"],
		global: true,
	},
	"aria-keyshortcuts": {
		type: "string",
		allowEmpty: true,
		global: true,
	},
	"aria-label": {
		type: "string",
		allowEmpty: true,
		global: true,
	},
	"aria-labelledby": {
		type: "idrefs",
		allowEmpty: true,
		global: true,
	},
	"aria-live": {
		type: "nmtoken",
		values: ["assertive", "off", "polite"],
		global: true,
	},
	"aria-owns": {
		type: "idrefs",
		allowEmpty: true,
		global: true,
	},
	"aria-relevant": {
		type: "nmtokens",
		values: ["additions", "all", "removals", "text"],
		global: true,
	},
	"aria-roledescription": {
		type: "string",
		allowEmpty: true,
		global: true,
	},

	// === Non-Global Attributes (role-specific) ===

	"aria-activedescendant": {
		type: "idref",
		allowEmpty: true,
	},
	"aria-autocomplete": {
		type: "nmtoken",
		values: ["inline", "list", "both", "none"],
	},
	"aria-checked": {
		type: "nmtoken",
		values: ["false", "mixed", "true", "undefined"],
	},
	"aria-colcount": {
		type: "int",
		minValue: -1,
	},
	"aria-colindex": {
		type: "int",
		minValue: 1,
	},
	"aria-colspan": {
		type: "int",
		minValue: 1,
	},
	"aria-expanded": {
		type: "nmtoken",
		values: ["true", "false", "undefined"],
	},
	"aria-level": {
		type: "int",
		minValue: 1,
	},
	"aria-modal": {
		type: "boolean",
	},
	"aria-multiline": {
		type: "boolean",
	},
	"aria-multiselectable": {
		type: "boolean",
	},
	"aria-orientation": {
		type: "nmtoken",
		values: ["horizontal", "undefined", "vertical"],
	},
	"aria-placeholder": {
		type: "string",
		allowEmpty: true,
	},
	"aria-posinset": {
		type: "int",
		minValue: 1,
	},
	"aria-pressed": {
		type: "nmtoken",
		values: ["false", "mixed", "true", "undefined"],
	},
	"aria-readonly": {
		type: "boolean",
	},
	"aria-required": {
		type: "boolean",
	},
	"aria-rowcount": {
		type: "int",
		minValue: -1,
	},
	"aria-rowindex": {
		type: "int",
		minValue: 1,
	},
	"aria-rowspan": {
		type: "int",
		minValue: 0,
	},
	"aria-selected": {
		type: "nmtoken",
		values: ["false", "true", "undefined"],
	},
	"aria-setsize": {
		type: "int",
		minValue: -1,
	},
	"aria-sort": {
		type: "nmtoken",
		values: ["ascending", "descending", "none", "other"],
	},
	"aria-valuemax": {
		type: "decimal",
	},
	"aria-valuemin": {
		type: "decimal",
	},
	"aria-valuenow": {
		type: "decimal",
	},
	"aria-valuetext": {
		type: "string",
		allowEmpty: true,
	},
} as const

/*++
 + ARIA roles with attribute requirements (POC subset)
 + Source: axe-core/lib/standards/aria-roles.js
 +
 + Only includes roles used by POC elements
 + Full version will include all ~150 ARIA roles
 */
export const ARIA_ROLES: Readonly<Record<string, AriaRoleDefinition>> = {
	// === Landmark Roles ===

	banner: {
		type: "landmark",
		allowedAttrs: [
			"aria-expanded",
			// ... plus all global attrs
		],
	},
	complementary: {
		type: "landmark",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	contentinfo: {
		type: "landmark",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	main: {
		type: "landmark",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	navigation: {
		type: "landmark",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	region: {
		type: "landmark",
		allowedAttrs: [
			"aria-expanded",
		],
		accessibleNameRequired: true,
	},
	search: {
		type: "landmark",
		allowedAttrs: [
			"aria-expanded",
		],
	},

	// === Document Structure Roles ===

	article: {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
			"aria-posinset",
			"aria-setsize",
		],
	},
	document: {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	feed: {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	generic: {
		type: "structure",
		allowedAttrs: [],
	},
	group: {
		type: "structure",
		allowedAttrs: [
			"aria-activedescendant",
			"aria-expanded",
		],
	},
	list: {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	listitem: {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
			"aria-level",
			"aria-posinset",
			"aria-setsize",
		],
	},
	none: {
		type: "structure",
		prohibitedAttrs: [], // All ARIA attrs prohibited except aria-hidden
	},
	presentation: {
		type: "structure",
		prohibitedAttrs: [], // All ARIA attrs prohibited except aria-hidden
	},

	// === Widget Roles ===

	button: {
		type: "widget",
		allowedAttrs: [
			"aria-expanded",
			"aria-pressed",
		],
		accessibleNameRequired: true,
	},
	checkbox: {
		type: "widget",
		requiredAttrs: ["aria-checked"],
		allowedAttrs: [
			"aria-checked",
			"aria-readonly",
		],
		accessibleNameRequired: true,
	},
	link: {
		type: "widget",
		allowedAttrs: [
			"aria-expanded",
		],
		accessibleNameRequired: true,
	},
	menuitem: {
		type: "widget",
		allowedAttrs: [
			"aria-expanded",
			"aria-posinset",
			"aria-setsize",
		],
		accessibleNameRequired: true,
	},
	menuitemcheckbox: {
		type: "widget",
		requiredAttrs: ["aria-checked"],
		allowedAttrs: [
			"aria-checked",
			"aria-expanded",
			"aria-posinset",
			"aria-readonly",
			"aria-setsize",
		],
		accessibleNameRequired: true,
	},
	menuitemradio: {
		type: "widget",
		requiredAttrs: ["aria-checked"],
		allowedAttrs: [
			"aria-checked",
			"aria-expanded",
			"aria-posinset",
			"aria-readonly",
			"aria-setsize",
		],
		accessibleNameRequired: true,
	},
	option: {
		type: "widget",
		allowedAttrs: [
			"aria-checked",
			"aria-posinset",
			"aria-selected",
			"aria-setsize",
		],
		accessibleNameRequired: true,
	},
	radio: {
		type: "widget",
		requiredAttrs: ["aria-checked"],
		allowedAttrs: [
			"aria-checked",
			"aria-posinset",
			"aria-setsize",
		],
		accessibleNameRequired: true,
	},
	switch: {
		type: "widget",
		requiredAttrs: ["aria-checked"],
		allowedAttrs: [
			"aria-checked",
			"aria-readonly",
		],
		accessibleNameRequired: true,
	},
	tab: {
		type: "widget",
		allowedAttrs: [
			"aria-expanded",
			"aria-posinset",
			"aria-selected",
			"aria-setsize",
		],
		accessibleNameRequired: true,
	},
	treeitem: {
		type: "widget",
		allowedAttrs: [
			"aria-checked",
			"aria-expanded",
			"aria-level",
			"aria-posinset",
			"aria-selected",
			"aria-setsize",
		],
		accessibleNameRequired: true,
	},
} as const

/*++
 + HTML elements with ARIA rules (POC subset)
 + Source: axe-core/lib/standards/html-elms.js + W3C ARIA in HTML
 +
 + Only includes POC elements
 + Full version will include all ~120 HTML elements
 */
export const HTML_ELEMENTS: Readonly<Record<string, HtmlElementAriaRules>> = {
	// === Document ===

	html: {
		implicitRole: "document",
		allowedRoles: false, // No role allowed
	},
	body: {
		implicitRole: "generic",
		allowedRoles: false, // No role allowed
	},

	// === Sectioning ===

	article: {
		implicitRole: "article",
		allowedRoles: [
			"application",
			"document",
			"feed",
			"main",
			"none",
			"presentation",
			"region",
		],
	},
	aside: {
		implicitRole: "complementary",
		allowedRoles: [
			"doc-dedication",
			"doc-example",
			"doc-footnote",
			"doc-pullquote",
			"doc-tip",
			"feed",
			"none",
			"note",
			"presentation",
			"region",
			"search",
		],
	},
	nav: {
		implicitRole: "navigation",
		allowedRoles: [
			"doc-index",
			"doc-pagelist",
			"doc-toc",
			"menu",
			"menubar",
			"none",
			"presentation",
			"tablist",
		],
	},
	section: {
		implicitRole: "region", // Only if has accessible name
		allowedRoles: [
			"alert",
			"alertdialog",
			"application",
			"banner",
			"complementary",
			"contentinfo",
			"dialog",
			"document",
			"feed",
			"group",
			"log",
			"main",
			"marquee",
			"navigation",
			"none",
			"presentation",
			"region",
			"search",
			"status",
			"tabpanel",
		],
	},

	// === Headings ===

	h1: {
		implicitRole: "heading", // with aria-level="1"
		allowedRoles: ["doc-subtitle", "none", "presentation", "tab"],
	},
	h2: {
		implicitRole: "heading",
		allowedRoles: ["doc-subtitle", "none", "presentation", "tab"],
	},
	h3: {
		implicitRole: "heading",
		allowedRoles: ["doc-subtitle", "none", "presentation", "tab"],
	},

	// === Flow Content ===

	div: {
		implicitRole: "generic",
		allowedRoles: "any",
		namingProhibited: true, // Cannot have aria-label without explicit role
	},
	p: {
		implicitRole: "paragraph",
		allowedRoles: "any",
		namingProhibited: true,
	},
	header: {
		implicitRole: "banner", // Context-dependent (not in article/section/aside)
		allowedRoles: ["banner", "group", "none", "presentation"],
	},
	footer: {
		implicitRole: "contentinfo", // Context-dependent (not in article/section/aside)
		allowedRoles: [
			"contentinfo",
			"doc-footnote",
			"group",
			"none",
			"presentation",
		],
	},
	main: {
		implicitRole: "main",
		allowedRoles: false, // No role allowed
	},
	figure: {
		implicitRole: "figure",
		allowedRoles: "any",
	},
	ul: {
		implicitRole: "list",
		allowedRoles: [
			"group",
			"listbox",
			"menu",
			"menubar",
			"none",
			"presentation",
			"radiogroup",
			"tablist",
			"toolbar",
			"tree",
		],
	},
	ol: {
		implicitRole: "list",
		allowedRoles: [
			"group",
			"listbox",
			"menu",
			"menubar",
			"none",
			"presentation",
			"radiogroup",
			"tablist",
			"toolbar",
			"tree",
		],
	},
	li: {
		implicitRole: "listitem", // Context-dependent (in ul/ol)
		allowedRoles: "any",
	},

	// === Phrasing ===

	span: {
		implicitRole: "generic",
		allowedRoles: "any",
		namingProhibited: true,
	},

	// === Interactive ===

	a: {
		// implicitRole depends on href attribute (handled in component)
		allowedRoles: [
			"button",
			"checkbox",
			"doc-backlink",
			"doc-biblioref",
			"doc-glossref",
			"doc-noteref",
			"menuitem",
			"menuitemcheckbox",
			"menuitemradio",
			"option",
			"radio",
			"switch",
			"tab",
			"treeitem",
		],
	},
	button: {
		implicitRole: "button",
		allowedRoles: [
			"checkbox",
			"combobox",
			"gridcell",
			"link",
			"menuitem",
			"menuitemcheckbox",
			"menuitemradio",
			"option",
			"radio",
			"separator",
			"slider",
			"switch",
			"tab",
			"treeitem",
		],
	},

	// === Metadata (no ARIA allowed) ===

	title: {
		allowedRoles: false,
		noAriaAttrs: true,
	},
	meta: {
		allowedRoles: false,
		noAriaAttrs: true,
	},
	link: {
		allowedRoles: false,
		noAriaAttrs: true,
	},
	script: {
		allowedRoles: false,
		noAriaAttrs: true,
	},
} as const
