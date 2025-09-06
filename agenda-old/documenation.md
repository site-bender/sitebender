For a Deno/TypeScript/JSX application without React, here are the best documentation generation options:

## 1. **TypeDoc** (Recommended)

TypeDoc is the most comprehensive solution for TypeScript projects.

### Installation:

```bash
deno install --allow-read --allow-write --allow-net -n typedoc https://deno.land/x/typedoc@0.23.0/mod.ts
```

### Basic Usage:

```bash
typedoc --out ./docs ./src
```

### Configuration (typedoc.json):

```json
{
	"entryPoints": ["src/mod.ts"],
	"out": "docs",
	"exclude": ["**/test/**", "**/*.test.ts"],
	"includeVersion": true,
	"excludePrivate": true,
	"excludeProtected": true
}
```

### Advanced JSDoc Example:

````typescript
/**
 * A utility function for formatting dates
 * @param date - The date to format (Date object or ISO string)
 * @param format - The output format ('short' | 'long' | 'iso')
 * @returns Formatted date string
 * @example
 * ```ts
 * formatDate(new Date(), 'short') // "2023-12-25"
 * formatDate('2023-12-25T10:30:00Z', 'long') // "December 25, 2023"
 * ```
 * @throws {TypeError} If date parameter is invalid
 * @since v1.2.0
 */
export function formatDate(
	date: Date | string,
	format: "short" | "long" | "iso" = "short",
): string {
	// implementation
}
````

## 2. **Deno Doc + Custom Generator**

For more control, use Deno's built-in documentation tool:

```bash
# Generate JSON documentation
deno doc --json src/mod.ts > docs.json

# Generate markdown
deno doc src/mod.ts > API.md
```

### Custom Script Example:

```typescript
// scripts/generate-docs.ts
import { doc } from "https://deno.land/x/deno_doc/mod.ts"

async function generateMarkdownDocs() {
	const entries = await doc("src/mod.ts")

	let markdown = "# API Documentation\n\n"

	for (const entry of entries) {
		if (entry.kind === "function" || entry.kind === "class") {
			markdown += `## ${entry.name}\n\n`
			markdown += `${entry.jsDoc?.doc || "No description provided."}\n\n`

			if (entry.jsDoc?.tags) {
				for (const tag of entry.jsDoc.tags) {
					markdown += `**${tag.kind}**: ${tag.doc}\n\n`
				}
			}
		}
	}

	await Deno.writeTextFile("API.md", markdown)
}

generateMarkdownDocs()
```

## 3. **JSDoc with Deno Compatibility**

Traditional JSDoc with Deno-specific setup:

### Installation:

```bash
deno install --allow-read --allow-write -n jsdoc https://cdn.jsdelivr.net/npm/jsdoc/jsdoc.js
```

### Configuration (jsdoc.json):

```json
{
	"plugins": [],
	"recurseDepth": 10,
	"source": {
		"include": ["src"],
		"includePattern": "\\.(jsx|js|ts|tsx)$",
		"excludePattern": "(node_modules/|apps/docs/)"
	},
	"opts": {
		"template": "node_modules/minami",
		"destination": "./apps/docs/docs/",
		"recurse": true
	}
}
```

## 4. **Custom Template with TypeDoc**

For JSX/TSX-specific documentation:

````typescript
// Custom template example for JSX components
/**
 * A custom button component
 * @component
 * @example
 * ```tsx
 * <Button variant="primary" onClick={() => console.log('clicked')}>
 *   Click me
 * </Button>
 * ```
 */
export function Button({
	variant = "default",
	children,
}: {
	variant: "primary" | "secondary" | "default"
	children: string
}) {
	return <button class={`btn btn-${variant}`}>{children}</button>
}
````

## 5. **Build Script Integration**

Add documentation generation to your deno.json:

```json
{
	"tasks": {
		"docs": "typedoc --out docs src/mod.ts",
		"docs:json": "deno doc --json src/mod.ts > apps/docs/api.json",
		"docs:serve": "deno run --allow-net --allow-read https://deno.land/std/http/file_server.ts apps/docs/"
	}
}
```

## Best Practices:

1. **Use TypeDoc** for comprehensive TypeScript projects
2. **Be consistent** with JSDoc tags (`@param`, `@returns`, `@example`)
3. **Include examples** with actual usage code
4. **Document JSX components** with `@component` tag and examples
5. **Automate documentation** as part of your build process
6. **Host documentation** using Deno's file server or GitHub Pages

TypeDoc is generally the best choice as it understands TypeScript types and provides excellent output with minimal configuration.

TypeDoc handles this perfectly! You can specify multiple entry points and files from different directories. Here are several approaches:

## 1. Multiple Entry Points (Recommended)

### Command Line:

```bash
# Specify multiple files/folders
typedoc --out ./jsdocs src/ utils/ components/ main.ts

# Or with explicit paths
typedoc --out ./jsdocs src/utils/**/*.ts src/components/**/*.tsx lib/*.ts
```

### typedoc.json configuration:

```json
{
	"entryPoints": [
		"src/utils/",
		"src/components/",
		"lib/helpers.ts",
		"main.ts"
	],
	"out": "jsdocs",
	"includeVersion": true
}
```

## 2. Using Entry Point Strategy

For more complex projects, use different strategies:

### Package Strategy:

```json
{
	"entryPoints": ["src/utils", "src/components", "lib"],
	"out": "jsdocs",
	"entryPointStrategy": "packages"
}
```

### Expand Strategy (for scattered files):

```json
{
	"entryPoints": ["**/*.ts", "**/*.tsx"],
	"out": "jsdocs",
	"entryPointStrategy": "expand",
	"exclude": ["node_modules/**", "dist/**", "**/*.test.ts"]
}
```

## 3. Globs and Patterns

TypeDoc supports glob patterns:

```json
{
	"entryPoints": [
		"src/**/*.ts",
		"components/**/*.tsx",
		"lib/**/*.ts",
		"!**/*.test.ts", // exclude test files
		"!**/__mocks__/**" // exclude mock directories
	],
	"out": "jsdocs"
}
```

## 4. Multiple Configuration Files

If you need different settings for different areas:

**typedoc.utils.json:**

```json
{
	"entryPoints": ["src/utils", "lib/helpers"],
	"out": "jsdocs/utils",
	"name": "Utility Functions"
}
```

**typedoc.components.json:**

```json
{
	"entryPoints": ["src/components", "ui/**/*.tsx"],
	"out": "jsdocs/components",
	"name": "UI Components"
}
```

Run them separately:

```bash
typedoc --options typedoc.utils.json
typedoc --options typedoc.components.json
```

## 5. Real-world Example Structure

Suppose you have this project structure:

```
project/
├── src/
│   ├── utils/
│   │   └── math.ts
│   └── api/
│       └── client.ts
├── components/
│   ├── Button.tsx
│   └── Modal.tsx
├── lib/
│   └── helpers.ts
├── main.ts
└── config.ts
```

### Configuration for this structure:

```json
{
	"entryPoints": [
		"src/utils/math.ts",
		"src/api/client.ts",
		"components/**/*.tsx",
		"lib/helpers.ts",
		"main.ts",
		"config.ts"
	],
	"out": "jsdocs",
	"exclude": ["**/*.test.ts", "**/__tests__/**"],
	"excludePrivate": true,
	"includeVersion": true
}
```

## 6. Advanced: Custom Entry Point Resolution

For maximum control, create a build script:

```typescript
// scripts/generate-docs.ts
import { Application } from "https://deno.land/x/typedoc@0.23.0/mod.ts"

const app = new Application()

app.bootstrap({
	entryPoints: [
		"src/utils/**/*.ts",
		"components/**/*.tsx",
		"lib/*.ts",
		"main.ts",
	],
	out: "jsdocs",
	exclude: ["**/*.test.ts"],
})

const project = app.convert()

if (project) {
	await app.generateDocs(project, "jsdocs")
	console.log("Documentation generated in jsdocs/")
}
```

Run with:

```bash
deno run --allow-read --allow-write scripts/generate-docs.ts
```

## 7. Handling Different Documentation Needs

If different folders need different documentation settings:

```json
{
	"entryPoints": [
		{ "path": "src/utils", "name": "Utilities" },
		{ "path": "components", "name": "UI Components" },
		{ "path": "lib", "name": "Library Functions" }
	],
	"out": "jsdocs",
	"entryPointStrategy": "packages"
}
```

## Key Points:

1. **TypeDoc can handle files from anywhere** - they don't need to be under a single parent directory
2. **Use glob patterns** (`**/*.ts`) to include files recursively
3. **Use exclusion patterns** (`!**/*.test.ts`) to avoid unwanted files
4. **Multiple entry points** can be files or directories
5. **Consider using the "packages" strategy** for logically separated codebases

The documentation will be generated in a unified way regardless of where the source files are located, with proper navigation between modules from different directories.
