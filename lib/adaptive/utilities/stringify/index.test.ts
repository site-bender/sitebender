import stringify from "."
import { expect, test } from "vitest"

const elem = {
	children: [
		{
			children: [
				{
					children: [
						{
							tag: "P",
						},
					],
					stylesheets: [
						{
							attributes: {
								href: "four",
								media: "print",
								rel: "stylesheet",
							},
							tag: "Link",
						},
						{
							attributes: {
								href: "two",
								media: "all",
								rel: "stylesheet",
							},
							tag: "Link",
						},
					],
					scripts: [
						{
							attributes: {
								src: "alpha",
							},
							tag: "Script",
						},
						{
							attributes: {
								src: "bravo",
							},
							tag: "Script",
						},
					],
					tag: "Section",
				},
			],
			stylesheets: [
				{
					attributes: {
						href: "two",
						media: "screen",
					},
					tag: "Link",
				},
				{
					attributes: {
						href: "three",
					},
					tag: "Link",
				},
			],
			scripts: {
				attributes: {
					src: "charlie",
					type: "module",
				},
				tag: "Script",
			},
			tag: "Article",
		},
	],
	stylesheets: {
		attributes: {
			href: "one",
			media: "screen",
			rel: "stylesheet",
		},
		tag: "Link",
	},
	scripts: [
		{
			attributes: {
				src: "alpha",
			},
			tag: "Script",
		},
		{
			attributes: {
				src: "alpha",
			},
			tag: "Script",
		},
	],
	tag: "Body",
}

// const elemReordered: SbFullElement = {
// 	children: [
// 		{
// 			children: [
// 				{
// 					children: [
// 						{
// 							tag: "P",
// 						},
// 					],
// 					stylesheets: [
// 						{
// 							attributes: {
// 								href: "two",
// 								media: "all",
// 								rel: "stylesheet",
// 							},
// 							tag: "Link",
// 						},
// 						{
// 							attributes: {
// 								href: "four",
// 								media: "print",
// 								rel: "stylesheet",
// 							},
// 							tag: "Link",
// 						},
// 					],
// 					scripts: [
// 						{
// 							attributes: {
// 								src: "bravo",
// 							},
// 							tag: "Script",
// 						},
// 						{
// 							attributes: {
// 								src: "alpha",
// 							},
// 							tag: "Script",
// 						},
// 					],
// 					tag: "Section",
// 				},
// 			],
// 			scripts: {
// 				attributes: {
// 					src: "charlie",
// 					type: "module",
// 				},
// 				tag: "Script",
// 			},
// 			stylesheets: [
// 				{
// 					attributes: {
// 						href: "three",
// 					},
// 					tag: "Link",
// 				},
// 				{
// 					attributes: {
// 						href: "two",
// 						media: "screen",
// 					},
// 					tag: "Link",
// 				},
// 			],
// 			tag: "Article",
// 		},
// 	],
// 	scripts: [
// 		{
// 			attributes: {
// 				src: "alpha",
// 			},
// 			tag: "Script",
// 		},
// 		{
// 			attributes: {
// 				src: "alpha",
// 			},
// 			tag: "Script",
// 		},
// 	],
// 	stylesheets: {
// 		attributes: {
// 			href: "one",
// 			media: "screen",
// 			rel: "stylesheet",
// 		},
// 		tag: "Link",
// 	},
// 	tag: "Body",
// }

const stringified =
	"children:children:children:tag:P;scripts:attributes:src:alpha;tag:" +
	"Script;attributes:src:bravo;tag:Script;stylesheets:attributes:href:four;media:print;rel:" +
	"stylesheet;tag:Link;attributes:href:two;media:all;rel:stylesheet;tag:Link;tag:" +
	"Section;scripts:attributes:src:charlie;type:module;tag:Script;stylesheets:attributes:href" +
	":two;media:screen;tag:Link;attributes:href:three;tag:Link;tag:Article;scripts:" +
	"attributes:src:alpha;tag:Script;attributes:src:alpha;tag:Script;stylesheets:attributes" +
	":href:one;media:screen;rel:stylesheet;tag:Link;tag:Body"

test("[stringify] (utilities) stringifies the object to a unique string for that object", () => {
	expect(stringify(elem)).toMatch(stringified)
	// expect(stringify(elemReordered as SbElement)).toMatch(stringified) // TODO:  this work
})

test("[stringify] (utilities) works with arrays", () => {
	expect(
		stringify([
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
		]),
	).toMatch(
		"attributes:src:https://scripts/p;type:module;tag:Script;attributes:src:https://scripts/p2;type:module;tag:Script",
	)
})
