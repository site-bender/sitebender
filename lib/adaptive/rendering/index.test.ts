import render from "."
// @vitest-environment jsdom
import { expect, test } from "vitest"

const config = {
	attributes: {
		id: "html-id",
		lang: "en",
	},
	children: [
		{
			attributes: {
				id: "head-id",
			},
			children: [
				{
					attributes: {},
					children: [
						{
							content: "SSR test",
							tag: "TextNode",
						},
					],
					tag: "Title",
				},
			],
			tag: "Head",
		},
		{
			attributes: {
				id: "body-id",
			},
			children: [
				{
					attributes: {
						id: "header-id",
					},
					children: [
						{
							attributes: {
								id: "h1-id",
							},
							children: [
								{
									content: "SSR Test",
									tag: "TextNode",
								},
							],
							tag: "H1",
						},
					],
					tag: "Header",
				},
				{
					attributes: {
						id: "main-id",
					},
					children: [
						{
							attributes: {
								id: "p-id",
							},
							children: [
								{
									content: "This is the content",
									tag: "TextNode",
								},
							],
							tag: "P",
						},
					],
					tag: "Main",
				},
			],
			tag: "Body",
		},
	],
	tag: "Html",
}

test("[render] renders the config to text HTML", () => {
	expect(render(config)).toEqual(
		`<html id="html-id" lang="en"><head id="head-id">` +
			`<title>SSR test</title></head><body id="body-id">` +
			`<header id="header-id"><h1 id="h1-id">SSR Test</h1>` +
			`</header><main id="main-id">` +
			`<p id="p-id">This is the content</p></main></body></html>`,
	)
})
