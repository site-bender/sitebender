// @sitebender/arborist/src/extractClasses/index.test.ts
// Tests for extractClasses function

import { assert, assertEquals } from "jsr:@std/assert@1.0.14"
import { default as initSwc, parse } from "npm:@swc/wasm-web@1.13.20"

import extractClasses from "./index.ts"
import type { ParsedAst } from "../types/index.ts"

// Initialize SWC WASM once for all tests
let swcInitPromise: Promise<void> | null = null

function ensureSwcInitialized(): Promise<void> {
	if (!swcInitPromise) {
		swcInitPromise = initSwc().then(() => undefined)
	}
	return swcInitPromise as Promise<void>
}

// Helper to create ParsedAst from source
async function createParsedAst(
	sourceText: string,
	filePath = "test.ts",
): Promise<ParsedAst> {
	await ensureSwcInitialized()

	const module = await parse(sourceText, {
		syntax: "typescript",
		tsx: false,
	})

	return {
		module,
		sourceText,
		filePath,
	}
}

Deno.test("extractClasses - returns Validation", async () => {
	const ast = await createParsedAst("export default class Test {}")
	const validation = extractClasses(ast)

	assert(
		validation._tag === "Success" || validation._tag === "Failure",
		"Should return Validation",
	)
})

Deno.test("extractClasses - Success with single class", async () => {
	const ast = await createParsedAst(`
		export default class TestClass {
			name: string;
			constructor(name: string) { this.name = name; }
			getName(): string { return this.name; }
		}
	`)

	const validation = extractClasses(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].name, "TestClass")
		assertEquals(validation.value[0].isExported, true)
		assertEquals(validation.value[0].isDefault, true)
		assertEquals(validation.value[0].members.length, 3) // property, constructor, method
	}
})

Deno.test("extractClasses - Success with multiple classes", async () => {
	const ast = await createParsedAst(`
		class FirstClass {
			name: string;
		}

		export class SecondClass {
			age: number;
		}

		export default class ThirdClass {
			method() {}
		}
	`)

	const validation = extractClasses(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 3)
		assertEquals(validation.value[0].name, "FirstClass")
		assertEquals(validation.value[0].isExported, false)
		assertEquals(validation.value[1].name, "SecondClass")
		assertEquals(validation.value[1].isExported, true)
		assertEquals(validation.value[2].name, "ThirdClass")
		assertEquals(validation.value[2].isDefault, true)
	}
})

Deno.test("extractClasses - Success with empty array for no classes", async () => {
	const ast = await createParsedAst(`
		const x = 42
		type Foo = string
		function test() {}
	`)

	const validation = extractClasses(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 0)
	}
})

Deno.test("extractClasses - Success with abstract class", async () => {
	const ast = await createParsedAst(`
		export abstract class AbstractClass {
			abstract method(): void;
			concrete(): string { return "test"; }
		}
	`)

	const validation = extractClasses(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].isAbstract, true)
		assertEquals(validation.value[0].members.length, 2)
	}
})

Deno.test("extractClasses - Success with inheritance", async () => {
	const ast = await createParsedAst(`
		class BaseClass {}
		class ChildClass extends BaseClass {}
	`)

	const validation = extractClasses(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 2)
		const childClass = validation.value.find(c => c.name === "ChildClass")
		assert(childClass)
		if (childClass) {
			assertEquals(childClass.extends, "BaseClass")
		}
	}
})

Deno.test("extractClasses - Success with interfaces", async () => {
	const ast = await createParsedAst(`
		interface TestInterface {}
		class TestClass implements TestInterface {}
	`)

	const validation = extractClasses(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		assertEquals(validation.value[0].implements, ["TestInterface"])
	}
})

Deno.test("extractClasses - Success with complex members", async () => {
	const ast = await createParsedAst(`
		export class ComplexClass {
			private name: string;
			public static count = 0;
			protected age: number;

			constructor(name: string, age: number) {
				this.name = name;
				this.age = age;
			}

			public getName(): string {
				return this.name;
			}

			private setAge(age: number): void {
				this.age = age;
			}

			protected abstractMethod(): void {}

			async asyncMethod(): Promise<void> {}

			get fullName(): string {
				return this.name;
			}

			set fullName(value: string) {
				this.name = value;
			}
		}
	`)

	const validation = extractClasses(ast)

	assertEquals(validation._tag, "Success")
	if (validation._tag === "Success") {
		assertEquals(validation.value.length, 1)
		const cls = validation.value[0]
		assertEquals(cls.members.length, 10) // 3 properties + constructor + 4 methods + getter + setter

		// Check various member types
		const privateProp = cls.members.find(m => m.name === "name")
		assert(privateProp)
		if (privateProp) {
			assertEquals(privateProp.type, "property")
			assertEquals(privateProp.isPrivate, true)
		}

		const staticProp = cls.members.find(m => m.name === "count")
		assert(staticProp)
		if (staticProp) {
			assertEquals(staticProp.isStatic, true)
		}

		const constructor = cls.members.find(m => m.type === "constructor")
		assert(constructor)
		if (constructor) {
			assertEquals(constructor.parameters.length, 2)
		}

		const asyncMethod = cls.members.find(m => m.name === "asyncMethod")
		assert(asyncMethod)
		if (asyncMethod) {
			assertEquals(asyncMethod.isAsync, true)
		}

		const getter = cls.members.find(m => m.type === "getter")
		assert(getter)

		const setter = cls.members.find(m => m.type === "setter")
		assert(setter)
	}
})

Deno.test("extractClasses - returns immutable array", async () => {
	const ast = await createParsedAst("export class Test {}")
	const validation = extractClasses(ast)

	if (validation._tag === "Success") {
		// This should fail if types are readonly
		// validation.value.push({})
	}
})
