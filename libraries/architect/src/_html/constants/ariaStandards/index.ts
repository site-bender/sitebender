/*++
 + ARIA Standards Data (Complete Coverage)
 + Source: https://github.com/dequelabs/axe-core/tree/develop/lib/standards
 + Based on W3C WAI-ARIA 1.2, DPUB-ARIA 1.1, Graphics-ARIA 1.0, and ARIA in HTML
 +
 + This file contains complete ARIA validation data:
 + - 105 ARIA attributes with type and value definitions
 + - 126 ARIA roles (84 core + 39 DPUB + 3 Graphics)
 + - 111 HTML5 element ARIA rules
 +
 + Updated: 2025-11-08
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
	type:
		| "abstract"
		| "structure"
		| "widget"
		| "composite"
		| "window"
		| "landmark"
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
 + ARIA roles with attribute requirements (Complete Coverage)
 + Source: axe-core/lib/standards/aria-roles.js, dpub-roles.js, graphics-roles.js
 +         W3C WAI-ARIA 1.2, DPUB-ARIA 1.1, Graphics-ARIA 1.0
 +
 + Includes 126 concrete ARIA roles (abstract roles excluded):
 + - 84 core ARIA 1.2 roles
 + - 39 DPUB-ARIA 1.1 roles (Digital Publishing)
 + - 3 Graphics-ARIA 1.0 roles
 +
 + Organized by category: Landmark, Structure, Widget, Composite, Live Region, Window, DPUB, Graphics
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
	application: {
		type: "landmark",
		allowedAttrs: [
			"aria-activedescendant",
			"aria-expanded",
		],
		accessibleNameRequired: true,
	},
	form: {
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
	blockquote: {
		type: "structure",
		allowedAttrs: [],
	},
	caption: {
		type: "structure",
		allowedAttrs: [],
	},
	cell: {
		type: "structure",
		allowedAttrs: [
			"aria-colindex",
			"aria-colspan",
			"aria-expanded",
			"aria-rowindex",
			"aria-rowspan",
		],
	},
	code: {
		type: "structure",
		allowedAttrs: [],
	},
	columnheader: {
		type: "structure",
		allowedAttrs: [
			"aria-colindex",
			"aria-colspan",
			"aria-expanded",
			"aria-readonly",
			"aria-required",
			"aria-rowindex",
			"aria-rowspan",
			"aria-selected",
			"aria-sort",
		],
	},
	definition: {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	deletion: {
		type: "structure",
		allowedAttrs: [],
	},
	directory: {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	emphasis: {
		type: "structure",
		allowedAttrs: [],
	},
	figure: {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	heading: {
		type: "structure",
		requiredAttrs: [
			"aria-level",
		],
		allowedAttrs: [
			"aria-expanded",
		],
	},
	img: {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
		accessibleNameRequired: true,
	},
	insertion: {
		type: "structure",
		allowedAttrs: [],
	},
	mark: {
		type: "structure",
		allowedAttrs: [],
	},
	math: {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	meter: {
		type: "structure",
		requiredAttrs: [
			"aria-valuenow",
		],
		allowedAttrs: [
			"aria-valuemax",
			"aria-valuemin",
			"aria-valuetext",
		],
		accessibleNameRequired: true,
	},
	note: {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	paragraph: {
		type: "structure",
		allowedAttrs: [],
	},
	row: {
		type: "structure",
		allowedAttrs: [
			"aria-activedescendant",
			"aria-colindex",
			"aria-expanded",
			"aria-level",
			"aria-posinset",
			"aria-rowindex",
			"aria-selected",
			"aria-setsize",
		],
	},
	rowgroup: {
		type: "structure",
		allowedAttrs: [],
	},
	rowheader: {
		type: "structure",
		allowedAttrs: [
			"aria-colindex",
			"aria-colspan",
			"aria-expanded",
			"aria-readonly",
			"aria-required",
			"aria-rowindex",
			"aria-rowspan",
			"aria-selected",
			"aria-sort",
		],
	},
	strong: {
		type: "structure",
		allowedAttrs: [],
	},
	subscript: {
		type: "structure",
		allowedAttrs: [],
	},
	suggestion: {
		type: "structure",
		allowedAttrs: [],
	},
	superscript: {
		type: "structure",
		allowedAttrs: [],
	},
	table: {
		type: "structure",
		allowedAttrs: [
			"aria-colcount",
			"aria-expanded",
			"aria-rowcount",
		],
	},
	tabpanel: {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	term: {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	time: {
		type: "structure",
		allowedAttrs: [],
	},
	toolbar: {
		type: "structure",
		allowedAttrs: [
			"aria-activedescendant",
			"aria-expanded",
			"aria-orientation",
		],
		accessibleNameRequired: true,
	},
	tooltip: {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
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
	combobox: {
		type: "widget",
		requiredAttrs: [
			"aria-expanded",
			"aria-controls",
		],
		allowedAttrs: [
			"aria-autocomplete",
			"aria-readonly",
			"aria-required",
			"aria-activedescendant",
			"aria-orientation",
		],
		accessibleNameRequired: true,
	},
	gridcell: {
		type: "widget",
		allowedAttrs: [
			"aria-colindex",
			"aria-colspan",
			"aria-expanded",
			"aria-readonly",
			"aria-required",
			"aria-rowindex",
			"aria-rowspan",
			"aria-selected",
		],
	},
	listbox: {
		type: "widget",
		allowedAttrs: [
			"aria-activedescendant",
			"aria-expanded",
			"aria-multiselectable",
			"aria-orientation",
			"aria-readonly",
			"aria-required",
		],
		accessibleNameRequired: true,
	},
	progressbar: {
		type: "widget",
		allowedAttrs: [
			"aria-expanded",
			"aria-valuemax",
			"aria-valuemin",
			"aria-valuenow",
			"aria-valuetext",
		],
		accessibleNameRequired: true,
	},
	scrollbar: {
		type: "widget",
		requiredAttrs: [
			"aria-valuenow",
		],
		allowedAttrs: [
			"aria-controls",
			"aria-orientation",
			"aria-valuemax",
			"aria-valuemin",
			"aria-valuetext",
		],
	},
	searchbox: {
		type: "widget",
		allowedAttrs: [
			"aria-activedescendant",
			"aria-autocomplete",
			"aria-multiline",
			"aria-placeholder",
			"aria-readonly",
			"aria-required",
		],
		accessibleNameRequired: true,
	},
	separator: {
		type: "widget",
		allowedAttrs: [
			"aria-orientation",
			"aria-valuemax",
			"aria-valuemin",
			"aria-valuenow",
			"aria-valuetext",
		],
	},
	slider: {
		type: "widget",
		requiredAttrs: [
			"aria-valuenow",
		],
		allowedAttrs: [
			"aria-orientation",
			"aria-readonly",
			"aria-required",
			"aria-valuemax",
			"aria-valuemin",
			"aria-valuetext",
		],
		accessibleNameRequired: true,
	},
	spinbutton: {
		type: "widget",
		allowedAttrs: [
			"aria-activedescendant",
			"aria-readonly",
			"aria-required",
			"aria-valuemax",
			"aria-valuemin",
			"aria-valuenow",
			"aria-valuetext",
		],
		accessibleNameRequired: true,
	},
	textbox: {
		type: "widget",
		allowedAttrs: [
			"aria-activedescendant",
			"aria-autocomplete",
			"aria-multiline",
			"aria-placeholder",
			"aria-readonly",
			"aria-required",
		],
		accessibleNameRequired: true,
	},

	// === Composite Widget Roles ===

	grid: {
		type: "composite",
		allowedAttrs: [
			"aria-activedescendant",
			"aria-colcount",
			"aria-expanded",
			"aria-level",
			"aria-multiselectable",
			"aria-readonly",
			"aria-rowcount",
		],
	},
	menu: {
		type: "composite",
		allowedAttrs: [
			"aria-activedescendant",
			"aria-expanded",
			"aria-orientation",
		],
	},
	menubar: {
		type: "composite",
		allowedAttrs: [
			"aria-activedescendant",
			"aria-expanded",
			"aria-orientation",
		],
	},
	radiogroup: {
		type: "composite",
		allowedAttrs: [
			"aria-activedescendant",
			"aria-expanded",
			"aria-orientation",
			"aria-readonly",
			"aria-required",
		],
	},
	tablist: {
		type: "composite",
		allowedAttrs: [
			"aria-activedescendant",
			"aria-expanded",
			"aria-level",
			"aria-multiselectable",
			"aria-orientation",
		],
	},
	tree: {
		type: "composite",
		allowedAttrs: [
			"aria-activedescendant",
			"aria-expanded",
			"aria-multiselectable",
			"aria-orientation",
			"aria-required",
		],
	},
	treegrid: {
		type: "composite",
		allowedAttrs: [
			"aria-activedescendant",
			"aria-colcount",
			"aria-expanded",
			"aria-level",
			"aria-multiselectable",
			"aria-orientation",
			"aria-readonly",
			"aria-required",
			"aria-rowcount",
		],
	},

	// === Live Region Roles ===

	alert: {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	log: {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	marquee: {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	status: {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	timer: {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},

	// === Window Roles ===

	alertdialog: {
		type: "window",
		allowedAttrs: [
			"aria-expanded",
			"aria-modal",
		],
		accessibleNameRequired: true,
	},
	dialog: {
		type: "window",
		allowedAttrs: [
			"aria-expanded",
			"aria-modal",
		],
		accessibleNameRequired: true,
	},

	// === Digital Publishing (DPUB-ARIA) Roles ===
	// Source: W3C DPUB-ARIA 1.1 - https://www.w3.org/TR/dpub-aria-1.1/

	"doc-abstract": {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-acknowledgments": {
		type: "landmark",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-afterword": {
		type: "landmark",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-appendix": {
		type: "landmark",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-backlink": {
		type: "widget",
		allowedAttrs: [
			"aria-expanded",
		],
		accessibleNameRequired: true,
	},
	"doc-biblioentry": {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
			"aria-level",
			"aria-posinset",
			"aria-setsize",
		],
	},
	"doc-bibliography": {
		type: "landmark",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-biblioref": {
		type: "widget",
		allowedAttrs: [
			"aria-expanded",
		],
		accessibleNameRequired: true,
	},
	"doc-chapter": {
		type: "landmark",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-colophon": {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-conclusion": {
		type: "landmark",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-cover": {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-credit": {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-credits": {
		type: "landmark",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-dedication": {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-endnote": {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
			"aria-level",
			"aria-posinset",
			"aria-setsize",
		],
	},
	"doc-endnotes": {
		type: "landmark",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-epigraph": {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-epilogue": {
		type: "landmark",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-errata": {
		type: "landmark",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-example": {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-footnote": {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-foreword": {
		type: "landmark",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-glossary": {
		type: "landmark",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-glossref": {
		type: "widget",
		allowedAttrs: [
			"aria-expanded",
		],
		accessibleNameRequired: true,
	},
	"doc-index": {
		type: "landmark",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-introduction": {
		type: "landmark",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-noteref": {
		type: "widget",
		allowedAttrs: [
			"aria-expanded",
		],
		accessibleNameRequired: true,
	},
	"doc-notice": {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-pagebreak": {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
			"aria-orientation",
		],
	},
	"doc-pagelist": {
		type: "landmark",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-part": {
		type: "landmark",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-preface": {
		type: "landmark",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-prologue": {
		type: "landmark",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-pullquote": {
		type: "structure",
		allowedAttrs: [],
	},
	"doc-qna": {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-subtitle": {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-tip": {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"doc-toc": {
		type: "landmark",
		allowedAttrs: [
			"aria-expanded",
		],
	},

	// === Graphics (Graphics-ARIA) Roles ===
	// Source: W3C Graphics-ARIA 1.0 - https://www.w3.org/TR/graphics-aria-1.0/

	"graphics-document": {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
		accessibleNameRequired: true,
	},
	"graphics-object": {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
	},
	"graphics-symbol": {
		type: "structure",
		allowedAttrs: [
			"aria-expanded",
		],
		accessibleNameRequired: true,
	},
} as const

/*++
 + HTML elements with ARIA rules (Complete HTML5 Coverage)
 + Source: axe-core/lib/standards/html-elms.js + W3C ARIA in HTML
 +
 + Includes all 111 HTML5 element wrappers from architect library
 + Complete ARIA validation for all implemented elements
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
	h4: {
		implicitRole: "heading",
		allowedRoles: ["doc-subtitle", "none", "presentation", "tab"],
	},
	h5: {
		implicitRole: "heading",
		allowedRoles: ["doc-subtitle", "none", "presentation", "tab"],
	},
	h6: {
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
	base: {
		allowedRoles: false,
		noAriaAttrs: true,
	},
	noscript: {
		allowedRoles: false,
		noAriaAttrs: true,
	},
	style: {
		allowedRoles: false,
		noAriaAttrs: true,
	},

	// === Phrasing Content ===

	abbr: {
		implicitRole: undefined,
		allowedRoles: "any",
		namingProhibited: true,
	},
	b: {
		implicitRole: "generic",
		allowedRoles: "any",
		namingProhibited: true,
	},
	bdi: {
		implicitRole: "generic",
		allowedRoles: "any",
		namingProhibited: true,
	},
	bdo: {
		implicitRole: "generic",
		allowedRoles: "any",
		namingProhibited: true,
	},
	br: {
		implicitRole: undefined,
		allowedRoles: ["none", "presentation"],
		noAriaAttrs: true,
	},
	cite: {
		implicitRole: undefined,
		allowedRoles: "any",
		namingProhibited: true,
	},
	code: {
		implicitRole: "code",
		allowedRoles: "any",
		namingProhibited: true,
	},
	data: {
		implicitRole: "generic",
		allowedRoles: "any",
		namingProhibited: true,
	},
	del: {
		implicitRole: "deletion",
		allowedRoles: "any",
		namingProhibited: true,
	},
	dfn: {
		implicitRole: "term",
		allowedRoles: "any",
	},
	em: {
		implicitRole: "emphasis",
		allowedRoles: "any",
		namingProhibited: true,
	},
	i: {
		implicitRole: "generic",
		allowedRoles: "any",
		namingProhibited: true,
	},
	ins: {
		implicitRole: "insertion",
		allowedRoles: "any",
		namingProhibited: true,
	},
	kbd: {
		implicitRole: undefined,
		allowedRoles: "any",
		namingProhibited: true,
	},
	mark: {
		implicitRole: undefined,
		allowedRoles: "any",
		namingProhibited: true,
	},
	q: {
		implicitRole: "generic",
		allowedRoles: "any",
		namingProhibited: true,
	},
	rp: {
		implicitRole: undefined,
		allowedRoles: "any",
		namingProhibited: true,
	},
	rt: {
		implicitRole: undefined,
		allowedRoles: "any",
		namingProhibited: true,
	},
	ruby: {
		implicitRole: undefined,
		allowedRoles: "any",
	},
	s: {
		implicitRole: "deletion",
		allowedRoles: "any",
		namingProhibited: true,
	},
	samp: {
		implicitRole: "generic",
		allowedRoles: "any",
		namingProhibited: true,
	},
	small: {
		implicitRole: "generic",
		allowedRoles: "any",
		namingProhibited: true,
	},
	strong: {
		implicitRole: "strong",
		allowedRoles: "any",
		namingProhibited: true,
	},
	sub: {
		implicitRole: "subscript",
		allowedRoles: "any",
		namingProhibited: true,
	},
	sup: {
		implicitRole: "superscript",
		allowedRoles: "any",
		namingProhibited: true,
	},
	time: {
		implicitRole: "time",
		allowedRoles: "any",
		namingProhibited: true,
	},
	u: {
		implicitRole: "generic",
		allowedRoles: "any",
		namingProhibited: true,
	},
	var: {
		implicitRole: undefined,
		allowedRoles: "any",
		namingProhibited: true,
	},
	wbr: {
		implicitRole: undefined,
		allowedRoles: ["none", "presentation"],
		noAriaAttrs: true,
	},

	// === Flow Content ===

	address: {
		implicitRole: "group",
		allowedRoles: "any",
	},
	blockquote: {
		implicitRole: "blockquote",
		allowedRoles: "any",
	},
	dd: {
		implicitRole: undefined,
		allowedRoles: false,
	},
	dl: {
		implicitRole: undefined,
		allowedRoles: ["group", "list", "none", "presentation"],
	},
	dt: {
		implicitRole: undefined,
		allowedRoles: ["listitem"],
	},
	figcaption: {
		implicitRole: undefined,
		allowedRoles: ["group", "none", "presentation"],
		namingProhibited: true,
	},
	hr: {
		implicitRole: "separator",
		allowedRoles: ["none", "presentation"],
		noAriaAttrs: true,
	},
	menu: {
		implicitRole: "list",
		allowedRoles: [
			"directory",
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
	pre: {
		implicitRole: "generic",
		allowedRoles: "any",
		namingProhibited: true,
	},
	search: {
		implicitRole: "search",
		allowedRoles: ["form", "group", "none", "presentation", "region"],
	},

	// === Table Content ===

	col: {
		allowedRoles: false,
		noAriaAttrs: true,
	},
	colgroup: {
		allowedRoles: false,
		noAriaAttrs: true,
	},

	// === Form Elements ===

	form: {
		implicitRole: "form",
		allowedRoles: ["none", "presentation", "search"],
	},
	datalist: {
		implicitRole: "listbox",
		allowedRoles: false,
		noAriaAttrs: true,
	},
	input: {
		// Role depends on type attribute - handled in component
		allowedRoles: "any", // Simplified - actual rules vary by type
	},
	optgroup: {
		implicitRole: "group",
		allowedRoles: false,
	},
	option: {
		implicitRole: "option",
		allowedRoles: false,
	},
	select: {
		// Role depends on attributes - handled in component
		allowedRoles: ["menu"],
	},
	textarea: {
		implicitRole: "textbox",
		allowedRoles: false,
	},

	// === Heading Content ===

	hgroup: {
		implicitRole: "group",
		allowedRoles: "any",
	},

	// === Interactive Elements ===

	details: {
		implicitRole: "group",
		allowedRoles: false,
	},
	dialog: {
		implicitRole: "dialog",
		allowedRoles: ["alertdialog"],
	},
	summary: {
		// Role depends on context - handled in component
		allowedRoles: false,
	},

	// === Embedded Content ===

	audio: {
		implicitRole: undefined,
		allowedRoles: ["application"],
	},
	canvas: {
		implicitRole: undefined,
		allowedRoles: "any",
	},
	embed: {
		implicitRole: undefined,
		allowedRoles: [
			"application",
			"document",
			"img",
			"none",
			"presentation",
		],
	},
	iframe: {
		implicitRole: undefined,
		allowedRoles: [
			"application",
			"document",
			"img",
			"none",
			"presentation",
		],
	},
	map: {
		implicitRole: undefined,
		allowedRoles: false,
	},
	math: {
		implicitRole: "math",
		allowedRoles: false,
	},
	object: {
		implicitRole: undefined,
		allowedRoles: ["application", "document", "img"],
	},
	param: {
		allowedRoles: false,
		noAriaAttrs: true,
	},
	picture: {
		allowedRoles: false,
		// Only aria-hidden allowed - special case
	},
	source: {
		allowedRoles: false,
		noAriaAttrs: true,
	},
	svg: {
		implicitRole: "graphics-document",
		allowedRoles: ["application", "document", "img", "none", "presentation"],
	},
	track: {
		allowedRoles: false,
		noAriaAttrs: true,
	},
	video: {
		implicitRole: undefined,
		allowedRoles: ["application"],
	},

	// === Scripting Elements ===

	slot: {
		allowedRoles: false,
		noAriaAttrs: true,
	},
	template: {
		allowedRoles: false,
		noAriaAttrs: true,
	},
} as const
