import { http, HttpResponse } from "msw"
import { setupServer } from "msw/node"
import { afterEach, beforeAll, expect, test } from "vitest"

import FromAPI from "../constructors/FromAPI"
import fromAPI from "."

const handlers = [
	http.get("https://example.com/user", () => {
		return HttpResponse.json({ name: "Bob" })
	}),
	http.post("https://example.com/user", () => {
		return HttpResponse.json({ name: "Sam" })
	}),
]

const server = setupServer(...handlers)

beforeAll(() => {
	server.listen({ onUnhandledRequest: "error" })
})

afterEach(() => {
	server.resetHandlers()
	server.close()
})

test("[fromAPI] (guards) returns correct responses", async () => {
	const getOp = FromAPI()({
		method: "GET",
		url: "https://example.com/user",
		options: {
			local: "name",
		},
	})

	expect(await fromAPI(getOp)()).toMatchObject({ right: { name: "Bob" } })

	const postOp = FromAPI()({
		method: "POST",
		url: "https://example.com/user",
	})

	expect(await fromAPI(postOp)()).toMatchObject({ right: { name: "Sam" } })
})

test("[fromAPI] (guards) returns correct response from localValues", async () => {
	const localOp = FromAPI()({
		method: "GET",
		url: "https://example.com/user",
		options: {
			local: "local",
		},
	})

	expect(
		await fromAPI(localOp)(undefined, { local: { name: "Sam" } }),
	).toMatchObject({
		right: { name: "Sam" },
	})
})

test("[fromAPI] (guards) returns error on bad fetch", async () => {
	expect(await fromAPI()()).toMatchObject({
		left: {
			tag: "Error",
			message: "Failed to parse URL from undefined",
			operation: {},
			type: "FromAPI",
		},
	})
})
