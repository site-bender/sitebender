import parseFile from "./src/parseFile/index.ts"

async function test() {
	const result = await parseFile("src/parseFile/test-fixtures/valid.ts")
	console.log("Result:", result)
}

test()
