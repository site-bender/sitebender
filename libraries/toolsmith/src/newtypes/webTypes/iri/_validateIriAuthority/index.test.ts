import { assertEquals } from "@std/assert"
import _validateIriAuthority from "./index.ts"

Deno.test(
	"_validateIriAuthority validates correct authorities",
	async function (t) {
		await t.step("accepts empty authority", function () {
			const result = _validateIriAuthority("")
			assertEquals(result._tag, "Ok")
		})

		await t.step("accepts simple domain", function () {
			const result = _validateIriAuthority("example.com")
			assertEquals(result._tag, "Ok")
		})

		await t.step("accepts Unicode domain", function () {
			const result = _validateIriAuthority("例え.jp")
			assertEquals(result._tag, "Ok")
		})

		await t.step("accepts Russian domain", function () {
			const result = _validateIriAuthority("пример.рф")
			assertEquals(result._tag, "Ok")
		})

		await t.step("accepts Devanagari domain", function () {
			const result = _validateIriAuthority("मराठी.भारत")
			assertEquals(result._tag, "Ok")
		})

		await t.step("accepts domain with port", function () {
			const result = _validateIriAuthority("example.com:8080")
			assertEquals(result._tag, "Ok")
		})

		await t.step("accepts Unicode domain with port", function () {
			const result = _validateIriAuthority("例え.jp:443")
			assertEquals(result._tag, "Ok")
		})

		await t.step("accepts userinfo with domain", function () {
			const result = _validateIriAuthority("user@example.com")
			assertEquals(result._tag, "Ok")
		})

		await t.step("accepts Unicode userinfo", function () {
			const result = _validateIriAuthority("用户@例え.jp")
			assertEquals(result._tag, "Ok")
		})

		await t.step("accepts Russian userinfo and domain", function () {
			const result = _validateIriAuthority("пользователь@пример.рф")
			assertEquals(result._tag, "Ok")
		})

		await t.step("accepts userinfo with colon", function () {
			const result = _validateIriAuthority("user:password@example.com")
			assertEquals(result._tag, "Ok")
		})

		await t.step("accepts IPv4", function () {
			const result = _validateIriAuthority("192.168.1.1")
			assertEquals(result._tag, "Ok")
		})

		await t.step("accepts IPv4 with port", function () {
			const result = _validateIriAuthority("192.168.1.1:8080")
			assertEquals(result._tag, "Ok")
		})

		await t.step("accepts IPv6", function () {
			const result = _validateIriAuthority("[2001:db8::1]")
			assertEquals(result._tag, "Ok")
		})

		await t.step("accepts IPv6 with port", function () {
			const result = _validateIriAuthority("[2001:db8::1]:8080")
			assertEquals(result._tag, "Ok")
		})

		await t.step("accepts IPv6 with userinfo", function () {
			const result = _validateIriAuthority("user@[2001:db8::1]")
			assertEquals(result._tag, "Ok")
		})
	},
)

Deno.test(
	"_validateIriAuthority rejects invalid authorities",
	async function (t) {
		await t.step("rejects control characters", function () {
			const result = _validateIriAuthority("example.com\x00")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "IRI_AUTHORITY_CONTAINS_CONTROL_CHARS")
			}
		})

		await t.step("rejects @ in userinfo", function () {
			const result = _validateIriAuthority("user@@example.com")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "IRI_AUTHORITY_INVALID_USERINFO")
			}
		})

		await t.step("rejects [ in userinfo", function () {
			const result = _validateIriAuthority("user[@example.com")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "IRI_AUTHORITY_INVALID_USERINFO")
			}
		})

		await t.step("rejects domain with space", function () {
			const result = _validateIriAuthority("example .com")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "IRI_AUTHORITY_INVALID_HOST")
			}
		})

		await t.step("rejects IPv4 with octet > 255", function () {
			const result = _validateIriAuthority("192.168.1.256")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "IRI_AUTHORITY_IPV4_INVALID")
			}
		})

		await t.step("rejects IPv4 with leading zeros", function () {
			const result = _validateIriAuthority("192.168.001.001")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "IRI_AUTHORITY_IPV4_INVALID")
			}
		})

		await t.step("rejects IPv6 without closing bracket", function () {
			const result = _validateIriAuthority("[2001:db8::1")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "IRI_AUTHORITY_IPV6_INVALID")
			}
		})

		await t.step("rejects IPv6 with invalid content", function () {
			const result = _validateIriAuthority("[invalid]")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "IRI_AUTHORITY_IPV6_INVALID")
			}
		})

		await t.step("rejects characters after IPv6 bracket", function () {
			const result = _validateIriAuthority("[2001:db8::1]abc")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "IRI_AUTHORITY_INVALID_FORMAT")
			}
		})

		await t.step("rejects invalid port", function () {
			const result = _validateIriAuthority("example.com:99999")
			assertEquals(result._tag, "Error")
			if (result._tag === "Error") {
				assertEquals(result.error.code, "URL_PORT_OUT_OF_RANGE")
			}
		})
	},
)
