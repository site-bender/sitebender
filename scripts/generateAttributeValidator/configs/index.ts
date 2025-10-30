import type { AttributeConfig } from "../types/index.ts"

/*++
 + Configuration for all global attribute validators to generate
 + Organized by type for clarity
 */
export const ATTRIBUTE_CONFIGS: ReadonlyArray<AttributeConfig> = [
	{
		attributeName: "class",
		validationType: "string",
		description:
			"Validates class global attribute (space-separated class names)",
	},
	{
		attributeName: "style",
		validationType: "string",
		description: "Validates style global attribute (inline CSS)",
	},
	{
		attributeName: "tabindex",
		validationType: "number",
		description: "Validates tabindex global attribute (tab order)",
	},
	{
		attributeName: "accesskey",
		validationType: "string",
		description: "Validates accesskey global attribute (keyboard shortcut)",
	},
	{
		attributeName: "slot",
		validationType: "string",
		description: "Validates slot global attribute (web component slot name)",
	},
	{
		attributeName: "part",
		validationType: "string",
		description: "Validates part global attribute (space-separated part names)",
	},
	{
		attributeName: "exportparts",
		validationType: "string",
		description: "Validates exportparts global attribute (part mapping)",
	},
	{
		attributeName: "is",
		validationType: "string",
		description: "Validates is global attribute (custom element name)",
	},
	{
		attributeName: "nonce",
		validationType: "string",
		description: "Validates nonce global attribute (cryptographic nonce)",
	},
	{
		attributeName: "contenteditable",
		validationType: "enum",
		validValues: ["true", "false", "plaintext-only", ""],
		description: "Validates contenteditable global attribute",
	},
	{
		attributeName: "draggable",
		validationType: "enum",
		validValues: ["true", "false"],
		description: "Validates draggable global attribute",
	},
	{
		attributeName: "hidden",
		validationType: "enum",
		validValues: ["", "until-found"],
		description: "Validates hidden global attribute",
	},
	{
		attributeName: "enterkeyhint",
		validationType: "enum",
		validValues: ["enter", "done", "go", "next", "previous", "search", "send"],
		description: "Validates enterkeyhint global attribute",
	},
	{
		attributeName: "inputmode",
		validationType: "enum",
		validValues: [
			"none",
			"text",
			"decimal",
			"numeric",
			"tel",
			"search",
			"email",
			"url",
		],
		description: "Validates inputmode global attribute",
	},
	{
		attributeName: "popover",
		validationType: "enum",
		validValues: ["", "auto", "manual"],
		description: "Validates popover global attribute",
	},
	{
		attributeName: "inert",
		validationType: "enum",
		validValues: [""],
		description:
			"Validates inert global attribute (boolean attribute, only empty string allowed)",
	},
]
