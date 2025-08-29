// These are compile-time only "tests" to assert IR shapes via `satisfies`.
// They intentionally have no runtime assertions. If shapes drift, type-check fails.

import type {
  ComparatorConfig,
  LogicalConfig,
  OperatorConfig,
  Operand,
} from "@adaptiveTypes/index.ts"

import Constant from "@adaptiveSrc/constructors/injectors/Constant/index.ts"
import Add from "@adaptiveSrc/constructors/operators/Add/index.ts"
import Multiply from "@adaptiveSrc/constructors/operators/Multiply/index.ts"
import Subtract from "@adaptiveSrc/constructors/operators/Subtract/index.ts"
import Divide from "@adaptiveSrc/constructors/operators/Divide/index.ts"
import Min from "@adaptiveSrc/constructors/operators/Min/index.ts"
import Max from "@adaptiveSrc/constructors/operators/Max/index.ts"
import Ternary from "@adaptiveSrc/constructors/operators/Ternary/index.ts"
import IsEqualTo from "@adaptiveSrc/constructors/comparators/equality/IsEqualTo/index.ts"
import Matches from "@adaptiveSrc/constructors/comparators/matching/Matches/index.ts"
import And from "@adaptiveSrc/constructors/comparators/algebraic/And/index.ts"

// Helpers to build simple operands
const str = (s: string): Operand => Constant("String")(s)
const num = (n: number): Operand => Constant("Number")(n)
const bool = (b: boolean): Operand => Constant("Boolean")(b)

// Operator contract: Add(Number) returns an OperatorConfig with addends
const op = Add("Number")([num(1), num(2)])
const _opContract: true = ((): true => {
  const _x = op satisfies OperatorConfig
  // @ts-ignore - avoid unused var emit
  void _x
  return true
})()

// Operator contract: Multiply(Number) returns OperatorConfig with multipliers
const mul = Multiply("Number")([num(2), num(3), num(4)])
const _mulContract: true = ((): true => {
  const _x = mul satisfies OperatorConfig
  void _x
  return true
})()

// Comparator contract: IsEqualTo(String) yields ComparatorConfig with operand/test
const cmp = IsEqualTo("String")(str("a"))(str("b"))
const _cmpContract: true = ((): true => {
  const _x = cmp satisfies ComparatorConfig
  void _x
  return true
})()

// Comparator contract: Matches over String with operand/pattern/flags
const mtc = Matches(str("hello"))(str("^h.*o$"))("i")
const _mtcContract: true = ((): true => {
  const _x = mtc satisfies ComparatorConfig
  void _x
  return true
})()

// Logical contract: And(Boolean) over comparator/logical nodes
const logic = And("Boolean")([cmp])
const _logicContract: true = ((): true => {
  const _x = logic satisfies LogicalConfig
  void _x
  return true
})()

// Min/Max contracts: operands array present and correct tag/datatype domain
const minOp = Min("Number")([num(3), num(1)])
const _minContract: true = ((): true => {
  const _x = minOp satisfies OperatorConfig
  void _x
  return true
})()

const maxOp = Max("Number")([num(3), num(9)])
const _maxContract: true = ((): true => {
  const _x = maxOp satisfies OperatorConfig
  void _x
  return true
})()

// Ternary contract: condition + branches with explicit datatype
const tern = Ternary("Number")(bool(true), num(1), num(2))
const _ternaryContract: true = ((): true => {
  const _x = tern satisfies OperatorConfig
  void _x
  return true
})()

// Subtract/Divide contracts: operands present and datatype propagated
const subOp = Subtract("Number")(num(10))(num(3))
const _subContract: true = ((): true => {
  const _x = subOp satisfies OperatorConfig
  void _x
  return true
})()

const divOp = Divide("Number")(num(10))(num(2))
const _divContract: true = ((): true => {
  const _x = divOp satisfies OperatorConfig
  void _x
  return true
})()
