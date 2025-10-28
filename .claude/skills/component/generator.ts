/**
 * Core component generator - transforms ComponentConfig into TypeScript code
 * Can be imported and used programmatically
 */

import type { ComponentConfig } from "./types.ts"

//++ Main API: generates component files from configuration
export async function generateComponent(config: ComponentConfig): Promise<void> {
	const { name, targetFolder, tagName, isHtmlElement } = config

	// Validate configuration
	validateConfig(config)

	// Prepend underscore for HTML wrapper components
	const componentName = isHtmlElement ? `_${name}` : name

	// Build full path: targetFolder/componentName or just componentName
	const fullPath = targetFolder ? `${targetFolder}/${componentName}` : componentName

	console.log(`Generating component: ${componentName}`)
	if (targetFolder) {
		console.log(`Target folder: ${targetFolder}`)
	}

	// Create directory
	await Deno.mkdir(fullPath, { recursive: true })

	// Generate index.ts
	const componentCode = generateComponentCode(config, componentName)
	await Deno.writeTextFile(`${fullPath}/index.ts`, componentCode)

	// Generate index.test.ts
	const testCode = generateTestCode(config, componentName)
	await Deno.writeTextFile(`${fullPath}/index.test.ts`, testCode)

	// Generate index.css
	const cssCode = generateCssCode(config, componentName)
	await Deno.writeTextFile(`${fullPath}/index.css`, cssCode)

	console.log("✓ Component generated successfully!")
	console.log(`\nCreated:`)
	console.log(`  ${fullPath}/index.ts`)
	console.log(`  ${fullPath}/index.test.ts`)
	console.log(`  ${fullPath}/index.css`)
}

//++ Validates the component configuration
function validateConfig(config: ComponentConfig): void {
	const { name, tagName } = config

	if (!name || typeof name !== "string") {
		throw new Error("Component name is required and must be a string")
	}

	if (!isPascalCase(name)) {
		throw new Error(`Component name must be in PascalCase: ${name}`)
	}

	if (!tagName || typeof tagName !== "string") {
		throw new Error("tagName is required and must be a string")
	}

	if (tagName !== tagName.toUpperCase()) {
		throw new Error(`tagName must be uppercase: ${tagName}`)
	}
}

//++ Checks if a string is in PascalCase format
function isPascalCase(str: string): boolean {
	if (!/^[A-Z]/.test(str)) return false
	if (!/^[a-zA-Z0-9]+$/.test(str)) return false
	if (/[A-Z]{2,}/.test(str)) return false
	return true
}

//++ Generates the component code from configuration
function generateComponentCode(config: ComponentConfig, componentName: string): string {
	const { name, tagName, description, isHtmlElement } = config
	const desc = description || `${name} component wrapper`

	if (isHtmlElement) {
		return `import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"
import type { BaseProps } from "@sitebender/pagewright/_html/types/index.ts"

export type Props =
	& BaseProps
	& Readonly<{
		// TODO: Add component-specific props here
	}>

/*++
 + ${desc}
 */
export default function ${componentName}(props: Props): VirtualNode {
	const children = props.children || []

	return {
		_tag: "element" as const,
		tagName: "${tagName}",
		attributes: {},
		children: children as ReadonlyArray<VirtualNode>,
	}
}
`
	}

	return `import type { VirtualNode } from "@sitebender/toolsmith/types/virtualNode/index.ts"

export type Props = Readonly<{
	children?: ReadonlyArray<unknown>
	[key: string]: unknown
}>

/*++
 + ${desc}
 */
export default function ${componentName}(props: Props): VirtualNode {
	const children = props.children || []

	return {
		_tag: "element" as const,
		tagName: "${tagName}",
		attributes: {},
		children: children as ReadonlyArray<VirtualNode>,
	}
}
`
}

//++ Generates test code
function generateTestCode(config: ComponentConfig, componentName: string): string {
	const testFunctionName = componentName.replace(/^_/, "").toLowerCase()

	return `import { assert } from "@std/assert"
import isVirtualNode from "@sitebender/toolsmith/predicates/isVirtualNode/index.ts"
import _P from "@sitebender/pagewright/_html/_P/index.ts"

import ${componentName} from "./index.ts"

Deno.test("${componentName} component", async function ${testFunctionName}Tests(t) {
	await t.step(
		"returns a VirtualNode",
		function returnsVirtualNode() {
			const component = ${componentName}({})

			assert(isVirtualNode(component))
		},
	)

	await t.step(
		"handles children",
		function handlesChildren() {
			const text = { _tag: "text" as const, content: "test content" }
			const paragraph = _P({ children: [text] })
			const component = ${componentName}({ children: [paragraph] })

			assert(isVirtualNode(component))
		},
	)
})
`
}

//++ Generates CSS code
function generateCssCode(config: ComponentConfig, componentName: string): string {
	return `/*++
 + ${componentName} component styles
 */
`
}
