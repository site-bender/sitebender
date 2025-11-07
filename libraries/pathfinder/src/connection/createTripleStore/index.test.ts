import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import createTripleStore from "./index.ts"
import type { TripleStoreConfig } from "../../config/types/index.ts"

describe("createTripleStore", () => {
	it("should connect to Oxigraph server successfully", async () => {
		const config: TripleStoreConfig = {
			host: "localhost",
			port: 7878,
		}

		const result = await createTripleStore(config)

		expect(result._tag).toBe("Ok")
		if (result._tag === "Ok") {
			expect(result.value.baseUrl).toBe("http://localhost:7878")
			expect(result.value.queryEndpoint).toBe("http://localhost:7878/query")
			expect(result.value.updateEndpoint).toBe("http://localhost:7878/update")
		}
	})

	it("should respect custom timeout", async () => {
		const config: TripleStoreConfig = {
			host: "localhost",
			port: 7878,
			timeout: 10000,
		}

		const result = await createTripleStore(config)

		expect(result._tag).toBe("Ok")
	})

	it("should return error for invalid host", async () => {
		const config: TripleStoreConfig = {
			host: "nonexistent-host-that-does-not-exist",
			port: 7878,
			timeout: 1000,
		}

		const result = await createTripleStore(config)

		expect(result._tag).toBe("Error")
		if (result._tag === "Error") {
			expect(result.error._tag).toBe("ConnectionError")
			expect(result.error.kind).toBe("TripleStoreInitFailed")
			expect(result.error.host).toBe("nonexistent-host-that-does-not-exist")
			expect(result.error.port).toBe(7878)
		}
	})

	it("should return error for invalid port", async () => {
		const config: TripleStoreConfig = {
			host: "localhost",
			port: 9999, // Port with no service
			timeout: 1000,
		}

		const result = await createTripleStore(config)

		expect(result._tag).toBe("Error")
		if (result._tag === "Error") {
			expect(result.error._tag).toBe("ConnectionError")
			expect(result.error.kind).toBe("TripleStoreInitFailed")
			expect(result.error.cause).toBeDefined()
		}
	})

	it("should include cause in error when connection fails", async () => {
		const config: TripleStoreConfig = {
			host: "localhost",
			port: 99999, // Invalid port number
			timeout: 1000,
		}

		const result = await createTripleStore(config)

		expect(result._tag).toBe("Error")
		if (result._tag === "Error") {
			expect(result.error.cause).toBeDefined()
		}
	})
})
