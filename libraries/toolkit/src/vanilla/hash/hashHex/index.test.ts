import hashHex from "./index.ts"

Deno.test("hashHex default (sha256) basic vectors", async () => {
	const h = hashHex()
	const empty = await h("")
	if (
		empty !== "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
	) {
		throw new Error("unexpected empty hash: " + empty)
	}
	const abc = await h("abc")
	if (
		abc !== "ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad"
	) {
		throw new Error("unexpected abc hash: " + abc)
	}
})
