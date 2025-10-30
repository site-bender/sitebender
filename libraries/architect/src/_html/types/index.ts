import type { Child } from "../../types/index.ts"
import type { PrintableCharacter } from "@sitebender/toolsmith/types/index.ts"

/*++
 + Global attribute value types
 */
export type AutocapitalizeType =
	| "off"
	| "none"
	| "on"
	| "sentences"
	| "words"
	| "characters"

export type ContenteditableType = "true" | "false" | "plaintext-only" | ""
export type DirType = "ltr" | "rtl" | "auto"
export type DraggableType = TrueFalse

export type EnterKeyHintType =
	| "enter"
	| "done"
	| "go"
	| "next"
	| "previous"
	| "search"
	| "send"

export type HiddenType = "" | "until-found"

export type InputModeType =
	| "none"
	| "text"
	| "decimal"
	| "numeric"
	| "tel"
	| "search"
	| "email"
	| "url"

export type PopoverType = "" | "auto" | "manual"
export type SpellcheckType = TrueFalse
export type TrueFalse = "true" | "false"
export type YesNo = "yes" | "no"

/*++
 + Global HTML attributes allowed on all elements
 */
export type GlobalAttributes = Readonly<{
	accesskey?: PrintableCharacter
	autocapitalize?: AutocapitalizeType
	class?: string | ReadonlyArray<string>
	contenteditable?: ContenteditableType
	dir?: DirType
	draggable?: DraggableType
	enterkeyhint?: EnterKeyHintType
	exportparts?: string
	hidden?: HiddenType
	id?: string
	inert?: ""
	inputmode?: InputModeType
	is?: string
	lang?: string
	nonce?: string
	part?: string
	popover?: PopoverType
	slot?: string
	spellcheck?: SpellcheckType
	style?: string
	tabindex?: string
	title?: string
	translate?: YesNo
	[key: string]: unknown // Allow data-*, aria-*, and role attributes
}>

/*++
 + Base props type - all element components accept children and global attributes
 */
export type BaseProps =
	& Readonly<{
		children?: ReadonlyArray<Child>
	}>
	& GlobalAttributes
