import type {
  ActionNode,
  ComparatorNode,
  DataType,
  EventBindingNode,
  InjectorNode,
  IrDocument,
  Node,
  OperatorNode,
  Version,
} from "../../types/ir/index.ts"

// Minimal JSX layer to author Adaptive IR with components

const V: Version = "0.1.0"
let __id = 0
const genId = (p?: { id?: string }) => p?.id || `ir_${++__id}`

type Children = Array<Node | null | undefined | false>

// Flatten children arrays, drop nullish
const flat = (kids: unknown[]): Node[] =>
  kids.flat(Infinity).filter(Boolean) as Node[]

// JSX factory and fragment
export function Fragment(props: { children?: unknown[] }) {
  return props.children as unknown as Node
}

type Component<P> = (props: P & { children?: unknown[] }) => Node

export function createElement<P = Record<string, unknown>>(
  type: string | Component<P>,
  props: P | null,
  ...children: unknown[]
): Node {
  if (typeof type === "function") {
    const base = (props ?? {}) as Record<string, unknown>
    return (type as Component<Record<string, unknown>>)({ ...base, children })
  }
  throw new Error(`Unknown intrinsic JSX tag: ${String(type)}`)
}

// Root element builder for convenience
export function IrRoot(props: { id?: string; tag?: string; children?: unknown[] }) {
  const children = flat(props.children || [])
  const node: IrDocument = {
    v: V,
    kind: "element",
    id: genId(props),
    tag: String(props.tag || "div"),
    attrs: {},
    children,
  }
  return node
}

// Injectors
export function Constant(props: { id?: string; datatype?: DataType; value: unknown }): InjectorNode {
  return {
    v: V,
    kind: "injector",
    id: genId(props),
    injector: "From.Constant",
    datatype: props.datatype || "String",
    args: { value: props.value },
  }
}

export function FromElement(props: { id?: string; datatype?: DataType; selector: string }): InjectorNode {
  return {
    v: V,
    kind: "injector",
    id: genId(props),
    injector: "From.Element",
    datatype: props.datatype || "String",
    args: { selector: props.selector },
  }
}

export function FromQueryString(props: { id?: string; key: string }): InjectorNode {
  return {
    v: V,
    kind: "injector",
    id: genId(props),
    injector: "From.QueryString",
    datatype: "String",
    args: { key: props.key },
  }
}

// Operators
export function Add(props: { id?: string; datatype?: DataType; children?: unknown[] }): OperatorNode {
  return {
    v: V,
    kind: "operator",
    id: genId(props),
    op: "Op.Add",
    datatype: props.datatype || "Float",
    args: flat(props.children || []),
  }
}

// Comparators
export function NotEmpty(props: { id?: string; children?: unknown[] }): ComparatorNode {
  return {
    v: V,
    kind: "comparator",
    id: genId(props),
    cmp: "Is.NotEmpty",
    args: flat(props.children || []),
  }
}

export function EqualTo(props: { id?: string; children?: unknown[] }): ComparatorNode {
  return {
    v: V,
    kind: "comparator",
    id: genId(props),
    cmp: "Is.EqualTo",
    args: flat(props.children || []),
  }
}

// Actions
export function SetValue(props: { id?: string; children?: unknown[] }): ActionNode {
  return {
    v: V,
    kind: "action",
    id: genId(props),
    action: "Act.SetValue",
    args: flat(props.children || []),
  }
}

export function SetQueryString(props: { id?: string; children?: unknown[] }): ActionNode {
  return {
    v: V,
    kind: "action",
    id: genId(props),
    action: "Act.SetQueryString",
    args: flat(props.children || []),
  }
}

export function Publish(props: { id?: string; children?: unknown[] }): ActionNode {
  return {
    v: V,
    kind: "action",
    id: genId(props),
    action: "Act.Publish",
    args: flat(props.children || []),
  }
}

export function If(props: { id?: string; children?: unknown[] }): ActionNode {
  const [cond, thenAct, elseAct] = flat(props.children || [])
  const args = [cond, thenAct, elseAct].filter(Boolean) as Node[]
  return {
    v: V,
    kind: "action",
    id: genId(props),
    action: "Act.If",
    args,
  }
}

// Events
export function On(props: { id: string; event: "On.Input" | "On.Change" | "On.Blur" | "On.Submit"; children?: unknown[] }): EventBindingNode {
  const [handler] = flat(props.children || []) as unknown as [ActionNode]
  return {
    v: V,
    kind: "on",
    id: props.id,
    event: props.event,
    handler,
  }
}

// Convenience: build a full IR document from children
export function ir(...children: unknown[]): IrDocument {
  return {
    v: V,
    kind: "element",
    id: "root",
    tag: "div",
    attrs: {},
    children: flat(children),
  }
}
