import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import * as fc from "fast-check"
import collectScriptElements from "../../collectScriptElements/index.ts"
import collectLinkElements from "../../collectLinkElements/index.ts"

describe("DOM Element Collection Utilities", () => {
	describe("collectScriptElements", () => {
		describe("basic functionality", () => {
			it("should return empty array for empty input", () => {
				expect(collectScriptElements([])).toEqual([])
			})

			it("should filter out non-SCRIPT elements", () => {
				const elements = [
					{ tagName: "DIV", id: "div1" },
					{ tagName: "SPAN", id: "span1" },
					{ tagName: "P", id: "p1" },
				]
				
				expect(collectScriptElements(elements)).toEqual([])
			})

			it("should return only SCRIPT elements", () => {
				const elements = [
					{ tagName: "DIV", id: "div1" },
					{ tagName: "SCRIPT", id: "script1", src: "app.js" },
					{ tagName: "SPAN", id: "span1" },
					{ tagName: "SCRIPT", id: "script2", src: "vendor.js" },
					{ tagName: "P", id: "p1" },
				]
				
				const scripts = collectScriptElements(elements)
				expect(scripts).toHaveLength(2)
				expect(scripts[0].id).toBe("script1")
				expect(scripts[1].id).toBe("script2")
			})

			it("should handle elements with null/undefined tagName", () => {
				const elements = [
					{ tagName: null } as any,
					{ tagName: undefined } as any,
					{ tagName: "SCRIPT", id: "script1" },
					{} as any, // No tagName property
				]
				
				const scripts = collectScriptElements(elements)
				expect(scripts).toHaveLength(1)
				expect(scripts[0].id).toBe("script1")
			})

			it("should preserve element properties", () => {
				const scriptElement = {
					tagName: "SCRIPT",
					id: "test-script",
					src: "https://example.com/script.js",
					async: true,
					defer: false,
					type: "module",
					integrity: "sha384-...",
					crossOrigin: "anonymous",
				}
				
				const elements = [scriptElement]
				const scripts = collectScriptElements(elements)
				
				expect(scripts[0]).toBe(scriptElement) // Same reference
				expect(scripts[0]).toEqual(scriptElement) // All properties preserved
			})

			it("should handle case-sensitive tagName", () => {
				const elements = [
					{ tagName: "script", id: "lowercase" },
					{ tagName: "Script", id: "titlecase" },
					{ tagName: "SCRIPT", id: "uppercase" },
					{ tagName: "ScRiPt", id: "mixed" },
				]
				
				const scripts = collectScriptElements(elements)
				expect(scripts).toHaveLength(1)
				expect(scripts[0].id).toBe("uppercase")
			})
		})

		describe("real-world scenarios", () => {
			it("should collect inline scripts", () => {
				const elements = [
					{
						tagName: "SCRIPT",
						id: "inline-script",
						innerHTML: "console.log('Hello')",
						src: undefined,
					},
					{ tagName: "DIV" },
				]
				
				const scripts = collectScriptElements(elements)
				expect(scripts).toHaveLength(1)
				expect(scripts[0].innerHTML).toBe("console.log('Hello')")
			})

			it("should collect external scripts", () => {
				const elements = [
					{
						tagName: "SCRIPT",
						src: "https://cdn.example.com/lib.js",
						async: true,
					},
					{
						tagName: "SCRIPT",
						src: "/js/app.js",
						defer: true,
					},
				]
				
				const scripts = collectScriptElements(elements)
				expect(scripts).toHaveLength(2)
				expect(scripts[0].src).toContain("cdn.example.com")
				expect(scripts[1].src).toContain("/js/app.js")
			})

			it("should handle script elements with various types", () => {
				const elements = [
					{ tagName: "SCRIPT", type: "text/javascript" },
					{ tagName: "SCRIPT", type: "module" },
					{ tagName: "SCRIPT", type: "application/json" },
					{ tagName: "SCRIPT", type: "text/template" },
					{ tagName: "DIV" },
				]
				
				const scripts = collectScriptElements(elements)
				expect(scripts).toHaveLength(4)
				expect(scripts.map(s => s.type)).toEqual([
					"text/javascript",
					"module",
					"application/json",
					"text/template",
				])
			})
		})

		describe("type safety", () => {
			it("should work with custom element types", () => {
				interface CustomElement {
					tagName: string
					customProp: number
				}
				
				const elements: CustomElement[] = [
					{ tagName: "SCRIPT", customProp: 1 },
					{ tagName: "DIV", customProp: 2 },
					{ tagName: "SCRIPT", customProp: 3 },
				]
				
				const scripts = collectScriptElements(elements)
				expect(scripts).toHaveLength(2)
				expect(scripts[0].customProp).toBe(1)
				expect(scripts[1].customProp).toBe(3)
			})

			it("should maintain element type through filtering", () => {
				interface ScriptElement {
					tagName: string
					src?: string
					async?: boolean
				}
				
				const elements: ScriptElement[] = [
					{ tagName: "SCRIPT", src: "app.js", async: true },
					{ tagName: "LINK" },
				]
				
				const scripts = collectScriptElements(elements)
				// TypeScript should know scripts is ScriptElement[]
				scripts.forEach(script => {
					expect(script.tagName).toBe("SCRIPT")
				})
			})
		})
	})

	describe("collectLinkElements", () => {
		describe("basic functionality", () => {
			it("should return empty array for empty input", () => {
				expect(collectLinkElements([])).toEqual([])
			})

			it("should filter out non-LINK elements", () => {
				const elements = [
					{ tagName: "DIV", id: "div1" },
					{ tagName: "SPAN", id: "span1" },
					{ tagName: "A", id: "a1" },
				]
				
				expect(collectLinkElements(elements)).toEqual([])
			})

			it("should return only LINK elements", () => {
				const elements = [
					{ tagName: "DIV", id: "div1" },
					{ tagName: "LINK", id: "link1", href: "style.css" },
					{ tagName: "A", id: "a1" },
					{ tagName: "LINK", id: "link2", href: "icon.png" },
					{ tagName: "SCRIPT", id: "script1" },
				]
				
				const links = collectLinkElements(elements)
				expect(links).toHaveLength(2)
				expect(links[0].id).toBe("link1")
				expect(links[1].id).toBe("link2")
			})

			it("should handle elements with null/undefined tagName", () => {
				const elements = [
					{ tagName: null } as any,
					{ tagName: undefined } as any,
					{ tagName: "LINK", id: "link1" },
					{} as any, // No tagName property
				]
				
				const links = collectLinkElements(elements)
				expect(links).toHaveLength(1)
				expect(links[0].id).toBe("link1")
			})

			it("should preserve element properties", () => {
				const linkElement = {
					tagName: "LINK",
					id: "test-link",
					rel: "stylesheet",
					href: "https://example.com/style.css",
					type: "text/css",
					media: "screen",
					integrity: "sha384-...",
					crossOrigin: "anonymous",
				}
				
				const elements = [linkElement]
				const links = collectLinkElements(elements)
				
				expect(links[0]).toBe(linkElement) // Same reference
				expect(links[0]).toEqual(linkElement) // All properties preserved
			})

			it("should handle case-sensitive tagName", () => {
				const elements = [
					{ tagName: "link", id: "lowercase" },
					{ tagName: "Link", id: "titlecase" },
					{ tagName: "LINK", id: "uppercase" },
					{ tagName: "LiNk", id: "mixed" },
				]
				
				const links = collectLinkElements(elements)
				expect(links).toHaveLength(1)
				expect(links[0].id).toBe("uppercase")
			})
		})

		describe("real-world scenarios", () => {
			it("should collect stylesheet links", () => {
				const elements = [
					{
						tagName: "LINK",
						rel: "stylesheet",
						href: "/css/main.css",
					},
					{
						tagName: "LINK",
						rel: "stylesheet",
						href: "/css/theme.css",
						media: "screen and (min-width: 768px)",
					},
					{ tagName: "STYLE" },
				]
				
				const links = collectLinkElements(elements)
				expect(links).toHaveLength(2)
				expect(links.every(l => l.rel === "stylesheet")).toBe(true)
			})

			it("should collect various link types", () => {
				const elements = [
					{ tagName: "LINK", rel: "stylesheet", href: "style.css" },
					{ tagName: "LINK", rel: "icon", href: "favicon.ico" },
					{ tagName: "LINK", rel: "preconnect", href: "https://fonts.googleapis.com" },
					{ tagName: "LINK", rel: "manifest", href: "manifest.json" },
					{ tagName: "LINK", rel: "canonical", href: "https://example.com/page" },
					{ tagName: "META", name: "description" },
				]
				
				const links = collectLinkElements(elements)
				expect(links).toHaveLength(5)
				
				const rels = links.map(l => l.rel)
				expect(rels).toContain("stylesheet")
				expect(rels).toContain("icon")
				expect(rels).toContain("preconnect")
				expect(rels).toContain("manifest")
				expect(rels).toContain("canonical")
			})

			it("should handle link elements with different attributes", () => {
				const elements = [
					{
						tagName: "LINK",
						rel: "preload",
						as: "font",
						href: "/fonts/main.woff2",
						type: "font/woff2",
						crossOrigin: "anonymous",
					},
					{
						tagName: "LINK",
						rel: "alternate",
						type: "application/rss+xml",
						title: "RSS Feed",
						href: "/feed.xml",
					},
				]
				
				const links = collectLinkElements(elements)
				expect(links).toHaveLength(2)
				expect(links[0].as).toBe("font")
				expect(links[1].title).toBe("RSS Feed")
			})
		})

		describe("type safety", () => {
			it("should work with custom element types", () => {
				interface CustomElement {
					tagName: string
					customProp: string
				}
				
				const elements: CustomElement[] = [
					{ tagName: "LINK", customProp: "value1" },
					{ tagName: "A", customProp: "value2" },
					{ tagName: "LINK", customProp: "value3" },
				]
				
				const links = collectLinkElements(elements)
				expect(links).toHaveLength(2)
				expect(links[0].customProp).toBe("value1")
				expect(links[1].customProp).toBe("value3")
			})
		})
	})

	describe("collectScriptElements and collectLinkElements comparison", () => {
		it("should filter different element types from same array", () => {
			const elements = [
				{ tagName: "SCRIPT", id: "script1" },
				{ tagName: "LINK", id: "link1" },
				{ tagName: "DIV", id: "div1" },
				{ tagName: "SCRIPT", id: "script2" },
				{ tagName: "LINK", id: "link2" },
				{ tagName: "SPAN", id: "span1" },
			]
			
			const scripts = collectScriptElements(elements)
			const links = collectLinkElements(elements)
			
			expect(scripts).toHaveLength(2)
			expect(links).toHaveLength(2)
			
			expect(scripts.map(s => s.id)).toEqual(["script1", "script2"])
			expect(links.map(l => l.id)).toEqual(["link1", "link2"])
			
			// No overlap
			const scriptIds = new Set(scripts.map(s => s.id))
			const linkIds = new Set(links.map(l => l.id))
			expect([...scriptIds].some(id => linkIds.has(id))).toBe(false)
		})

		it("should handle mixed head elements", () => {
			const headElements = [
				{ tagName: "TITLE", textContent: "Page Title" },
				{ tagName: "META", name: "description", content: "Description" },
				{ tagName: "LINK", rel: "stylesheet", href: "style.css" },
				{ tagName: "SCRIPT", src: "app.js" },
				{ tagName: "LINK", rel: "icon", href: "favicon.ico" },
				{ tagName: "SCRIPT", src: "analytics.js", async: true },
				{ tagName: "STYLE", textContent: "body { margin: 0; }" },
			]
			
			const scripts = collectScriptElements(headElements)
			const links = collectLinkElements(headElements)
			
			expect(scripts).toHaveLength(2)
			expect(links).toHaveLength(2)
			
			expect(scripts.every(s => s.tagName === "SCRIPT")).toBe(true)
			expect(links.every(l => l.tagName === "LINK")).toBe(true)
		})
	})

	describe("property-based tests", () => {
		describe("collectScriptElements properties", () => {
			it("should always return a subset of input", () => {
				fc.assert(
					fc.property(
						fc.array(
							fc.record({
								tagName: fc.constantFrom("SCRIPT", "DIV", "SPAN", "LINK", "P"),
								id: fc.string(),
							})
						),
						(elements) => {
							const scripts = collectScriptElements(elements)
							
							// Result should be subset
							expect(scripts.length).toBeLessThanOrEqual(elements.length)
							
							// Every result element should be in original
							scripts.forEach(script => {
								expect(elements).toContain(script)
							})
						}
					),
					{ numRuns: 100 }
				)
			})

			it("should preserve order of SCRIPT elements", () => {
				fc.assert(
					fc.property(
						fc.array(
							fc.record({
								tagName: fc.constantFrom("SCRIPT", "DIV", "SPAN"),
								id: fc.integer({ min: 0 }),
							})
						),
						(elements) => {
							const scripts = collectScriptElements(elements)
							
							// Check order is preserved
							for (let i = 1; i < scripts.length; i++) {
								const prevIndex = elements.indexOf(scripts[i - 1])
								const currIndex = elements.indexOf(scripts[i])
								expect(prevIndex).toBeLessThan(currIndex)
							}
						}
					),
					{ numRuns: 100 }
				)
			})

			it("should be idempotent", () => {
				fc.assert(
					fc.property(
						fc.array(
							fc.record({
								tagName: fc.constantFrom("SCRIPT", "DIV", "SPAN"),
								id: fc.string(),
							})
						),
						(elements) => {
							const once = collectScriptElements(elements)
							const twice = collectScriptElements(once)
							
							expect(twice).toEqual(once)
						}
					),
					{ numRuns: 100 }
				)
			})

			it("should return only elements with SCRIPT tagName", () => {
				fc.assert(
					fc.property(
						fc.array(
							fc.record({
								tagName: fc.string(),
								id: fc.string(),
							})
						),
						(elements) => {
							const scripts = collectScriptElements(elements)
							
							scripts.forEach(script => {
								expect(script.tagName).toBe("SCRIPT")
							})
						}
					),
					{ numRuns: 100 }
				)
			})
		})

		describe("collectLinkElements properties", () => {
			it("should always return a subset of input", () => {
				fc.assert(
					fc.property(
						fc.array(
							fc.record({
								tagName: fc.constantFrom("LINK", "DIV", "A", "SCRIPT", "META"),
								id: fc.string(),
							})
						),
						(elements) => {
							const links = collectLinkElements(elements)
							
							// Result should be subset
							expect(links.length).toBeLessThanOrEqual(elements.length)
							
							// Every result element should be in original
							links.forEach(link => {
								expect(elements).toContain(link)
							})
						}
					),
					{ numRuns: 100 }
				)
			})

			it("should preserve order of LINK elements", () => {
				fc.assert(
					fc.property(
						fc.array(
							fc.record({
								tagName: fc.constantFrom("LINK", "DIV", "A"),
								id: fc.integer({ min: 0 }),
							})
						),
						(elements) => {
							const links = collectLinkElements(elements)
							
							// Check order is preserved
							for (let i = 1; i < links.length; i++) {
								const prevIndex = elements.indexOf(links[i - 1])
								const currIndex = elements.indexOf(links[i])
								expect(prevIndex).toBeLessThan(currIndex)
							}
						}
					),
					{ numRuns: 100 }
				)
			})

			it("should be idempotent", () => {
				fc.assert(
					fc.property(
						fc.array(
							fc.record({
								tagName: fc.constantFrom("LINK", "DIV", "A"),
								id: fc.string(),
							})
						),
						(elements) => {
							const once = collectLinkElements(elements)
							const twice = collectLinkElements(once)
							
							expect(twice).toEqual(once)
						}
					),
					{ numRuns: 100 }
				)
			})

			it("should return only elements with LINK tagName", () => {
				fc.assert(
					fc.property(
						fc.array(
							fc.record({
								tagName: fc.string(),
								id: fc.string(),
							})
						),
						(elements) => {
							const links = collectLinkElements(elements)
							
							links.forEach(link => {
								expect(link.tagName).toBe("LINK")
							})
						}
					),
					{ numRuns: 100 }
				)
			})
		})

		describe("combined properties", () => {
			it("should partition elements correctly", () => {
				fc.assert(
					fc.property(
						fc.array(
							fc.record({
								tagName: fc.constantFrom("SCRIPT", "LINK", "DIV", "SPAN"),
								id: fc.string(),
							})
						),
						(elements) => {
							const scripts = collectScriptElements(elements)
							const links = collectLinkElements(elements)
							
							// No element should be in both
							scripts.forEach(script => {
								expect(links).not.toContain(script)
							})
							
							// Count should match
							const scriptCount = elements.filter(e => e.tagName === "SCRIPT").length
							const linkCount = elements.filter(e => e.tagName === "LINK").length
							
							expect(scripts.length).toBe(scriptCount)
							expect(links.length).toBe(linkCount)
						}
					),
					{ numRuns: 100 }
				)
			})
		})
	})

	describe("edge cases", () => {
		it("should handle very large arrays efficiently", () => {
			const largeArray = Array.from({ length: 10000 }, (_, i) => ({
				tagName: i % 3 === 0 ? "SCRIPT" : i % 3 === 1 ? "LINK" : "DIV",
				id: `element-${i}`,
			}))
			
			const start = performance.now()
			const scripts = collectScriptElements(largeArray)
			const links = collectLinkElements(largeArray)
			const duration = performance.now() - start
			
			// Should be fast even for large arrays
			expect(duration).toBeLessThan(100)
			
			// Should have correct counts
			expect(scripts.length).toBeGreaterThan(3000)
			expect(links.length).toBeGreaterThan(3000)
		})

		it("should handle elements with additional properties", () => {
			const elements = [
				{
					tagName: "SCRIPT",
					id: "script1",
					nested: { deep: { value: "test" } },
					array: [1, 2, 3],
					fn: () => "function",
				},
				{
					tagName: "LINK",
					id: "link1",
					symbol: Symbol("test"),
					date: new Date(),
				},
			]
			
			const scripts = collectScriptElements(elements)
			const links = collectLinkElements(elements)
			
			expect(scripts[0].nested.deep.value).toBe("test")
			expect(links[0].date).toBeInstanceOf(Date)
		})

		it("should handle frozen/sealed objects", () => {
			const frozen = Object.freeze({ tagName: "SCRIPT", id: "frozen" })
			const sealed = Object.seal({ tagName: "LINK", id: "sealed" })
			const normal = { tagName: "DIV", id: "normal" }
			
			const elements = [frozen, sealed, normal]
			
			const scripts = collectScriptElements(elements)
			const links = collectLinkElements(elements)
			
			expect(scripts).toHaveLength(1)
			expect(links).toHaveLength(1)
			expect(scripts[0]).toBe(frozen)
			expect(links[0]).toBe(sealed)
		})

		it("should handle circular references", () => {
			const element: any = { tagName: "SCRIPT", id: "circular" }
			element.self = element
			
			const elements = [element]
			const scripts = collectScriptElements(elements)
			
			expect(scripts).toHaveLength(1)
			expect(scripts[0]).toBe(element)
			expect(scripts[0].self).toBe(element)
		})
	})

	describe("performance characteristics", () => {
		it("should handle empty arrays efficiently", () => {
			expect(collectScriptElements([])).toEqual([])
			expect(collectLinkElements([])).toEqual([])
		})

		it("should handle arrays with no matches efficiently", () => {
			const elements = Array.from({ length: 1000 }, (_, i) => ({
				tagName: "DIV",
				id: `div-${i}`,
			}))
			
			expect(collectScriptElements(elements)).toEqual([])
			expect(collectLinkElements(elements)).toEqual([])
		})

		it("should handle arrays with all matches efficiently", () => {
			const scripts = Array.from({ length: 1000 }, (_, i) => ({
				tagName: "SCRIPT",
				id: `script-${i}`,
			}))
			
			const links = Array.from({ length: 1000 }, (_, i) => ({
				tagName: "LINK",
				id: `link-${i}`,
			}))
			
			expect(collectScriptElements(scripts)).toHaveLength(1000)
			expect(collectLinkElements(links)).toHaveLength(1000)
		})
	})
})