/**
 * Example of refactoring getValue to separate DOM interaction from business logic
 * 
 * This demonstrates the "thin DOM layer" pattern where:
 * 1. DOM access is isolated to a minimal interface
 * 2. Business logic is pure and testable without DOM
 * 3. The DOM layer can be easily swapped (real DOM, deno-dom, etc.)
 */

import type { ElementConfig, GlobalAttributes } from "../../types/index.ts"
import Error from "../../constructors/Error/index.ts"
import getSelector from "../getSelector/index.ts"
import isDefined from "../isDefined/index.ts"
import isUndefined from "../isUndefined/index.ts"
import not from "../predicates/not/index.ts"

// ============================================================================
// STEP 1: Define a DOM abstraction interface
// ============================================================================

interface DOMAdapter {
	querySelector(selector: string): Element | null
	getElementValue(element: Element): string
	getElementTagName(element: Element): string
	getElementType(element: Element): string | undefined
	getDataAttribute(element: Element, key: string): string | undefined
	getInnerHTML(element: Element): string
	isCheckbox(element: Element): boolean
	isChecked(element: Element): boolean
}

// ============================================================================
// STEP 2: Implement the pure business logic using the adapter
// ============================================================================

/**
 * Pure function that extracts value from element using the adapter
 * This is completely testable without any DOM
 */
const extractValuePure = (
	element: Element,
	adapter: DOMAdapter
): string => {
	const tagName = adapter.getElementTagName(element).toLowerCase()
	
	switch (tagName) {
		case "input": {
			if (adapter.isCheckbox(element)) {
				return adapter.isChecked(element) ? "on" : ""
			}
			return adapter.getElementValue(element)
		}
		
		case "select":
		case "textarea":
			return adapter.getElementValue(element)
		
		case "table":
		case "data":
			return adapter.getDataAttribute(element, "value") || ""
		
		default: {
			const dataValue = adapter.getDataAttribute(element, "value")
			if (dataValue) return dataValue
			return adapter.getInnerHTML(element)
		}
	}
}

/**
 * Pure function for the main getValue logic
 * Takes the adapter as a dependency injection
 */
const getValuePure = (
	config: ElementConfig,
	localValues: GlobalAttributes | undefined,
	adapter: DOMAdapter
) => {
	// Check for local values first (no DOM needed)
	const localValue = getLocalValue(config, localValues)
	if (isDefined(localValue)) {
		return localValue
	}
	
	// Generate selector (pure logic)
	const selector = getSelector(config)
	if (not(selector)) {
		return {
			left: [Error(config)(config.tag)(`Invalid selector.`)],
		}
	}
	
	// Use adapter for DOM access
	const element = adapter.querySelector(selector)
	if (isUndefined(element)) {
		return {
			left: [Error(config)(config.tag)(`Element at \`${selector}\` not found.`)],
		}
	}
	
	// Extract value using pure logic
	const value = extractValuePure(element, adapter)
	return { right: value }
}

// Helper function (pure, no DOM)
const getLocalValue = (
	config: ElementConfig,
	localValues?: GlobalAttributes
): string | undefined => {
	if (!localValues) return undefined
	
	// Check various config properties for matching local values
	if (config.id && localValues.id === config.id) {
		return localValues.value
	}
	if (config.name && localValues.name === config.name) {
		return localValues.value  
	}
	
	return undefined
}

// ============================================================================
// STEP 3: Create adapter implementations
// ============================================================================

/**
 * Real browser DOM adapter
 */
class BrowserDOMAdapter implements DOMAdapter {
	querySelector(selector: string): Element | null {
		return document.querySelector(selector)
	}
	
	getElementValue(element: Element): string {
		if ('value' in element) {
			return (element as any).value || ""
		}
		return ""
	}
	
	getElementTagName(element: Element): string {
		return element.tagName
	}
	
	getElementType(element: Element): string | undefined {
		if ('type' in element) {
			return (element as any).type
		}
		return undefined
	}
	
	getDataAttribute(element: Element, key: string): string | undefined {
		if ('dataset' in element) {
			return (element as any).dataset[key]
		}
		return undefined
	}
	
	getInnerHTML(element: Element): string {
		if ('innerHTML' in element) {
			return (element as any).innerHTML
		}
		return ""
	}
	
	isCheckbox(element: Element): boolean {
		return this.getElementType(element) === "checkbox"
	}
	
	isChecked(element: Element): boolean {
		if ('checked' in element) {
			return (element as any).checked
		}
		return false
	}
}

/**
 * Deno-dom adapter for testing
 */
class DenoDOMAdapter implements DOMAdapter {
	private document: any
	
	constructor(document: any) {
		this.document = document
	}
	
	querySelector(selector: string): Element | null {
		return this.document.querySelector(selector)
	}
	
	getElementValue(element: Element): string {
		return (element as any).value || ""
	}
	
	getElementTagName(element: Element): string {
		return (element as any).tagName || ""
	}
	
	getElementType(element: Element): string | undefined {
		return (element as any).type
	}
	
	getDataAttribute(element: Element, key: string): string | undefined {
		const dataset = (element as any).dataset
		return dataset ? dataset[key] : undefined
	}
	
	getInnerHTML(element: Element): string {
		return (element as any).innerHTML || ""
	}
	
	isCheckbox(element: Element): boolean {
		return this.getElementType(element) === "checkbox"
	}
	
	isChecked(element: Element): boolean {
		return (element as any).checked || false
	}
}

/**
 * Test adapter that doesn't need any DOM
 */
class TestAdapter implements DOMAdapter {
	private elements: Map<string, any> = new Map()
	
	addElement(selector: string, element: any) {
		this.elements.set(selector, element)
	}
	
	querySelector(selector: string): Element | null {
		return this.elements.get(selector) || null
	}
	
	getElementValue(element: any): string {
		return element.value || ""
	}
	
	getElementTagName(element: any): string {
		return element.tagName || "DIV"
	}
	
	getElementType(element: any): string | undefined {
		return element.type
	}
	
	getDataAttribute(element: any, key: string): string | undefined {
		return element.dataset?.[key]
	}
	
	getInnerHTML(element: any): string {
		return element.innerHTML || ""
	}
	
	isCheckbox(element: any): boolean {
		return element.type === "checkbox"
	}
	
	isChecked(element: any): boolean {
		return element.checked || false
	}
}

// ============================================================================
// STEP 4: Create the final API that selects the right adapter
// ============================================================================

/**
 * Refactored getValue that automatically selects the right adapter
 */
const getValueRefactored = (config: ElementConfig) => (localValues?: GlobalAttributes) => {
	// Auto-detect environment and choose adapter
	let adapter: DOMAdapter
	
	if (typeof document !== 'undefined') {
		// Browser environment
		adapter = new BrowserDOMAdapter()
	} else if (globalThis.document) {
		// Deno with deno-dom
		adapter = new DenoDOMAdapter(globalThis.document)
	} else {
		// No DOM available
		return {
			left: [Error(config)(config.tag)(`Cannot find window.document.`)],
		}
	}
	
	return getValuePure(config, localValues, adapter)
}

// ============================================================================
// STEP 5: Export for testing
// ============================================================================

// Export everything for testing
export {
	// Main functions
	getValueRefactored,
	getValuePure,
	extractValuePure,
	
	// Adapters
	BrowserDOMAdapter,
	DenoDOMAdapter,
	TestAdapter,
	
	// Types
	type DOMAdapter,
}

// ============================================================================
// BENEFITS OF THIS APPROACH
// ============================================================================

/**
 * 1. TESTABILITY: The pure functions can be tested without any DOM
 * 
 * Example test:
 * ```typescript
 * it("extracts value from input", () => {
 *   const adapter = new TestAdapter()
 *   adapter.addElement("#test", { 
 *     tagName: "INPUT", 
 *     value: "test-value",
 *     type: "text"
 *   })
 *   
 *   const result = getValuePure(
 *     { id: "test" },
 *     undefined,
 *     adapter
 *   )
 *   
 *   expect(result).toEqual({ right: "test-value" })
 * })
 * ```
 * 
 * 2. FLEXIBILITY: Easy to swap implementations
 *    - Use real DOM in browser
 *    - Use deno-dom in Deno tests
 *    - Use test adapter in unit tests
 *    - Easy to add new adapters (jsdom, happy-dom, etc.)
 * 
 * 3. SEPARATION OF CONCERNS:
 *    - Business logic is pure and isolated
 *    - DOM interaction is minimal and contained
 *    - Easy to understand and maintain
 * 
 * 4. PERFORMANCE: Can optimize adapters independently
 *    - Cache selectors
 *    - Batch DOM operations
 *    - Use different strategies per environment
 * 
 * 5. TYPE SAFETY: The adapter interface ensures consistency
 */