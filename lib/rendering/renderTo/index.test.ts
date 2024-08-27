// @vitest-environment jsdom
import { expect, test } from "vitest"

import renderTo from "."

test("[renderTo] returns the element and children and collects the scripts and stylesheets", () => {
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
						scripts: {
							attributes: {
								src: "https://scripts/hn",
								type: "module",
							},
							tag: "Script",
						},
						stylesheets: [
							{
								attributes: {
									href: "https://styles/hn1",
									media: "all",
									rel: "stylesheet",
								},
								tag: "Link",
							},
							{
								attributes: {
									href: "https://styles/hn2",
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
									src: "https://scripts/p",
									type: "module",
								},
								tag: "Script",
							},
							{
								attributes: {
									src: "https://scripts/p2",
									type: "module",
								},
								tag: "Script",
							},
						],
						stylesheets: [
							{
								attributes: {
									href: "https://styles/p",
									media: "all",
									rel: "stylesheet",
								},
								tag: "Link",
							},
							{
								attributes: {
									href: "https://styles/hn2",
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
		tag: "Main",
	})()

	expect(document.head.innerHTML).toStrictEqual(
		`<link href="https://styles/hn1" media="all" rel="stylesheet">` +
			`<link href="https://styles/hn2" media="print" rel="stylesheet">` +
			`<link href="https://styles/p" media="all" rel="stylesheet">` +
			`<script src="https://scripts/hn" type="module"></script>` +
			`<script src="https://scripts/p" type="module"></script>` +
			`<script src="https://scripts/p2" type="module"></script>`,
	)

	expect(document.body.innerHTML).toStrictEqual(
		`<main id="main-content" role="main" data-bob="says hi">` +
			`<article><h1>This is the title of the article</h1>` +
			`<p>Hi, y'all. Here is the text of the paragraph.</p>` +
			`<section><h2>This is the subtitle</h2>` +
			`<p>This is the subtext. Shhh.</p></section></article></main>`,
	)

	document.head.innerHTML = ""
	document.body.innerHTML = ""
})
