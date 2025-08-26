import type {
  ActionNode,
  ComparatorNode,
  EventBindingNode,
  InjectorNode,
  IrDocument,
  Node,
  OperatorNode,
} from "../../../../adaptive/types/ir/index.ts"
import type { DataType } from "../../../../adaptive/types/ir/index.ts"

type MaybeVNode = unknown
type VNode = { type?: unknown; props?: Record<string, unknown> }

const isObject = (x: unknown): x is Record<string, unknown> => !!x && typeof x === "object"

// Markers from our wrappers
type ActionMarker = { __kind: "action"; action: string; args: Array<unknown> }
type ComparatorMarker = { __kind: "comparator"; cmp: string; args: Array<unknown> }
type OnMarker = { __kind: "control:on"; event: string; target?: string; handler?: unknown }
type ConditionalMarker = { __kind: "control:conditional"; condition?: unknown; ifTrue: Array<unknown>; ifFalse: Array<unknown> }

const isActionMarker = (x: unknown): x is ActionMarker => {
  if (!isObject(x)) return false
  const k = x.__kind
  const a = (x as { action?: unknown }).action
  const args = (x as { args?: unknown }).args
  return k === "action" && typeof a === "string" && Array.isArray(args)
}
const isComparatorMarker = (x: unknown): x is ComparatorMarker => {
  if (!isObject(x)) return false
  const k = x.__kind
  const cmp = (x as { cmp?: unknown }).cmp
  const args = (x as { args?: unknown }).args
  return k === "comparator" && typeof cmp === "string" && Array.isArray(args)
}
const isOnMarker = (x: unknown): x is OnMarker => {
  if (!isObject(x)) return false
  const k = x.__kind
  const evt = (x as { event?: unknown }).event
  return k === "control:on" && typeof evt === "string"
}
const isConditionalMarker = (x: unknown): x is ConditionalMarker => {
  if (!isObject(x)) return false
  const k = x.__kind
  return k === "control:conditional"
}

// Adaptive constructor shapes we support
type ConstructorBase = { tag?: string; type?: string; datatype?: unknown }

const asString = (v: unknown) => (typeof v === "string" ? v : String(v))
const constDatatype = (v: unknown): DataType => (typeof v === "boolean" ? "Boolean" : (typeof v === "number" ? "Float" : "String"))

// Normalize component-facing datatype aliases to Adaptive DataType
const normalizeDatatype = (dt?: unknown): DataType | undefined => {
  if (dt === undefined) return undefined
  const s = String(dt)
  if (s === "Number") return "Float"
  // pass through if already a supported DataType or leave undefined
  if (s === "String" || s === "Boolean" || s === "Float" || s === "Integer" || s === "PlainDate" || s === "PlainDateTime" || s === "ZonedDateTime") {
    return s as DataType
  }
  return undefined
}

// ID generator
const idGen = (prefix: string) => {
  let i = 0
  return () => `${prefix}${++i}`
}
const nextI = idGen("i")
const nextO = idGen("o")
const nextC = idGen("c")
const nextA = idGen("a")

type ConstantCtor = { type: "injector"; tag: "Constant"; datatype?: DataType; value: unknown }
type FromElementCtor = { type: "injector"; tag: "FromElement"; datatype?: DataType; source: string }
type AddCtor = { type: "operator"; tag: "Add"; datatype?: DataType; addends?: Array<unknown> }
type MultiplyCtor = { type: "operator"; tag: "Multiply"; datatype?: DataType; factors?: Array<unknown> }
type LogicalCtor = { type: "logical"; tag: "And" | "Or"; datatype?: DataType; operands?: Array<unknown> }
type ComparatorCtor = { type: "comparator"; tag: string; datatype?: DataType; operand?: unknown; test?: unknown }

const isCtor = (x: unknown): x is { type: string; tag: string } => isObject(x) && typeof (x as { type?: unknown }).type === "string" && typeof (x as { tag?: unknown }).tag === "string"
const isConstantCtor = (x: unknown): x is ConstantCtor => isCtor(x) && (x as { tag: string }).tag === "Constant" && (x as { type: string }).type === "injector"
const isFromElementCtor = (x: unknown): x is FromElementCtor => isCtor(x) && (x as { tag: string }).tag === "FromElement" && (x as { type: string }).type === "injector"
const isAddCtor = (x: unknown): x is AddCtor => isCtor(x) && (x as { tag: string }).tag === "Add" && (x as { type: string }).type === "operator"
const isMultiplyCtor = (x: unknown): x is MultiplyCtor => isCtor(x) && (x as { tag: string }).tag === "Multiply" && (x as { type: string }).type === "operator"
const isLogicalCtor = (x: unknown): x is LogicalCtor => isCtor(x) && (x as { type: string }).type === "logical"
const isComparatorCtor = (x: unknown): x is ComparatorCtor => isCtor(x) && (x as { type: string }).type === "comparator"

function inferAnchorFromActionArgs(action?: ActionMarker): string | undefined {
  if (!action) return undefined
  for (const arg of action.args ?? []) {
    if (isFromElementCtor(arg)) {
      const src = arg.source || ""
      if (typeof src === "string" && src.startsWith("#") && src.length > 1) return src.slice(1)
    }
    if (isAddCtor(arg)) {
      const arr = Array.isArray(arg.addends) ? arg.addends : []
      for (const a of arr) {
        if (isFromElementCtor(a)) {
          const src = a.source || ""
          if (typeof src === "string" && src.startsWith("#") && src.length > 1) return src.slice(1)
        }
      }
    }
    if (isMultiplyCtor(arg)) {
      const arr = Array.isArray(arg.factors) ? arg.factors : []
      for (const a of arr) {
        if (isFromElementCtor(a)) {
          const src = a.source || ""
          if (typeof src === "string" && src.startsWith("#") && src.length > 1) return src.slice(1)
        }
      }
    }
  }
  return undefined
}

function compileOperand(x: unknown): Node {
  // Primitive → Constant injector
  if (typeof x === "string" || typeof x === "number" || typeof x === "boolean") {
    return {
      v: "0.1.0",
      kind: "injector",
      id: nextI(),
      injector: "From.Constant",
  datatype: constDatatype(x),
      args: { value: x },
    } satisfies InjectorNode
  }

  // Marker comparators
  if (isComparatorMarker(x)) {
    return {
      v: "0.1.0",
      kind: "comparator",
      id: nextC(),
      cmp: x.cmp,
      args: x.args.map(compileOperand) as ComparatorNode["args"],
    } satisfies ComparatorNode
  }

  // Marker actions (used e.g., inside Act.If branches)
  if (isActionMarker(x)) {
    return compileAction(x)
  }

  // Conditional control -> Act.If action
  if (isConditionalMarker(x)) {
    const cond = x.condition
    const thenFirst = Array.isArray(x.ifTrue) ? x.ifTrue.find(isActionMarker) : undefined
    const elseFirst = Array.isArray(x.ifFalse) ? x.ifFalse.find(isActionMarker) : undefined
    const marker: ActionMarker = {
      __kind: "action",
      action: "Act.If",
      args: [cond ?? undefined, thenFirst ?? undefined, elseFirst ?? undefined].filter((v) => typeof v !== "undefined"),
    }
    return compileAction(marker)
  }

  // Adaptive constructors (injectors/operators)
  if (isConstantCtor(x)) {
    const datatype = normalizeDatatype(x.datatype) ?? constDatatype(x.value)
    return {
      v: "0.1.0",
      kind: "injector",
      id: nextI(),
      injector: "From.Constant",
      datatype,
      args: { value: x.value },
    } satisfies InjectorNode
  }
  if (isFromElementCtor(x)) {
    const datatype = normalizeDatatype(x.datatype) ?? "String"
    return {
      v: "0.1.0",
      kind: "injector",
      id: nextI(),
      injector: "From.Element",
      datatype,
      args: { selector: x.source },
    } satisfies InjectorNode
  }
  if (isAddCtor(x)) {
    const datatype = normalizeDatatype(x.datatype) ?? "Float"
    const addends = Array.isArray(x.addends) ? x.addends : []
    return {
      v: "0.1.0",
      kind: "operator",
      id: nextO(),
      op: "Op.Add",
      datatype,
      args: addends.map(compileOperand) as OperatorNode["args"],
    } satisfies OperatorNode
  }
  if (isMultiplyCtor(x)) {
    const datatype = normalizeDatatype(x.datatype) ?? "Float"
    const factors = Array.isArray(x.factors) ? x.factors : []
    return {
      v: "0.1.0",
      kind: "operator",
      id: nextO(),
      op: "Op.Multiply",
      datatype,
      args: factors.map(compileOperand) as OperatorNode["args"],
    } satisfies OperatorNode
  }

  // Logical constructors (And/Or) from adaptive wrappers -> comparator nodes
  if (isLogicalCtor(x)) {
    const tag = (x.tag === "And" ? "Is.And" : x.tag === "Or" ? "Is.Or" : x.tag)
    const ops = Array.isArray(x.operands) ? x.operands : []
    return {
      v: "0.1.0",
      kind: "comparator",
      id: nextC(),
      cmp: tag,
      args: ops.map(compileOperand) as ComparatorNode["args"],
    } satisfies ComparatorNode
  }

  // Comparator constructors (equality, etc.) -> comparator nodes
  if (isComparatorCtor(x)) {
    // Map constructor tags to runtime-registered comparator names when needed
    const mapTag = (t: string) => {
      if (t === "IsEqualTo" || t === "EqualTo") return "Is.EqualTo"
      if (t === "IsUnequalTo" || t === "UnequalTo") return "Is.UnequalTo"
      if (t === "NotEmpty") return "Is.NotEmpty"
      return t.startsWith("Is.") ? t : t
    }
    const cmp = mapTag(x.tag)
    const args: Array<unknown> = []
    if (typeof x.operand !== "undefined") args.push(x.operand)
    if (typeof x.test !== "undefined") args.push(x.test)
    return {
      v: "0.1.0",
      kind: "comparator",
      id: nextC(),
      cmp,
      args: args.map(compileOperand) as ComparatorNode["args"],
    } satisfies ComparatorNode
  }

  // Fallback: wrap unknown as constant string
  return {
    v: "0.1.0",
    kind: "injector",
    id: nextI(),
    injector: "From.Constant",
    datatype: "String",
    args: { value: asString(x) },
  } satisfies InjectorNode
}

function compileAction(m: ActionMarker): ActionNode {
  return {
    v: "0.1.0",
    kind: "action",
    id: nextA(),
    action: m.action,
    args: m.args.map(compileOperand),
  }
}

export default function compileToAdaptive(children?: MaybeVNode | MaybeVNode[]): IrDocument {
  const arr: MaybeVNode[] = Array.isArray(children) ? children : (children ? [children] : [])
  const events: EventBindingNode[] = []
  let lastAnchor: string | undefined

  const walk = (nodes: MaybeVNode[]) => {
    for (const n of nodes) {
      if (n === null || n === undefined || n === false) continue
      if (typeof n === "string" || typeof n === "number") continue

      if (isOnMarker(n)) {
        const evt = n.event.startsWith("On.") ? n.event : `On.${n.event}`
        const kids = Array.isArray((n as { handler?: unknown }).handler)
          ? ((n as { handler?: unknown[] }).handler ?? [])
          : ((n as { handler?: unknown }).handler !== undefined
            ? [((n as { handler?: unknown }).handler as unknown)]
            : [])
        const firstAction = kids.find(isActionMarker) as ActionMarker | undefined
        const firstConditional = kids.find(isConditionalMarker) as ConditionalMarker | undefined
        const handler = firstAction
          ? compileAction(firstAction)
          : (firstConditional ? compileOperand(firstConditional) as unknown as ActionNode : undefined)
        const inferred = inferAnchorFromActionArgs(firstAction)
        const anchor = n.target || lastAnchor || inferred
        if (anchor && handler) {
          events.push({ v: "0.1.0", kind: "on", id: anchor, event: evt, handler })
        }
        continue
      }

      if (isObject(n) && "type" in n) {
        const v = n as VNode
        const type = v.type
        const props = (v.props ?? {}) as Record<string, unknown>
        const tag = typeof type === "string" ? type : undefined
        if (tag) {
          const anchor = (props["data-ir-id"] as string) || (props.id as string) || undefined
          if (anchor) lastAnchor = anchor
          const kids = props.children
          if (kids) walk(Array.isArray(kids) ? kids : [kids])
        }
        continue
      }

      // Plain objects that might be nested under actions/comparators are handled when compiling operands
    }
  }

  walk(arr)

  // Minimal IR document with only event bindings as children (matches current hydrator expectations)
  return {
    v: "0.1.0",
    kind: "element",
    id: "root",
    tag: "div",
    attrs: {},
    children: events as unknown as Node[],
  }
}
