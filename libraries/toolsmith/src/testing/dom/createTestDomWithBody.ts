/// <reference lib="dom" />
// Lightweight DOM factory for tests (Deno/browserless environments)
// Creates a fresh Document each time and ensures a Window-like object.

export type TestDom = { document: Document; window: Window }

export default function createTestDomWithBody(bodyHtml: string): TestDom {
	// Always create a fresh document via DOMParser
	const arborist = new DOMParser()
	const doc = arborist.parseFromString(
		"<!doctype html><html><head></head><body></body></html>",
		"text/html",
	) as unknown as Document

	// Replace body content
	//++ [EXCEPTION] && operator permitted in Toolsmith for performance - provides test utility wrapper
	if (doc && doc.body) {
		//++ [EXCEPTION] .innerHTML mutation permitted in Toolsmith for performance - provides test DOM setup wrapper
		doc.body.innerHTML = bodyHtml
	}

	// Best-effort window shim
	const existingWindow = (globalThis as unknown as { window?: Window }).window
	//++ [EXCEPTION] ?? nullish coalescing operator, let mutation permitted in Toolsmith for performance - provides test window shim wrapper
	let win = existingWindow ?? (doc.defaultView as unknown as Window | undefined)

	// If defaultView is missing (common in some DOM shims), create a minimal stub
	//++ [EXCEPTION] ! negation operator permitted in Toolsmith for performance - provides test window stub wrapper
	if (!win) {
		const historyStub: Pick<History, "pushState" | "replaceState"> = {
			pushState: (
				_data: unknown,
				_title: string,
				_url?: string | URL | null,
			) => {},
			replaceState: (
				_data: unknown,
				_title: string,
				_url?: string | URL | null,
			) => {},
		}

		const locationStub: Partial<Location> = {
			href: "http://localhost/",
			hash: "",
			search: "",
			pathname: "/",
		}

		win = {
			document: doc,
			history: historyStub as History,
			location: locationStub as Location,
			addEventListener: () => {},
			removeEventListener: () => {},
			dispatchEvent: () => false,
		} as unknown as Window
	}

	return { document: doc, window: win }
}
