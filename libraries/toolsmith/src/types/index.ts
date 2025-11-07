// ============================================================================
// Base Value Types
// ============================================================================

export type PrimitiveValue = string | number | boolean | null | bigint | symbol

export type Serializable =
	| PrimitiveValue
	| Array<Serializable>
	| ReadonlyArray<Serializable>
	| { [key: string]: Serializable }
	| Date
	| RegExp
	| Error
	| Map<string, Serializable>
	| Set<Serializable>
	| ArrayBuffer
	| SharedArrayBuffer
	| DataView
	| Int8Array
	| Uint8Array
	| Uint8ClampedArray
	| Int16Array
	| Uint16Array
	| Int32Array
	| Uint32Array
	| Float32Array
	| Float64Array
	| BigInt64Array
	| BigUint64Array
	| Temporal.PlainDate
	| Temporal.PlainTime
	| Temporal.PlainDateTime
	| Temporal.PlainMonthDay
	| Temporal.PlainYearMonth
	| Temporal.ZonedDateTime
	| Temporal.Instant
	| Temporal.Duration

export type Func = (...args: Array<Value>) => Value
export type Value =
	| Serializable
	| Func
	| Array<Value>
	| WeakMap<object, Value>
	| WeakSet<object>
	| Promise<Value>

export type SerializableValue = Serializable

//++ Array type that guarantees at least one element
export type NonEmptyArray<T> = readonly [T, ...Array<T>]

export type Predicate<T> = (value: T) => boolean
export type Predicates<T> = ReadonlyArray<Predicate<T>>

// ============================================================================
// Virtual DOM Types
// ============================================================================

export type {
	CommentNode,
	ElementNode,
	ErrorNode,
	TextNode,
	VirtualNode,
	VirtualNodeTag,
} from "./virtualNode/index.ts"
export { VIRTUAL_NODE_TAGS } from "../constants/index.ts"

export type PrintableCharacter =
	| "~"
	| "!"
	| '"'
	| "#"
	| "$"
	| "%"
	| "&"
	| "'"
	| "("
	| ")"
	| "*"
	| "+"
	| ","
	| "-"
	| "."
	| "/"
	| "0"
	| "1"
	| "2"
	| "3"
	| "4"
	| "5"
	| "6"
	| "7"
	| "8"
	| "9"
	| ":"
	| ";"
	| "<"
	| "="
	| ">"
	| "?"
	| "@"
	| "A"
	| "B"
	| "C"
	| "D"
	| "E"
	| "F"
	| "G"
	| "H"
	| "I"
	| "J"
	| "K"
	| "L"
	| "M"
	| "N"
	| "O"
	| "P"
	| "Q"
	| "R"
	| "S"
	| "T"
	| "U"
	| "V"
	| "W"
	| "X"
	| "Y"
	| "Z"
	| "["
	| "\\"
	| "]"
	| "^"
	| "_"
	| "`"
	| "a"
	| "b"
	| "c"
	| "d"
	| "e"
	| "f"
	| "g"
	| "h"
	| "i"
	| "j"
	| "k"
	| "l"
	| "m"
	| "n"
	| "o"
	| "p"
	| "q"
	| "r"
	| "s"
	| "t"
	| "u"
	| "v"
	| "w"
	| "x"
	| "y"
	| "z"
	| "{"
	| "|"
	| "}"
	| "~"
