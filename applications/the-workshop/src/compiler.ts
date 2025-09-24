// Minimal JSX "compiler" for the Playground demo
// - Parses a very small subset of JSX to an AST we control
// - Returns the original code as compiledCode for display purposes

export type CompileResult = {
	success: boolean;
	compiledCode: string;
	ast: unknown | null;
	errors: string[];
};

type SimpleAst = {
	tag: string;
	props: Record<string, string>;
	children: Array<string | SimpleAst>;
};

export function compileJSX(code: string): CompileResult {
	try {
		// Extremely small JSX parser: find first <tag ...> ... </tag>
		// Good enough for our demo and unit test expectations.
		const jsxMatch = code.match(
			/<([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>([\s\S]*?)<\/\1>/,
		);
		if (!jsxMatch) {
			return { success: true, compiledCode: code, ast: null, errors: [] };
		}

		const [, tag, rawAttrs, inner] = jsxMatch;
		const props: Record<string, string> = {};
		for (
			const attr of rawAttrs.match(
				/\b([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*"([^"]*)"/g,
			) ?? []
		) {
			const m = attr.match(/^(\w[\w:-]*)\s*=\s*"([^"]*)"$/);
			if (m) props[m[1]] = m[2];
		}

		const childText = inner.trim();
		const ast: SimpleAst = {
			tag,
			props,
			children: childText ? [childText] : [],
		};

		return { success: true, compiledCode: code, ast, errors: [] };
	} catch (e) {
		return {
			success: false,
			compiledCode: code,
			ast: null,
			errors: [String(e)],
		};
	}
}

export function formatAST(ast: unknown): string {
	try {
		return JSON.stringify(ast, null, 2);
	} catch (_e) {
		return String(ast);
	}
}

export default { compileJSX, formatAST };
