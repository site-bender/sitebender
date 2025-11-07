import { describe, it } from "@std/testing/bdd"
import { expect } from "@std/expect"
import validateConfig from "./index.ts"
import type { PathfinderConfig } from "../types/index.ts"

describe("validateConfig", () => {
	it("should return valid for correct configuration", () => {
		const config: PathfinderConfig = {
			tripleStore: {
				host: "localhost",
				port: 7878,
			},
			vectorStore: {
				host: "localhost",
				port: 6333,
			},
		}

		const result = validateConfig(config)

		expect(result._tag).toBe("Success")
		if (result._tag === "Success") {
			expect(result.value.tripleStore.host).toBe("localhost")
			expect(result.value.tripleStore.port).toBe(7878)
			expect(result.value.vectorStore.host).toBe("localhost")
			expect(result.value.vectorStore.port).toBe(6333)
		}
	})

	it("should return invalid for missing triple store host", () => {
		const config: PathfinderConfig = {
			tripleStore: {
				host: "",
				port: 7878,
			},
			vectorStore: {
				host: "localhost",
				port: 6333,
			},
		}

		const result = validateConfig(config)

		expect(result._tag).toBe("Failure")
		if (result._tag === "Failure") {
			expect(result.errors.length).toBe(1)
			expect(result.errors[0]._tag).toBe("ConfigError")
			expect(result.errors[0].kind).toBe("MissingHost")
			expect(result.errors[0].field).toBe("tripleStore.host")
		}
	})

	it("should return invalid for missing vector store host", () => {
		const config: PathfinderConfig = {
			tripleStore: {
				host: "localhost",
				port: 7878,
			},
			vectorStore: {
				host: "",
				port: 6333,
			},
		}

		const result = validateConfig(config)

		expect(result._tag).toBe("Failure")
		if (result._tag === "Failure") {
			expect(result.errors.length).toBe(1)
			expect(result.errors[0]._tag).toBe("ConfigError")
			expect(result.errors[0].kind).toBe("MissingHost")
			expect(result.errors[0].field).toBe("vectorStore.host")
		}
	})

	it("should return invalid for port too low", () => {
		const config: PathfinderConfig = {
			tripleStore: {
				host: "localhost",
				port: 7878,
			},
			vectorStore: {
				host: "localhost",
				port: 0,
			},
		}

		const result = validateConfig(config)

		expect(result._tag).toBe("Failure")
		if (result._tag === "Failure") {
			expect(result.errors.length).toBe(1)
			expect(result.errors[0]._tag).toBe("ConfigError")
			expect(result.errors[0].kind).toBe("InvalidPort")
			expect(result.errors[0].field).toBe("vectorStore.port")
			expect(result.errors[0].value).toBe(0)
		}
	})

	it("should return invalid for port too high", () => {
		const config: PathfinderConfig = {
			tripleStore: {
				host: "localhost",
				port: 7878,
			},
			vectorStore: {
				host: "localhost",
				port: 70000,
			},
		}

		const result = validateConfig(config)

		expect(result._tag).toBe("Failure")
		if (result._tag === "Failure") {
			expect(result.errors.length).toBe(1)
			expect(result.errors[0]._tag).toBe("ConfigError")
			expect(result.errors[0].kind).toBe("InvalidPort")
			expect(result.errors[0].field).toBe("vectorStore.port")
			expect(result.errors[0].value).toBe(70000)
		}
	})

	it("should accumulate multiple validation errors", () => {
		const config: PathfinderConfig = {
			tripleStore: {
				host: "",
				port: -1,
			},
			vectorStore: {
				host: "",
				port: -1,
			},
		}

		const result = validateConfig(config)

		expect(result._tag).toBe("Failure")
		if (result._tag === "Failure") {
			expect(result.errors.length).toBe(4)

			const errorKinds = result.errors.map((e) => e.kind)
			expect(errorKinds).toContain("MissingHost")
			expect(errorKinds).toContain("InvalidPort")
		}
	})

	it("should handle whitespace-only triple store host as invalid", () => {
		const config: PathfinderConfig = {
			tripleStore: {
				host: "   ",
				port: 7878,
			},
			vectorStore: {
				host: "localhost",
				port: 6333,
			},
		}

		const result = validateConfig(config)

		expect(result._tag).toBe("Failure")
		if (result._tag === "Failure") {
			expect(result.errors.length).toBe(1)
			expect(result.errors[0].kind).toBe("MissingHost")
			expect(result.errors[0].field).toBe("tripleStore.host")
		}
	})

	it("should handle whitespace-only vector store host as invalid", () => {
		const config: PathfinderConfig = {
			tripleStore: {
				host: "localhost",
				port: 7878,
			},
			vectorStore: {
				host: "   ",
				port: 6333,
			},
		}

		const result = validateConfig(config)

		expect(result._tag).toBe("Failure")
		if (result._tag === "Failure") {
			expect(result.errors.length).toBe(1)
			expect(result.errors[0].kind).toBe("MissingHost")
			expect(result.errors[0].field).toBe("vectorStore.host")
		}
	})
})
