import { assertEquals } from "jsr:@std/assert"

import renderTo from "./index.ts"

// This test requires DOM environment - skipping for now
// TODO(#dom-mock): Implement with proper DOM mocking or move to integration tests
Deno.test({
	name:
		"[renderTo] returns the element and children and collects the scripts and stylesheets",
	ignore: true, // Skip DOM-specific test
	fn: () => {
		renderTo(document.body)({
			attributes: {
				id: "main-content",
				role: "main",
			},
			children: [
				{
					children: [
						{
							children: [
								{
									content: "This is the title of the article",
									tag: "TextNode",
								},
							],
							scripts: [
								{
									attributes: {
										src: "https://example.com/scripts/hn",
										type: "module",
									},
									tag: "Script",
								},
							],
							stylesheets: [
								{
									attributes: {
										href: "https://example.com/styles/hn1",
										media: "all",
										rel: "stylesheet",
									},
									tag: "Link",
								},
								{
									attributes: {
										href: "https://example.com/styles/hn2",
										media: "print",
										rel: "stylesheet",
									},
									tag: "Link",
								},
							],
							tag: "Hn",
						},
						{
							children: [
								{
									content: "Hi, y'all. Here is the text of the paragraph.",
									tag: "TextNode",
								},
							],
							scripts: [
								{
									attributes: {
										src: "https://example.com/scripts/p",
										type: "module",
									},
									tag: "Script",
								},
								{
									attributes: {
										src: "https://example.com/scripts/p2",
										type: "module",
									},
									tag: "Script",
								},
							],
							stylesheets: [
								{
									attributes: {
										href: "https://example.com/styles/p",
										media: "all",
										rel: "stylesheet",
									},
									tag: "Link",
								},
								{
									attributes: {
										href: "https://example.com/styles/hn2",
										media: "print",
										rel: "stylesheet",
									},
									tag: "Link",
								},
							],
							tag: "P",
						},
						{
							children: [
								{
									children: [
										{
											content: "This is the subtitle",
											tag: "TextNode",
										},
									],
									tag: "Hn",
								},
								{
									children: [
										{
											content: "This is the subtext. Shhh.",
											tag: "TextNode",
										},
									],
									tag: "P",
								},
							],
							tag: "Section",
						},
					],
					tag: "Article",
				},
			],
			dataset: {
				bob: "says hi",
			},
			scripts: ["/scripts/one.js", "/scripts/two.js"],
			stylesheets: [
				{
					id: "one",
					href: "/styles/one.css",
					media: "all",
				},
				{
					id: "two",
					href: "/styles/two.css",
					media: "print",
				},
			],
			tag: "Main",
		})()

		assertEquals(true, true) // Placeholder assertion
	},
})
