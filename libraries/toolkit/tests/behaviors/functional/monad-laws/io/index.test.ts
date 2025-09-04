import * as fc from "npm:fast-check@3"

import left from "../../../../../src/monads/either/left/index.ts"
import right from "../../../../../src/monads/either/right/index.ts"
import ap from "../../../../../src/monads/io/ap/index.ts"
import chain from "../../../../../src/monads/io/chain/index.ts"
import chainIOEither from "../../../../../src/monads/io/chainIOEither/index.ts"
import chainIOMaybe from "../../../../../src/monads/io/chainIOMaybe/index.ts"
import fromEither from "../../../../../src/monads/io/fromEither/index.ts"
import fromIO from "../../../../../src/monads/io/fromIO/index.ts"
import fromMaybe from "../../../../../src/monads/io/fromMaybe/index.ts"
import io from "../../../../../src/monads/io/io/index.ts"
import ioEither from "../../../../../src/monads/io/ioEither/index.ts"
import ioMaybe from "../../../../../src/monads/io/ioMaybe/index.ts"
import ioToIOEither from "../../../../../src/monads/io/ioToIOEither/index.ts"
import ioToIOMaybe from "../../../../../src/monads/io/ioToIOMaybe/index.ts"
import liftEither from "../../../../../src/monads/io/liftEither/index.ts"
import liftMaybe from "../../../../../src/monads/io/liftMaybe/index.ts"
import map from "../../../../../src/monads/io/map/index.ts"
import mapIOEither from "../../../../../src/monads/io/mapIOEither/index.ts"
import mapIOMaybe from "../../../../../src/monads/io/mapIOMaybe/index.ts"
import of from "../../../../../src/monads/io/of/index.ts"
import runIO from "../../../../../src/monads/io/runIO/index.ts"
import isJust from "../../../../../src/monads/maybe/isJust/index.ts"
import just from "../../../../../src/monads/maybe/just/index.ts"
import nothing from "../../../../../src/monads/maybe/nothing/index.ts"

// IO monad laws and basic behaviors

Deno.test("IO monad - left identity law", () => {
  const f = (n: number) => () => n + 1

  fc.assert(
    fc.property(fc.integer(), (value) => {
      const m = of<number>(value)
      const left = chain<number, number>(f)(m)
      const right = f(value)
      return runIO(left) === runIO(right)
    }),
    { numRuns: 500 },
  )
})

Deno.test("IO monad - right identity law", () => {
  fc.assert(
    fc.property(fc.integer(), (value) => {
      const m = of<number>(value)
      const result = chain<number, number>(of<number>)(m)
      return runIO(result) === runIO(m)
    }),
    { numRuns: 500 },
  )
})

Deno.test("IO monad - associativity law", () => {
  const f = (n: number) => () => n * 2
  const g = (n: number) => () => n + 10

  fc.assert(
    fc.property(fc.integer(), (value) => {
      const m = of<number>(value)
      const left = chain<number, number>(g)(chain<number, number>(f)(m))
      const right = chain<number, number>((x: number) => chain<number, number>(g)(f(x)))(m)
      return runIO(left) === runIO(right)
    }),
    { numRuns: 500 },
  )
})

Deno.test("IO functor - identity and composition", () => {
  const id = <T>(x: T) => x
  const f = (n: number) => n * 2
  const g = (n: number) => n + 10

  fc.assert(
    fc.property(fc.integer(), (value) => {
      const m = of<number>(value)
      const idRes = map<number, number>(id)(m)
      const compLeft = map<number, number>((x: number) => f(g(x)))(m)
      const compRight = map<number, number>(f)(map<number, number>(g)(m))
      return runIO(idRes) === runIO(m) && runIO(compLeft) === runIO(compRight)
    }),
    { numRuns: 500 },
  )
})

// Applicative and conversion behaviors

Deno.test("IO applicative - ap applies deferred fn to deferred value", () => {
  const add = io(() => (a: number) => (b: number) => a + b)
  const a = io(() => 2)
  const b = io(() => 40)
  const result = ap(ap(add)(a))(b)
  if (runIO(result) !== 42) throw new Error("ap failed")
})

Deno.test("IO conversions - fromMaybe/fromEither/fromIO/constructors", () => {
  const jm = just(5)
  const nm = nothing<number>()
  const re = right<number, string>(7)
  const le = left<string, number>("err")

  // fromMaybe
  const iomJ = fromMaybe(jm)
  const iomN = fromMaybe(nm)
  const rJ = runIO(iomJ)
  const rN = runIO(iomN)
  if (!isJust(rJ) || rJ.value !== 5) throw new Error("fromMaybe Just failed")
  if (isJust(rN)) throw new Error("fromMaybe Nothing failed")

  // fromEither
  const ioeR = fromEither(re)
  const ioeL = fromEither(le)
  if (runIO(ioeR)._tag !== "Right") throw new Error("fromEither Right failed")
  if (runIO(ioeL)._tag !== "Left") throw new Error("fromEither Left failed")

  // fromIO wraps IO into IOMaybe(Just)
  const pureIO = io(() => 10)
  const iom = fromIO(pureIO)
  const r = runIO(iom)
  if (!isJust(r) || r.value !== 10) throw new Error("fromIO failed")

  // direct constructors
  const ioM = ioMaybe(() => just("x"))
  const ioE = ioEither(() => right<unknown, string>("ok"))
  if (!isJust(runIO(ioM))) throw new Error("ioMaybe failed")
  if (runIO(ioE)._tag !== "Right") throw new Error("ioEither failed")
})

Deno.test("IOMaybe map/chain and IOEither map/chain preserve semantics", () => {
  const mm = ioMaybe(() => just(10))
  const m2 = mapIOMaybe((n: number) => n * 2)(mm)
  const m3 = chainIOMaybe((n: number) => ioMaybe(() => (n > 0 ? just(n + 5) : nothing())))(m2)
  const mv = runIO(m3)
  if (!isJust(mv) || mv.value !== 25) throw new Error("IOMaybe map/chain failed")

  const ee = ioEither(() => right<number, string>(10))
  const e2 = mapIOEither<string, number, number>((n: number) => n * 3)(ee)
  const e3 = chainIOEither<string, number, number>((n: number) => ioEither(() => (n > 0 ? right(n + 1) : left("neg"))))(e2)
  const ev = runIO(e3)
  if (ev._tag !== "Right" || ev.right !== 31) throw new Error("IOEither map/chain failed")
})

Deno.test("IO to IOMaybe/IOEither helpers wrap values in Just/Right", () => {
  const valueIO = io(() => 7)
  const iom = ioToIOMaybe(valueIO)
  const ioe = ioToIOEither<never, number>(valueIO)
  const m = runIO(iom)
  if (!isJust(m) || m.value !== 7) throw new Error("ioToIOMaybe failed")
  const e = runIO(ioe)
  if (e._tag !== "Right" || e.right !== 7) throw new Error("ioToIOEither failed")
})

Deno.test("liftMaybe/liftEither execute pure fns in IO context", () => {
  const lm = liftMaybe(() => just("yay"))
  const le = liftEither(() => right<number, string>(99))
  const mm = runIO(lm)
  if (!isJust(mm) || mm.value !== "yay") throw new Error("liftMaybe failed")
  const ee2 = runIO(le)
  if (ee2._tag !== "Right" || ee2.right !== 99) throw new Error("liftEither failed")
})
