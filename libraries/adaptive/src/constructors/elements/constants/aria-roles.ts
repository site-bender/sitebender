/**
 * ARIA Role Constants for HTML Elements
 * Based on W3C ARIA in HTML specification
 * @see https://www.w3.org/TR/html-aria/
 */

// ============================================================================
// ALL VALID ARIA ROLES
// ============================================================================

export const ALL_ARIA_ROLES = [
	// Document structure roles
	"application",
	"article",
	"blockquote",
	"caption",
	"cell",
	"code",
	"columnheader",
	"definition",
	"deletion",
	"directory",
	"document",
	"emphasis",
	"feed",
	"figure",
	"generic",
	"group",
	"heading",
	"img",
	"insertion",
	"list",
	"listitem",
	"math",
	"meter",
	"none",
	"note",
	"paragraph",
	"presentation",
	"row",
	"rowgroup",
	"rowheader",
	"separator",
	"strong",
	"subscript",
	"superscript",
	"table",
	"term",
	"time",
	"toolbar",
	"tooltip",
	// Landmark roles
	"banner",
	"complementary",
	"contentinfo",
	"form",
	"main",
	"navigation",
	"region",
	"search",
	// Widget roles
	"alert",
	"alertdialog",
	"button",
	"checkbox",
	"combobox",
	"dialog",
	"gridcell",
	"link",
	"listbox",
	"log",
	"marquee",
	"menu",
	"menubar",
	"menuitem",
	"menuitemcheckbox",
	"menuitemradio",
	"option",
	"progressbar",
	"radio",
	"radiogroup",
	"scrollbar",
	"searchbox",
	"slider",
	"spinbutton",
	"status",
	"switch",
	"tab",
	"tablist",
	"tabpanel",
	"textbox",
	"timer",
	"tree",
	"treegrid",
	"treeitem",
] as const

// ============================================================================
// ELEMENTS WITH NO ROLES ALLOWED
// ============================================================================

export const NO_ROLE_ELEMENTS = [
	"base",
	"col",
	"colgroup",
	"head",
	"html",
	"body",
	"legend",
	"link",
	"map",
	"meta",
	"meter",
	"noscript",
	"param",
	"script",
	"source",
	"style",
	"template",
	"title",
	"track",
] as const

// ============================================================================
// INTERACTIVE ELEMENT ROLES
// ============================================================================

export const BUTTON_ROLES = [
	"button", // implicit, not recommended to specify
	"checkbox",
	"combobox",
	"gridcell",
	"link",
	"menuitem",
	"menuitemcheckbox",
	"menuitemradio",
	"option",
	"radio",
	"switch",
	"tab",
	"treeitem",
] as const

export const LINK_WITH_HREF_ROLES = [
	"link", // implicit, not recommended
	"button",
	"checkbox",
	"menuitem",
	"menuitemcheckbox",
	"menuitemradio",
	"option",
	"radio",
	"switch",
	"tab",
	"treeitem",
	"generic", // not recommended
] as const

export const DETAILS_ROLES = [
	"group", // implicit, not recommended to specify
] as const

export const SUMMARY_ROLES = [
	"button", // implicit, not recommended to specify
] as const

export const DIALOG_ROLES = [
	"dialog", // implicit
	"alertdialog",
] as const

// ============================================================================
// INPUT ELEMENT ROLES (by type)
// ============================================================================

export const INPUT_BUTTON_ROLES = [
	"button", // implicit
	"checkbox",
	"combobox",
	"gridcell",
	"link",
	"menuitem",
	"menuitemcheckbox",
	"menuitemradio",
	"option",
	"radio",
	"switch",
	"tab",
	"treeitem",
] as const

export const INPUT_CHECKBOX_ROLES = [
	"checkbox", // implicit
	"button",
	"menuitemcheckbox",
	"option",
	"switch",
] as const

export const INPUT_RADIO_ROLES = [
	"radio", // implicit
	"menuitemradio",
] as const

export const INPUT_RANGE_ROLES = [
	"slider", // implicit, not recommended to specify
] as const

export const INPUT_TEXT_ROLES = [
	"textbox", // implicit
	"combobox",
	"searchbox",
	"spinbutton",
] as const

export const INPUT_EMAIL_ROLES = [
	"textbox", // implicit
	"combobox",
] as const

export const INPUT_PASSWORD_ROLES = [
	"textbox", // implicit, not recommended to specify
] as const

export const INPUT_SEARCH_ROLES = [
	"textbox", // implicit
	"combobox",
	"searchbox",
] as const

export const INPUT_TEL_ROLES = [
	"textbox", // implicit
	"combobox",
] as const

export const INPUT_URL_ROLES = [
	"textbox", // implicit
	"combobox",
] as const

export const INPUT_NUMBER_ROLES = [
	"textbox", // implicit
	"combobox",
	"spinbutton",
] as const

export const INPUT_SUBMIT_ROLES = [
	"button", // implicit, not recommended to specify
] as const

export const INPUT_RESET_ROLES = [
	"button", // implicit, not recommended to specify
] as const

export const INPUT_IMAGE_ROLES = [
	"button", // implicit, not recommended to specify
] as const

export const INPUT_FILE_ROLES = [
	"button", // implicit, not recommended to specify
] as const

// ============================================================================
// FORM ELEMENT ROLES
// ============================================================================

export const FORM_ROLES = [
	"form", // implicit
	"search",
	"none",
	"presentation",
] as const

export const FIELDSET_ROLES = [
	"group", // implicit
	"none",
	"presentation",
	"radiogroup",
] as const

export const SELECT_WITHOUT_MULTIPLE_ROLES = [
	"combobox", // implicit
	"menu",
] as const

export const SELECT_WITH_MULTIPLE_ROLES = [
	"listbox", // implicit
] as const

export const OPTGROUP_ROLES = [
	"group", // implicit, not recommended to specify
] as const

export const OPTION_ROLES = [
	"option", // implicit, not recommended to specify
] as const

export const TEXTAREA_ROLES = [
	"textbox", // implicit, not recommended to specify
] as const

export const OUTPUT_ROLES = [
	"status", // implicit, not recommended to specify
] as const

export const PROGRESS_ROLES = [
	"progressbar", // implicit, not recommended to specify
] as const

// ============================================================================
// MEDIA ELEMENT ROLES
// ============================================================================

export const IMG_WITH_ALT_ROLES = [
	"img", // implicit
	"button",
	"checkbox",
	"link",
	"menuitem",
	"menuitemcheckbox",
	"menuitemradio",
	"option",
	"progressbar",
	"radio",
	"scrollbar",
	"separator",
	"slider",
	"switch",
	"tab",
	"treeitem",
] as const

export const IMG_WITH_EMPTY_ALT_ROLES = [
	"none", // implicit
	"presentation",
] as const

export const AUDIO_ROLES = [
	"application", // implicit when controls present
] as const

export const VIDEO_ROLES = [
	"application", // implicit when controls present
] as const

export const CANVAS_ROLES = [
	"img", // when used as image
	// Can have any role when used as container
] as const

export const EMBED_ROLES = [
	"application", // implicit
	"document",
	"img",
] as const

export const IFRAME_ROLES = [
	"application", // implicit
	"document",
	"img",
	"none",
	"presentation",
] as const

export const OBJECT_ROLES = [
	"application", // implicit
	"document",
	"img",
] as const

// ============================================================================
// TABLE ELEMENT ROLES
// ============================================================================

export const TABLE_ROLES = [
	"table", // implicit
	"grid",
	"treegrid",
	"none",
	"presentation",
] as const

export const CAPTION_ROLES = [
	"caption", // implicit, not recommended to specify
] as const

export const THEAD_ROLES = [
	"rowgroup", // implicit, not recommended to specify
] as const

export const TBODY_ROLES = [
	"rowgroup", // implicit, not recommended to specify
] as const

export const TFOOT_ROLES = [
	"rowgroup", // implicit, not recommended to specify
] as const

export const TR_ROLES = [
	"row", // implicit, not recommended to specify
] as const

export const TH_ROLES = [
	"columnheader", // implicit when in column header position
	"rowheader", // implicit when in row header position
	"gridcell",
] as const

export const TD_ROLES = [
	"cell", // implicit
	"gridcell",
] as const

// ============================================================================
// LIST ELEMENT ROLES
// ============================================================================

export const UL_ROLES = [
	"list", // implicit
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
] as const

export const OL_ROLES = [
	"list", // implicit
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
] as const

export const LI_ROLES = [
	"listitem", // implicit when child of ul/ol
	"menuitem",
	"menuitemcheckbox",
	"menuitemradio",
	"option",
	"none",
	"presentation",
	"radio",
	"separator",
	"tab",
	"treeitem",
] as const

export const DL_ROLES = [
	"none",
	"presentation",
] as const

export const DT_ROLES = [
	"term", // implicit
	"listitem",
] as const

export const DD_ROLES = [
	"definition", // implicit
	"listitem",
] as const

// ============================================================================
// SECTIONING ELEMENT ROLES
// ============================================================================

export const MAIN_ROLES = [
	"main", // implicit, not recommended to specify
] as const

export const NAV_ROLES = [
	"navigation", // implicit, not recommended to specify
] as const

export const ASIDE_ROLES = [
	"complementary", // implicit
	"feed",
	"none",
	"note",
	"presentation",
	"region",
	"search",
] as const

export const ARTICLE_ROLES = [
	"article", // implicit
	"application",
	"document",
	"feed",
	"main",
	"none",
	"presentation",
	"region",
] as const

export const SECTION_WITH_NAME_ROLES = [
	"region", // implicit when has accessible name
	"alert",
	"alertdialog",
	"application",
	"banner",
	"complementary",
	"contentinfo",
	"dialog",
	"document",
	"feed",
	"log",
	"main",
	"marquee",
	"navigation",
	"none",
	"note",
	"presentation",
	"search",
	"status",
	"tabpanel",
] as const

export const SECTION_WITHOUT_NAME_ROLES = [
	"generic", // implicit when no accessible name
	...SECTION_WITH_NAME_ROLES,
] as const

export const HEADER_IN_SECTIONING_ROLES = [
	"generic", // implicit when in sectioning content
	"group",
	"none",
	"presentation",
] as const

export const HEADER_NOT_IN_SECTIONING_ROLES = [
	"banner", // implicit when not in sectioning content
	"group",
	"none",
	"presentation",
] as const

export const FOOTER_IN_SECTIONING_ROLES = [
	"generic", // implicit when in sectioning content
	"group",
	"none",
	"presentation",
] as const

export const FOOTER_NOT_IN_SECTIONING_ROLES = [
	"contentinfo", // implicit when not in sectioning content
	"group",
	"none",
	"presentation",
] as const

// ============================================================================
// HEADING ELEMENT ROLES
// ============================================================================

export const HEADING_ROLES = [
	"heading", // implicit
	"none",
	"presentation",
	"tab",
] as const

export const HGROUP_ROLES = [
	"group", // implicit
	"none",
	"presentation",
] as const

// ============================================================================
// OTHER ELEMENT ROLES
// ============================================================================

export const HR_ROLES = [
	"separator", // implicit
	"none",
	"presentation",
] as const

export const P_ROLES = [
	"paragraph", // implicit
] as const

export const BLOCKQUOTE_ROLES = [
	"blockquote", // implicit
] as const

export const DIV_ROLES = ALL_ARIA_ROLES // Can have any role

export const SPAN_ROLES = ALL_ARIA_ROLES // Can have any role

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Check if an element should not have any role attribute
 */
export function isNoRoleElement(tagName: string): boolean {
	return NO_ROLE_ELEMENTS.includes(tagName.toLowerCase() as any)
}

/**
 * Check if an element can have any role
 */
export function canHaveAnyRole(tagName: string): boolean {
	const anyRoleElements = ["div", "span"]
	return anyRoleElements.includes(tagName.toLowerCase())
}

/**
 * Get allowed roles for an input element based on its type
 */
export function getInputAllowedRoles(type: string): readonly string[] {
	switch (type.toLowerCase()) {
		case "button":
			return INPUT_BUTTON_ROLES
		case "checkbox":
			return INPUT_CHECKBOX_ROLES
		case "radio":
			return INPUT_RADIO_ROLES
		case "range":
			return INPUT_RANGE_ROLES
		case "text":
			return INPUT_TEXT_ROLES
		case "email":
			return INPUT_EMAIL_ROLES
		case "password":
			return INPUT_PASSWORD_ROLES
		case "search":
			return INPUT_SEARCH_ROLES
		case "tel":
			return INPUT_TEL_ROLES
		case "url":
			return INPUT_URL_ROLES
		case "number":
			return INPUT_NUMBER_ROLES
		case "submit":
			return INPUT_SUBMIT_ROLES
		case "reset":
			return INPUT_RESET_ROLES
		case "image":
			return INPUT_IMAGE_ROLES
		case "file":
			return INPUT_FILE_ROLES
		case "hidden":
			return [] // No roles for hidden inputs
		case "date":
		case "datetime-local":
		case "month":
		case "time":
		case "week":
			return ["textbox"] // Date/time inputs
		case "color":
			return [] // No specific roles for color input
		default:
			return INPUT_TEXT_ROLES // Default to text roles
	}
}

/**
 * Get allowed roles for select element based on multiple attribute
 */
export function getSelectAllowedRoles(multiple: boolean): readonly string[] {
	return multiple ? SELECT_WITH_MULTIPLE_ROLES : SELECT_WITHOUT_MULTIPLE_ROLES
}

/**
 * Get allowed roles for img element based on alt attribute
 */
export function getImgAllowedRoles(alt: string | undefined): readonly string[] {
	if (alt === "") {
		return IMG_WITH_EMPTY_ALT_ROLES
	}
	return IMG_WITH_ALT_ROLES
}

/**
 * Get allowed roles for section element based on accessible name
 */
export function getSectionAllowedRoles(
	hasAccessibleName: boolean,
): readonly string[] {
	return hasAccessibleName
		? SECTION_WITH_NAME_ROLES
		: SECTION_WITHOUT_NAME_ROLES
}

/**
 * Get allowed roles for header element based on context
 */
export function getHeaderAllowedRoles(
	inSectioningContent: boolean,
): readonly string[] {
	return inSectioningContent
		? HEADER_IN_SECTIONING_ROLES
		: HEADER_NOT_IN_SECTIONING_ROLES
}

/**
 * Get allowed roles for footer element based on context
 */
export function getFooterAllowedRoles(
	inSectioningContent: boolean,
): readonly string[] {
	return inSectioningContent
		? FOOTER_IN_SECTIONING_ROLES
		: FOOTER_NOT_IN_SECTIONING_ROLES
}
