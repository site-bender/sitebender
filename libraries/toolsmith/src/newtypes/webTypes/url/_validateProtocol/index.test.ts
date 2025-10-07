import { assertEquals } from "@std/assert"
import _validateProtocol from "./index.ts"

Deno.test("_validateProtocol: accepts http", function () {
	const result = _validateProtocol("http")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "http")
	}
})

Deno.test("_validateProtocol: accepts https", function () {
	const result = _validateProtocol("https")
	assertEquals(result._tag, "Ok")
	if (result._tag === "Ok") {
		assertEquals(result.value, "https")
	}
})

Deno.test("_validateProtocol: accepts ftp", function () {
	const result = _validateProtocol("ftp")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateProtocol: accepts ftps", function () {
	const result = _validateProtocol("ftps")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateProtocol: accepts sftp", function () {
	const result = _validateProtocol("sftp")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateProtocol: accepts ws", function () {
	const result = _validateProtocol("ws")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateProtocol: accepts wss", function () {
	const result = _validateProtocol("wss")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateProtocol: accepts ssh", function () {
	const result = _validateProtocol("ssh")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateProtocol: accepts git", function () {
	const result = _validateProtocol("git")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateProtocol: accepts svn", function () {
	const result = _validateProtocol("svn")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateProtocol: accepts rtsp", function () {
	const result = _validateProtocol("rtsp")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateProtocol: accepts rtmp", function () {
	const result = _validateProtocol("rtmp")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateProtocol: accepts gopher", function () {
	const result = _validateProtocol("gopher")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateProtocol: accepts ldap", function () {
	const result = _validateProtocol("ldap")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateProtocol: accepts ldaps", function () {
	const result = _validateProtocol("ldaps")
	assertEquals(result._tag, "Ok")
})

Deno.test("_validateProtocol: rejects empty protocol", function () {
	const result = _validateProtocol("")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_MISSING_PROTOCOL")
	}
})

Deno.test("_validateProtocol: rejects uppercase protocol", function () {
	const result = _validateProtocol("HTTP")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_INVALID_PROTOCOL_FORMAT")
	}
})

Deno.test("_validateProtocol: rejects protocol starting with number", function () {
	const result = _validateProtocol("1http")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_INVALID_PROTOCOL_FORMAT")
	}
})

Deno.test("_validateProtocol: rejects protocol with invalid characters", function () {
	const result = _validateProtocol("http_test")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_INVALID_PROTOCOL_FORMAT")
	}
})

Deno.test("_validateProtocol: rejects unsupported protocol mailto", function () {
	const result = _validateProtocol("mailto")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_UNSUPPORTED_PROTOCOL")
	}
})

Deno.test("_validateProtocol: rejects unsupported protocol tel", function () {
	const result = _validateProtocol("tel")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_UNSUPPORTED_PROTOCOL")
	}
})

Deno.test("_validateProtocol: rejects unsupported protocol data", function () {
	const result = _validateProtocol("data")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_UNSUPPORTED_PROTOCOL")
	}
})

Deno.test("_validateProtocol: rejects unsupported protocol file", function () {
	const result = _validateProtocol("file")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_UNSUPPORTED_PROTOCOL")
	}
})

Deno.test("_validateProtocol: rejects unknown protocol", function () {
	const result = _validateProtocol("unknown")
	assertEquals(result._tag, "Error")
	if (result._tag === "Error") {
		assertEquals(result.error.code, "URL_UNSUPPORTED_PROTOCOL")
	}
})
