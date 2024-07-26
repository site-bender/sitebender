import { expect, test } from "vitest"

import isPhrasingContent from "."

test("[isPhrasingContent] (guards) returns true for phrasing content elements", () => {
	expect(isPhrasingContent({ tag: "Button" })()).toBe(true)
	expect(isPhrasingContent({ tag: "Embed" })()).toBe(true)
	expect(isPhrasingContent({ tag: "Kbd" })()).toBe(true)
	expect(isPhrasingContent({ tag: "Meter" })()).toBe(true)
	expect(isPhrasingContent({ tag: "Label" })()).toBe(true)
	expect(isPhrasingContent({ tag: "Picture" })()).toBe(true)
	expect(isPhrasingContent({ tag: "Svg" })()).toBe(true)
})

test("[isPhrasingContent] (guards) returns false for non-phrasing content elements", () => {
	expect(isPhrasingContent({ tag: "Details" })()).toBe(false)
	expect(isPhrasingContent({ tag: "Base" })()).toBe(false)
	expect(isPhrasingContent({ tag: "Link" })()).toBe(false)
	expect(isPhrasingContent({ tag: "Meta" })()).toBe(false)
	expect(isPhrasingContent({ tag: "Style" })()).toBe(false)
	expect(isPhrasingContent({ tag: "Title" })()).toBe(false)
})

test("[isPhrasingContent] (guards) returns true for MAP when descendant of AREA", () => {
	expect(
		isPhrasingContent({ tag: "Map" })({
			ancestors: ["Article", "Section", "Area"],
		}),
	).toBe(true)
})

test("[isPhrasingContent] (guards) returns false for MAP when not a descendant of AREA", () => {
	expect(
		isPhrasingContent({ tag: "Map" })({
			ancestors: ["Article", "Section"],
		}),
	).toBe(false)
})

test("[isPhrasingContent] (guards) returns true for LINK and META when itemprop attribute present", () => {
	expect(
		isPhrasingContent({ attributes: { itemprop: "prop" }, tag: "Link" })(),
	).toBe(true)
	expect(
		isPhrasingContent({ attributes: { itemprop: "prop" }, tag: "Meta" })(),
	).toBe(true)
})

test("[isPhrasingContent] (guards) returns true for LINK and META when itemprop attribute absent", () => {
	expect(isPhrasingContent({ tag: "Link" })()).toBe(false)
	expect(isPhrasingContent({ tag: "Meta" })()).toBe(false)
})

test("[isPhrasingContent] (guards) returns true for A, DEL, INS, or MAP when contains phrasing element(s)", () => {
	expect(
		isPhrasingContent({
			children: [
				{
					children: [{ tag: "Br" }],
					tag: "Div",
				},
			],
			tag: "A",
		})(),
	).toBe(true)
	expect(
		isPhrasingContent({
			children: [
				{
					children: [{ tag: "Br" }],
					tag: "Div",
				},
			],
			tag: "Del",
		})(),
	).toBe(true)
	expect(
		isPhrasingContent({
			children: [
				{
					children: [{ tag: "Br" }],
					tag: "Div",
				},
			],
			tag: "Ins",
		})(),
	).toBe(true)
	expect(
		isPhrasingContent({
			children: [
				{
					children: [{ tag: "Br" }],
					tag: "Div",
				},
			],
			tag: "Map",
		})(),
	).toBe(true)
})

test("[isPhrasingContent] (guards) returns true for A, DEL, INS, or MAP when does not contain phrasing element(s)", () => {
	expect(
		isPhrasingContent({
			children: [
				{
					children: [{ tag: "P" }],
					tag: "Div",
				},
			],
			tag: "A",
		})(),
	).toBe(false)
	expect(
		isPhrasingContent({
			children: [
				{
					children: [{ tag: "P" }],
					tag: "Div",
				},
			],
			tag: "Del",
		})(),
	).toBe(false)
	expect(
		isPhrasingContent({
			children: [
				{
					children: [{ tag: "P" }],
					tag: "Div",
				},
			],
			tag: "Ins",
		})(),
	).toBe(false)
	expect(
		isPhrasingContent({
			children: [
				{
					children: [{ tag: "P" }],
					tag: "Div",
				},
			],
			tag: "Map",
		})(),
	).toBe(false)
})
