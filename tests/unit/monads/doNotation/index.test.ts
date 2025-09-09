import { assertEquals } from "https://deno.land/std@0.217.0/assert/mod.ts"
import { describe, it } from "https://deno.land/std@0.217.0/testing/bdd.ts"

import doNotation from "../../../../libraries/toolkit/src/monads/doNotation/index.ts"
import type { MonadDictionary } from "../../../../libraries/toolkit/src/monads/doNotation/index.ts"

// Simple Identity monad for testing
type Identity<A> = { value: A }

const IdentityMonad: MonadDictionary<Identity<any>> = {
	chain: <A, B>(f: (a: A) => Identity<B>) => (ma: Identity<A>): Identity<B> => {
		return f(ma.value)
	},
	of: <A>(value: A): Identity<A> => {
		return { value }
	}
}

describe("doNotation", () => {
	it("should work with simple Identity monad", () => {
		const result = doNotation(IdentityMonad)(function* () {
			const x = yield IdentityMonad.of(5)
			const y = yield IdentityMonad.of(3)
			return x + y
		})
		
		assertEquals(result.value, 8)
	})
	
	it("should handle single yield", () => {
		const result = doNotation(IdentityMonad)(function* () {
			const x = yield IdentityMonad.of(42)
			return x * 2
		})
		
		assertEquals(result.value, 84)
	})
	
	it("should handle no yields", () => {
		const result = doNotation(IdentityMonad)(function* () {
			return 100
		})
		
		assertEquals(result.value, 100)
	})
	
	it("should properly chain computations", () => {
		const result = doNotation(IdentityMonad)(function* () {
			const a = yield IdentityMonad.of(2)
			const b = yield IdentityMonad.of(a * 3)
			const c = yield IdentityMonad.of(b + 4)
			return c
		})
		
		assertEquals(result.value, 10)
	})
	
	it("should maintain proper sequencing", () => {
		const operations: string[] = []
		
		const TrackedMonad: MonadDictionary<Identity<any>> = {
			chain: <A, B>(f: (a: A) => Identity<B>) => (ma: Identity<A>): Identity<B> => {
				operations.push(`chain(${ma.value})`)
				return f(ma.value)
			},
			of: <A>(value: A): Identity<A> => {
				operations.push(`of(${value})`)
				return { value }
			}
		}
		
		doNotation(TrackedMonad)(function* () {
			yield TrackedMonad.of(1)
			yield TrackedMonad.of(2)
			return 3
		})
		
		assertEquals(operations, [
			"of(1)",
			"chain(1)",
			"of(2)",
			"chain(2)",
			"of(3)"
		])
	})
})