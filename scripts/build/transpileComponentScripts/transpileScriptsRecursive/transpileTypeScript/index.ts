import toKebabCase from "../../../../utilities/toKebabCase/index.ts"

//++ Transpiles TypeScript content to JavaScript by removing types and converting imports
export default function transpileTypeScript(
	tsContent: string,
	sourceFile: string,
): string {
	try {
		// Basic TypeScript to JavaScript conversion
		// This is a simplified transpiler - for production you might want to use esbuild or swc
		const jsContent = tsContent
			// Remove type-only imports
			.replace(/import\s+type\s+[^;]+;?\s*\n?/g, "")
			// Convert relative path segments to kebab-case (for static scripts)
			.replace(/from\s+["'](\.\.?\/[^"']*?)["']/g, (match, path) => {
				if (
					sourceFile.includes("static/scripts") ||
					sourceFile.includes("dist/scripts")
				) {
					// Split path into segments and convert directory names to kebab-case
					const segments = path.split("/")
					const convertedSegments = segments.map((segment: string) => {
						// Only convert segments that look like directory names (not . or .. or files)
						if (segment === "." || segment === ".." || segment.includes(".")) {
							return segment
						}
						return toKebabCase(segment)
					})
					return `from "${convertedSegments.join("/")}"`
				}
				return match
			})
			// Convert .ts/.tsx imports to .js (fix double extension issue)
			.replace(/from\s+["']([^"']+)\.tsx?["']/g, 'from "$1.js"')
			// Convert path-mapped imports to relative paths (simplified)
			.replace(/from\s+["']~([^"']+)["']/g, (_match, path) => {
				// Convert ~utilities/foo to relative path
				// For component scripts, we're typically in dist/scripts/components/...
				// and need to reach src/
				return `from "../../../src/${path}.js"`
			})
			// Remove type assertions (as Type)
			.replace(/\(\s*([^)]+)\s+as\s+[^)]+\s*\)/g, "($1)")
			.replace(/(\w+)\s+as\s+[^,);]+/g, "$1")
			// Remove JSX type annotations but keep JSX syntax
			.replace(/:\s*JSX\.Element/g, "")
			// Remove function parameter types (improved regex)
			.replace(/(\w+)\s*:\s*[^,)={}]+(?=[,)=])/g, "$1")
			// Remove explicit return types from functions
			.replace(/\)\s*:\s*[^{=]+(?=\s*[{=])/g, ")")
			// Remove interface declarations
			.replace(/interface\s+\w+[^}]*}\s*\n?/g, "")
			// Remove type aliases
			.replace(/type\s+\w+\s*=[^;]+;?\s*\n?/g, "")
			// Remove export type statements
			.replace(/export\s+type\s+[^;]+;?\s*\n?/g, "")
			// Remove standalone type declarations
			.replace(/^\s*type\s+[^=]+=[^;]+;?\s*$/gm, "")
			// Remove generic type parameters from function calls
			.replace(/(\w+)<[^>]+>(?=\s*\()/g, "$1")

		return jsContent
	} catch (error: unknown) {
		console.warn(
			`Warning: TypeScript transpilation had issues for ${sourceFile}: ${
				(error as Error).message
			}`,
		)
		// Return original content as fallback
		return tsContent
	}
}
