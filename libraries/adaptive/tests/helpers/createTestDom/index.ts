import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.43/deno-dom-wasm.ts"

/**
 * Creates a test DOM for testing DOM-related functions
 * Uses deno_dom which is a Deno implementation of DOM/HTML parser
 */
export default function createTestDom(
	html = "<!DOCTYPE html><html><head></head><body></body></html>",
) {
	const doc = new DOMParser().parseFromString(html, "text/html")
	if (!doc) {
		throw new Error("Failed to parse HTML")
	}

	return {
		document: doc,
		window: {
			document: doc,
			localStorage: new Map<string, string>(),
			sessionStorage: new Map<string, string>(),
			location: {
				href: "http://localhost:3000/",
				search: "",
				pathname: "/",
			},
		},
	}
}

/**
 * Creates a test DOM with specific HTML content in the body
 */
export function createTestDomWithBody(bodyContent: string) {
	return createTestDom(
		`<!DOCTYPE html><html><head></head><body>${bodyContent}</body></html>`,
	)
}