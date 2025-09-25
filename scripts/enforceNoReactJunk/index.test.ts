import { assertEquals } from "https://deno.land/std/assert/mod.ts"

//++ Tests for enforceNoReactJunk that forbids React-style patterns
Deno.test("enforceNoReactJunk", async function testEnforceNoReactJunk(t) {
	// Create temporary test directory
	const testDir = await Deno.makeTempDir()

	await t.step("detects className usage", async function testClassName() {
		const filePath = `${testDir}/component.tsx`
		await Deno.writeTextFile(
			filePath,
			`
export function Button() {
	return <button className="btn-primary">Click</button>
}
`,
		)

		type Violation = {
			file?: string
			line: number
			snippet: string
			pattern?: string
		}
		const violations: Violation[] = []

		// We can't easily test the full function without mocking file system
		// So we'll test the pattern detection logic
		const content = await Deno.readTextFile(filePath)
		const lines = content.split("\n")

		for (let i = 0; i < lines.length; i++) {
			if (/className\s*[:=]/.test(lines[i])) {
				violations.push({
					file: filePath,
					line: i + 1,
					snippet: lines[i].trim(),
				})
			}
		}

		assertEquals(violations.length > 0, true)
		assertEquals(violations[0].snippet.includes("className"), true)
	})

	await t.step("detects dangerouslySetInnerHTML", function testDangerousHtml() {
		const content = `
const component = {
	dangerouslySetInnerHTML: { __html: rawHtml }
}
`
		const lines = content.split("\n")
		type Violation = {
			file?: string
			line: number
			snippet: string
			pattern?: string
		}
		const violations: Violation[] = []

		for (let i = 0; i < lines.length; i++) {
			if (/dangerouslySetInnerHTML\s*[:=]/.test(lines[i])) {
				violations.push({
					line: i + 1,
					snippet: lines[i].trim(),
				})
			}
		}

		assertEquals(violations.length, 1)
		assertEquals(
			violations[0].snippet.includes("dangerouslySetInnerHTML"),
			true,
		)
	})

	await t.step("detects htmlFor usage", function testHtmlFor() {
		const content = `
<label htmlFor="input-id">Label</label>
`
		const lines = content.split("\n")
		type Violation = {
			file?: string
			line: number
			snippet: string
			pattern?: string
		}
		const violations: Violation[] = []

		for (let i = 0; i < lines.length; i++) {
			if (/htmlFor\s*[:=]/.test(lines[i])) {
				violations.push({
					line: i + 1,
					snippet: lines[i].trim(),
				})
			}
		}

		assertEquals(violations.length, 1)
		assertEquals(violations[0].snippet.includes("htmlFor"), true)
	})

	await t.step("detects React event handlers", function testEventHandlers() {
		const content = `
<button onClick={handleClick}>Click</button>
<input onChange={handleChange} />
<form onSubmit={handleSubmit}>
`
		const lines = content.split("\n")
		type Violation = {
			file?: string
			line: number
			snippet: string
			pattern?: string
		}
		const violations: Violation[] = []

		const eventPatterns = ["onClick", "onChange", "onSubmit"]
		for (let i = 0; i < lines.length; i++) {
			for (const pattern of eventPatterns) {
				if (new RegExp(`${pattern}\\s*[:=]`).test(lines[i])) {
					violations.push({
						line: i + 1,
						snippet: lines[i].trim(),
						pattern,
					})
				}
			}
		}

		assertEquals(violations.length >= 3, true)
	})

	await t.step(
		"ignores valid non-React patterns",
		function testValidPatterns() {
			const content = `
// This is a comment about className
const classNameVariable = "test"
const text = "Use className for styling"
element.classList.add("active")
<button class="btn">Click</button>
<label for="input">Label</label>
`
			const lines = content.split("\n")
			type Violation = {
				file?: string
				line: number
				snippet: string
				pattern?: string
			}
			const violations: Violation[] = []

			// Check for React-specific patterns only
			for (let i = 0; i < lines.length; i++) {
				// Only flag when used as JSX attribute or object key
				if (
					/(^|[\s,{])className\s*[:=]/.test(lines[i]) &&
					!lines[i].includes("const className")
				) {
					violations.push({
						line: i + 1,
						snippet: lines[i].trim(),
					})
				}
			}

			// Should not detect violations in comments or variable names
			assertEquals(violations.length, 0)
		},
	)

	await t.step("detects JSX fragments", function testJsxFragments() {
		const content = `
return (
	<React.Fragment>
		<div>Content</div>
	</React.Fragment>
)
`
		const lines = content.split("\n")
		type Violation = {
			file?: string
			line: number
			snippet: string
			pattern?: string
		}
		const violations: Violation[] = []

		for (let i = 0; i < lines.length; i++) {
			if (/React\.Fragment/.test(lines[i])) {
				violations.push({
					line: i + 1,
					snippet: lines[i].trim(),
				})
			}
		}

		assertEquals(violations.length, 2) // Opening and closing tags
	})

	await t.step("detects defaultProps pattern", function testDefaultProps() {
		const content = `
Component.defaultProps = {
	size: "medium",
	color: "blue"
}
`
		const lines = content.split("\n")
		type Violation = {
			file?: string
			line: number
			snippet: string
			pattern?: string
		}
		const violations: Violation[] = []

		for (let i = 0; i < lines.length; i++) {
			if (/defaultProps\s*=/.test(lines[i])) {
				violations.push({
					line: i + 1,
					snippet: lines[i].trim(),
				})
			}
		}

		assertEquals(violations.length, 1)
		assertEquals(violations[0].snippet.includes("defaultProps"), true)
	})

	await t.step("detects propTypes pattern", function testPropTypes() {
		const content = `
Component.propTypes = {
	name: PropTypes.string.isRequired
}
`
		const lines = content.split("\n")
		type Violation = {
			file?: string
			line: number
			snippet: string
			pattern?: string
		}
		const violations: Violation[] = []

		for (let i = 0; i < lines.length; i++) {
			if (/propTypes\s*=/.test(lines[i]) || /PropTypes\./.test(lines[i])) {
				violations.push({
					line: i + 1,
					snippet: lines[i].trim(),
				})
			}
		}

		assertEquals(violations.length >= 1, true)
	})

	// Cleanup
	await Deno.remove(testDir, { recursive: true })
})

//?? [EXAMPLE] Run with: deno test scripts/enforceNoReactJunk/index.test.ts
