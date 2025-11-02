/*++
 + CSS styling generator types
 + Configuration types for CSS scaffold generation
 */

/*++
 + SubElement defines a sub-element selector within a component
 + Examples: label, input[type="text"], .help-text
 */
export type SubElement = {
	readonly tagName: string
	readonly selector?: string
	readonly states?: ReadonlyArray<string>
}

/*++
 + CSSConfig defines the complete configuration for CSS generation
 + Used by the generator to create component CSS scaffolds
 */
export type CSSConfig = {
	readonly componentName: string
	readonly className: string
	readonly subElements?: ReadonlyArray<SubElement>
	readonly includeAccessibility?: boolean
	readonly includeResponsive?: boolean
	readonly includePrint?: boolean
}

/*++
 + Default configuration values
 */
export const DEFAULT_CSS_CONFIG = {
	includeAccessibility: true,
	includeResponsive: true,
	includePrint: true,
} as const
