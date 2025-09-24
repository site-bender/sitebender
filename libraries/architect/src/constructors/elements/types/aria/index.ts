/**
 * Comprehensive ARIA (Accessible Rich Internet Applications) type definitions
 * Based on WAI-ARIA 1.2 specification
 * @see https://www.w3.org/TR/wai-aria-1.2/
 */

// ============================================================================
// ARIA Roles
// ============================================================================

// Abstract roles (not to be used directly)
type AbstractRole =
	| "command"
	| "composite"
	| "input"
	| "landmark"
	| "range"
	| "roletype"
	| "section"
	| "sectionhead"
	| "select"
	| "structure"
	| "widget"
	| "window"

// Document structure roles
export type DocumentStructureRole =
	| "application"
	| "article"
	| "blockquote"
	| "caption"
	| "cell"
	| "code"
	| "columnheader"
	| "definition"
	| "deletion"
	| "directory"
	| "document"
	| "emphasis"
	| "feed"
	| "figure"
	| "generic"
	| "group"
	| "heading"
	| "img"
	| "insertion"
	| "list"
	| "listitem"
	| "math"
	| "meter"
	| "none"
	| "note"
	| "paragraph"
	| "presentation"
	| "row"
	| "rowgroup"
	| "rowheader"
	| "separator"
	| "strong"
	| "subscript"
	| "superscript"
	| "table"
	| "term"
	| "time"
	| "toolbar"
	| "tooltip"

// Landmark roles
export type LandmarkRole =
	| "banner"
	| "complementary"
	| "contentinfo"
	| "form"
	| "main"
	| "navigation"
	| "region"
	| "search"

// Widget roles
export type WidgetRole =
	| "alert"
	| "alertdialog"
	| "button"
	| "checkbox"
	| "combobox"
	| "dialog"
	| "gridcell"
	| "link"
	| "listbox"
	| "log"
	| "marquee"
	| "menu"
	| "menubar"
	| "menuitem"
	| "menuitemcheckbox"
	| "menuitemradio"
	| "option"
	| "progressbar"
	| "radio"
	| "radiogroup"
	| "scrollbar"
	| "searchbox"
	| "slider"
	| "spinbutton"
	| "status"
	| "switch"
	| "tab"
	| "tablist"
	| "tabpanel"
	| "textbox"
	| "timer"
	| "tree"
	| "treegrid"
	| "treeitem"

// Live region roles
export type LiveRegionRole =
	| "alert"
	| "log"
	| "marquee"
	| "status"
	| "timer"

// All concrete roles
export type AriaRole = DocumentStructureRole | LandmarkRole | WidgetRole

// ============================================================================
// ARIA Properties
// ============================================================================

// Boolean ARIA attributes
export type AriaBooleanAttribute =
	| "aria-atomic"
	| "aria-busy"
	| "aria-checked"
	| "aria-disabled"
	| "aria-expanded"
	| "aria-grabbed"
	| "aria-hidden"
	| "aria-modal"
	| "aria-multiline"
	| "aria-multiselectable"
	| "aria-pressed"
	| "aria-readonly"
	| "aria-required"
	| "aria-selected"

// Tristate ARIA attributes (true | false | "mixed" | undefined)
export type AriaTristate = boolean | "true" | "false" | "mixed"

// Token ARIA attributes with specific values
export type AriaAutocomplete = "none" | "inline" | "list" | "both"
export type AriaCurrent =
	| boolean
	| "page"
	| "step"
	| "location"
	| "date"
	| "time"
	| "true"
	| "false"
export type AriaDropEffect =
	| "none"
	| "copy"
	| "execute"
	| "link"
	| "move"
	| "popup"
export type AriaHasPopup =
	| boolean
	| "menu"
	| "listbox"
	| "tree"
	| "grid"
	| "dialog"
	| "true"
	| "false"
export type AriaInvalid = boolean | "grammar" | "spelling" | "true" | "false"
export type AriaLive = "off" | "assertive" | "polite"
export type AriaOrientation = "horizontal" | "vertical" | "undefined"
export type AriaRelevant =
	| "additions"
	| "additions text"
	| "all"
	| "removals"
	| "text"
export type AriaSort = "none" | "ascending" | "descending" | "other"

// ============================================================================
// Complete ARIA Attributes Interface
// ============================================================================

export interface AriaAttributes {
	// Widget attributes
	"aria-autocomplete"?: AriaAutocomplete
	"aria-checked"?: AriaTristate
	"aria-disabled"?: boolean
	"aria-errormessage"?: string
	"aria-expanded"?: boolean
	"aria-haspopup"?: AriaHasPopup
	"aria-hidden"?: boolean
	"aria-invalid"?: AriaInvalid
	"aria-label"?: string
	"aria-level"?: number
	"aria-modal"?: boolean
	"aria-multiline"?: boolean
	"aria-multiselectable"?: boolean
	"aria-orientation"?: AriaOrientation
	"aria-placeholder"?: string
	"aria-pressed"?: AriaTristate
	"aria-readonly"?: boolean
	"aria-required"?: boolean
	"aria-selected"?: boolean
	"aria-sort"?: AriaSort
	"aria-valuemax"?: number
	"aria-valuemin"?: number
	"aria-valuenow"?: number
	"aria-valuetext"?: string

	// Live region attributes
	"aria-atomic"?: boolean
	"aria-busy"?: boolean
	"aria-live"?: AriaLive
	"aria-relevant"?: AriaRelevant

	// Drag and drop attributes
	"aria-dropeffect"?: AriaDropEffect
	"aria-grabbed"?: boolean

	// Relationship attributes
	"aria-activedescendant"?: string
	"aria-colcount"?: number
	"aria-colindex"?: number
	"aria-colspan"?: number
	"aria-controls"?: string
	"aria-describedby"?: string
	"aria-description"?: string
	"aria-details"?: string
	"aria-flowto"?: string
	"aria-labelledby"?: string
	"aria-owns"?: string
	"aria-posinset"?: number
	"aria-rowcount"?: number
	"aria-rowindex"?: number
	"aria-rowspan"?: number
	"aria-setsize"?: number

	// Global attributes
	"aria-braillelabel"?: string
	"aria-brailleroledescription"?: string
	"aria-current"?: AriaCurrent
	"aria-keyshortcuts"?: string
	"aria-roledescription"?: string

	// Role attribute
	role?: AriaRole
}

// ============================================================================
// Element-Specific ARIA Types
// ============================================================================

// Button permitted ARIA roles
export type ButtonAriaRole =
	| "checkbox"
	| "combobox"
	| "link"
	| "menuitem"
	| "menuitemcheckbox"
	| "menuitemradio"
	| "option"
	| "radio"
	| "switch"
	| "tab"

export interface ButtonAriaAttributes {
	role?: ButtonAriaRole
	"aria-pressed"?: AriaTristate
	"aria-expanded"?: boolean
	"aria-controls"?: string
	"aria-haspopup"?: AriaHasPopup
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-disabled"?: boolean
	"aria-hidden"?: boolean
	"aria-current"?: AriaCurrent
	"aria-live"?: AriaLive
	"aria-atomic"?: boolean
	"aria-busy"?: boolean
	"aria-relevant"?: AriaRelevant
	"aria-keyshortcuts"?: string
}

// Anchor permitted ARIA roles
export type AnchorAriaRole =
	| "button"
	| "checkbox"
	| "menuitem"
	| "menuitemcheckbox"
	| "menuitemradio"
	| "option"
	| "radio"
	| "switch"
	| "tab"
	| "treeitem"
	| "presentation"
	| "none"

export interface AnchorAriaAttributes {
	role?: AnchorAriaRole
	"aria-current"?: AriaCurrent
	"aria-expanded"?: boolean
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-disabled"?: boolean
	"aria-hidden"?: boolean
	"aria-haspopup"?: AriaHasPopup
	"aria-pressed"?: AriaTristate
	"aria-selected"?: boolean
	"aria-controls"?: string
}

// Div - can have any role
export interface DivAriaAttributes extends AriaAttributes {}

// Span - can have any role
export interface SpanAriaAttributes extends AriaAttributes {}

// Input attributes vary by type
export interface InputTextAriaAttributes {
	role?: "textbox" | "searchbox" | "combobox"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-placeholder"?: string
	"aria-required"?: boolean
	"aria-invalid"?: AriaInvalid
	"aria-readonly"?: boolean
	"aria-disabled"?: boolean
	"aria-autocomplete"?: AriaAutocomplete
	"aria-multiline"?: false // Always false for input
	"aria-hidden"?: boolean
}

export interface InputCheckboxAriaAttributes {
	role?: "checkbox" | "menuitemcheckbox" | "switch"
	"aria-checked"?: AriaTristate
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-required"?: boolean
	"aria-invalid"?: AriaInvalid
	"aria-disabled"?: boolean
	"aria-hidden"?: boolean
}

export interface InputRadioAriaAttributes {
	role?: "radio" | "menuitemradio"
	"aria-checked"?: boolean
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-required"?: boolean
	"aria-invalid"?: AriaInvalid
	"aria-disabled"?: boolean
	"aria-hidden"?: boolean
	"aria-posinset"?: number
	"aria-setsize"?: number
}

// Additional Input type ARIA interfaces
export interface InputButtonAriaAttributes extends ButtonAriaAttributes {}

export interface InputColorAriaAttributes {
	role?: "button"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-disabled"?: boolean
	"aria-hidden"?: boolean
}

export interface InputDateAriaAttributes {
	role?: "textbox"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-placeholder"?: string
	"aria-required"?: boolean
	"aria-invalid"?: AriaInvalid
	"aria-readonly"?: boolean
	"aria-disabled"?: boolean
	"aria-hidden"?: boolean
}

export interface InputDateTimeLocalAriaAttributes
	extends InputDateAriaAttributes {}

export interface InputEmailAriaAttributes extends InputTextAriaAttributes {}

export interface InputFileAriaAttributes {
	role?: "button"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-required"?: boolean
	"aria-invalid"?: AriaInvalid
	"aria-disabled"?: boolean
	"aria-hidden"?: boolean
}

export interface InputHiddenAriaAttributes {
	// Hidden inputs should not have ARIA attributes except aria-hidden
	"aria-hidden"?: boolean
}

export interface InputImageAriaAttributes {
	role?: "button"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-disabled"?: boolean
	"aria-hidden"?: boolean
	"aria-pressed"?: AriaTristate
}

export interface InputMonthAriaAttributes extends InputDateAriaAttributes {}

export interface InputNumberAriaAttributes {
	role?: "spinbutton" | "textbox"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-placeholder"?: string
	"aria-required"?: boolean
	"aria-invalid"?: AriaInvalid
	"aria-readonly"?: boolean
	"aria-disabled"?: boolean
	"aria-hidden"?: boolean
	"aria-valuemin"?: number
	"aria-valuemax"?: number
	"aria-valuenow"?: number
	"aria-valuetext"?: string
}

export interface InputPasswordAriaAttributes extends InputTextAriaAttributes {}

export interface InputRangeAriaAttributes {
	role?: "slider"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-required"?: boolean
	"aria-invalid"?: AriaInvalid
	"aria-disabled"?: boolean
	"aria-hidden"?: boolean
	"aria-valuemin"?: number
	"aria-valuemax"?: number
	"aria-valuenow"?: number
	"aria-valuetext"?: string
	"aria-orientation"?: AriaOrientation
}

export interface InputResetAriaAttributes extends ButtonAriaAttributes {}

export interface InputSearchAriaAttributes extends InputTextAriaAttributes {
	role?: "searchbox" | "textbox" | "combobox"
}

export interface InputSubmitAriaAttributes extends ButtonAriaAttributes {}

export interface InputTelAriaAttributes extends InputTextAriaAttributes {}

export interface InputTimeAriaAttributes extends InputDateAriaAttributes {}

export interface InputUrlAriaAttributes extends InputTextAriaAttributes {}

export interface InputWeekAriaAttributes extends InputDateAriaAttributes {}

// Form elements
export interface FormAriaAttributes {
	role?: "form" | "search" | "presentation" | "none"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
}

export interface LabelAriaAttributes {
	role?: never // Labels should not have a role
	"aria-hidden"?: boolean
}

export interface TextAreaAriaAttributes {
	role?: "textbox"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-placeholder"?: string
	"aria-required"?: boolean
	"aria-invalid"?: AriaInvalid
	"aria-readonly"?: boolean
	"aria-disabled"?: boolean
	"aria-hidden"?: boolean
	"aria-multiline"?: true // Always true for textarea
}

// Select roles depend on multiple attribute (see getSelectAllowedRoles)
export interface SelectAriaAttributes {
	role?: "combobox" | "menu" | "listbox"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-required"?: boolean
	"aria-invalid"?: AriaInvalid
	"aria-disabled"?: boolean
	"aria-hidden"?: boolean
	"aria-expanded"?: boolean
	"aria-haspopup"?: "listbox"
	"aria-activedescendant"?: string
}

export interface OptionAriaAttributes {
	role?: "option"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-disabled"?: boolean
	"aria-hidden"?: boolean
	"aria-selected"?: boolean
	"aria-posinset"?: number
	"aria-setsize"?: number
}

export interface OptGroupAriaAttributes {
	role?: "group"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-disabled"?: boolean
	"aria-hidden"?: boolean
}

export interface DetailsAriaAttributes {
	role?: "group" | "region"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
	"aria-expanded"?: boolean
}

export interface SummaryAriaAttributes {
	role?: "button"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
	"aria-expanded"?: boolean
	"aria-controls"?: string
}

// Heading elements (matching HEADING_ROLES from aria-roles.ts)
export interface HeadingAriaAttributes {
	role?: "heading" | "none" | "presentation" | "tab"
	"aria-level"?: 1 | 2 | 3 | 4 | 5 | 6
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
}

// Navigation elements (matching NAV_ROLES from aria-roles.ts)
export interface NavAriaAttributes {
	role?: "navigation"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
	"aria-orientation"?: AriaOrientation
}

// Article (matching ARTICLE_ROLES from aria-roles.ts)
export interface ArticleAriaAttributes {
	role?:
		| "article"
		| "application"
		| "document"
		| "feed"
		| "main"
		| "none"
		| "presentation"
		| "region"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
	"aria-posinset"?: number
	"aria-setsize"?: number
}

// Section (roles depend on accessible name - see getSectionAllowedRoles)
export interface SectionAriaAttributes {
	role?:
		| "region"
		| "alert"
		| "alertdialog"
		| "application"
		| "banner"
		| "complementary"
		| "contentinfo"
		| "dialog"
		| "document"
		| "feed"
		| "log"
		| "main"
		| "marquee"
		| "navigation"
		| "none"
		| "note"
		| "presentation"
		| "search"
		| "status"
		| "tabpanel"
		| "generic"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
}

// Main (matching MAIN_ROLES from aria-roles.ts)
export interface MainAriaAttributes {
	role?: "main"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
}

// List elements (UL/OL matching UL_ROLES/OL_ROLES from aria-roles.ts)
export interface ListAriaAttributes {
	role?:
		| "list"
		| "directory"
		| "group"
		| "listbox"
		| "menu"
		| "menubar"
		| "none"
		| "presentation"
		| "radiogroup"
		| "tablist"
		| "toolbar"
		| "tree"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
}

export interface ListItemAriaAttributes {
	role?:
		| "listitem"
		| "menuitem"
		| "menuitemcheckbox"
		| "menuitemradio"
		| "option"
		| "none"
		| "presentation"
		| "radio"
		| "separator"
		| "tab"
		| "treeitem"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
	"aria-posinset"?: number
	"aria-setsize"?: number
	"aria-selected"?: boolean
}

// Table elements (matching TABLE_ROLES from aria-roles.ts)
export interface TableAriaAttributes {
	role?: "table" | "grid" | "treegrid" | "none" | "presentation"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
	"aria-colcount"?: number
	"aria-rowcount"?: number
}

// Image (roles depend on alt attribute - see getImgAllowedRoles)
export interface ImageAriaAttributes {
	role?:
		| "img"
		| "button"
		| "checkbox"
		| "link"
		| "menuitem"
		| "menuitemcheckbox"
		| "menuitemradio"
		| "option"
		| "progressbar"
		| "radio"
		| "scrollbar"
		| "separator"
		| "slider"
		| "switch"
		| "tab"
		| "treeitem"
		| "none"
		| "presentation"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
}

// Form-specific ARIA interfaces (matching FIELDSET_ROLES from aria-roles.ts)
export interface FieldsetAriaAttributes {
	role?: "group" | "none" | "presentation" | "radiogroup"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-disabled"?: boolean
	"aria-hidden"?: boolean
}

export interface LegendAriaAttributes {
	role?: never // Legends should not have a role
	"aria-hidden"?: boolean
}

export interface MeterAriaAttributes {
	role?: never // Meter should not have a role (in NO_ROLE_ELEMENTS)
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
	"aria-valuemin"?: number
	"aria-valuemax"?: number
	"aria-valuenow"?: number
	"aria-valuetext"?: string
}

export interface OutputAriaAttributes {
	role?: "status"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
	"aria-live"?: AriaLive
	"aria-atomic"?: boolean
	"aria-relevant"?: AriaRelevant
}

export interface ProgressAriaAttributes {
	role?: "progressbar"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
	"aria-valuemin"?: number
	"aria-valuemax"?: number
	"aria-valuenow"?: number
	"aria-valuetext"?: string
}

// Elements that should typically not have ARIA attributes (matching NO_ROLE_ELEMENTS)
export interface NoAriaAttributes {
	role?: never
	"aria-hidden"?: boolean // Only exception - can be hidden
}

// Additional interfaces for elements that don't exist yet but need them
export interface SourceAriaAttributes {
	role?: never // Source should not have a role (in NO_ROLE_ELEMENTS)
	"aria-hidden"?: boolean
}

export interface TrackAriaAttributes {
	role?: never // Track should not have a role (in NO_ROLE_ELEMENTS)
	"aria-hidden"?: boolean
}

export interface ColAriaAttributes {
	role?: never // Col should not have a role (in NO_ROLE_ELEMENTS)
	"aria-hidden"?: boolean
}

export interface ColGroupAriaAttributes {
	role?: never // ColGroup should not have a role (in NO_ROLE_ELEMENTS)
	"aria-hidden"?: boolean
}

export interface MetaAriaAttributes {
	role?: never // Meta should not have a role (in NO_ROLE_ELEMENTS)
	"aria-hidden"?: boolean
}

export interface StyleAriaAttributes {
	role?: never // Style should not have a role (in NO_ROLE_ELEMENTS)
	"aria-hidden"?: boolean
}

export interface ScriptAriaAttributes {
	role?: never // Script should not have a role (in NO_ROLE_ELEMENTS)
	"aria-hidden"?: boolean
}

export interface TitleAriaAttributes {
	role?: never // Title should not have a role (in NO_ROLE_ELEMENTS)
	"aria-hidden"?: boolean
}

export interface BaseAriaAttributes {
	role?: never // Base should not have a role (in NO_ROLE_ELEMENTS)
	"aria-hidden"?: boolean
}

export interface TemplateAriaAttributes {
	role?: never // Template should not have a role (in NO_ROLE_ELEMENTS)
	"aria-hidden"?: boolean
}

export interface HeadAriaAttributes {
	role?: never // Head should not have a role (in NO_ROLE_ELEMENTS)
	"aria-hidden"?: boolean
}

export interface BodyAriaAttributes {
	role?: never // Body should not have a role (in NO_ROLE_ELEMENTS)
	"aria-hidden"?: boolean
}

export interface HtmlAriaAttributes {
	role?: never // Html should not have a role (in NO_ROLE_ELEMENTS)
	"aria-hidden"?: boolean
}

export interface NoScriptAriaAttributes {
	role?: never // NoScript should not have a role (in NO_ROLE_ELEMENTS)
	"aria-hidden"?: boolean
}

export interface LinkAriaAttributes {
	role?: never // Link element should not have a role (in NO_ROLE_ELEMENTS)
	"aria-hidden"?: boolean
}

export interface MapAriaAttributes {
	role?: never // Map should not have a role (in NO_ROLE_ELEMENTS)
	"aria-hidden"?: boolean
}

// Table-specific ARIA interfaces (matching constants from aria-roles.ts)
export interface CaptionAriaAttributes {
	role?: "caption"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
}

export interface TheadAriaAttributes {
	role?: "rowgroup"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
}

export interface TbodyAriaAttributes {
	role?: "rowgroup"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
}

export interface TfootAriaAttributes {
	role?: "rowgroup"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
}

export interface TrAriaAttributes {
	role?: "row"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
	"aria-rowindex"?: number
}

export interface ThAriaAttributes {
	role?: "columnheader" | "rowheader" | "gridcell"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
	"aria-sort"?: AriaSort
	"aria-colindex"?: number
	"aria-colspan"?: number
	"aria-rowindex"?: number
	"aria-rowspan"?: number
}

export interface TdAriaAttributes {
	role?: "cell" | "gridcell"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
	"aria-colindex"?: number
	"aria-colspan"?: number
	"aria-rowindex"?: number
	"aria-rowspan"?: number
}

// Definition list interfaces (matching constants from aria-roles.ts)
export interface DlAriaAttributes {
	role?: "none" | "presentation"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
}

export interface DtAriaAttributes {
	role?: "term" | "listitem"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
}

export interface DdAriaAttributes {
	role?: "definition" | "listitem"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
}

// Additional sectioning interfaces
export interface AsideAriaAttributes {
	role?:
		| "complementary"
		| "feed"
		| "none"
		| "note"
		| "presentation"
		| "region"
		| "search"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
}

export interface HeaderAriaAttributes {
	// Roles depend on context (see getHeaderAllowedRoles)
	role?: "banner" | "generic" | "group" | "none" | "presentation"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
}

export interface FooterAriaAttributes {
	// Roles depend on context (see getFooterAllowedRoles)
	role?: "contentinfo" | "generic" | "group" | "none" | "presentation"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
}

// Other elements
export interface HrAriaAttributes {
	role?: "separator" | "none" | "presentation"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
	"aria-orientation"?: AriaOrientation
}

export interface PAriaAttributes {
	role?: "paragraph"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
}

export interface BlockquoteAriaAttributes {
	role?: "blockquote"
	"aria-label"?: string
	"aria-labelledby"?: string
	"aria-describedby"?: string
	"aria-hidden"?: boolean
}

// ============================================================================
// Type utilities
// ============================================================================

/**
 * Extract only the ARIA attributes that are valid for a specific element
 */
export type ExtractAriaAttributes<T> = T extends AriaAttributes ? T : never

/**
 * Type guard to check if a value is a valid ARIA role
 */
export function isValidAriaRole(role: string): role is AriaRole {
	const validRoles = new Set<string>([
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
	])

	return validRoles.has(role)
}

/**
 * Type guard to check if a value is a valid ARIA attribute name
 */
export function isValidAriaAttribute(
	attr: string,
): attr is keyof AriaAttributes {
	return attr.startsWith("aria-") || attr === "role"
}
