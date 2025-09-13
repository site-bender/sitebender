// Minimal test DOM helper for engine tests
// Creates an HTMLDocument, injects provided body markup, and returns Document/Window.
// This is sufficient for type-checking and unit tests that only read/manipulate DOM APIs.

export default function createTestDomWithBody(bodyHtml: string): {
  document: Document
  window: Window
} {
  // Use the global Document implementation to build a detached HTML document
  const doc = document.implementation.createHTMLDocument("test")
  doc.body.innerHTML = bodyHtml
  // defaultView may be null in some environments; fall back to global window
  const win = (doc.defaultView || (globalThis as unknown as { window?: Window }).window || {}) as Window
  return { document: doc as unknown as Document, window: win }
}
