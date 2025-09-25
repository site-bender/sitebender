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
	if (doc && doc.body) {
		doc.body.innerHTML = bodyHtml
	}

	// Best-effort window shim
	const existingWindow = (globalThis as unknown as { window?: Window }).window
	let win = existingWindow ?? (doc.defaultView as unknown as Window | undefined)

	// If defaultView is missing (common in some DOM shims), create a minimal stub
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
