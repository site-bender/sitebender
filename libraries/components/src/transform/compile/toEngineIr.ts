import type {
	ActionNode,
	ComparatorNode,
	EventBindingNode,
	InjectorNode,
	IrDocument,
	Node,
	OperatorNode,
} from "@sitebender/engine-types/ir/index.ts"
import type { DataType } from "@sitebender/engine-types/ir/index.ts"

type MaybeVNode = unknown
type VNode = { type?: unknown; props?: Record<string, unknown> }

const isObject = (x: unknown): x is Record<string, unknown> =>
	!!x && typeof x === "object"

// Markers from our wrappers
type ActionMarker = { __kind: "action"; action: string; args: Array<unknown> }
type ComparatorMarker = {
	__kind: "comparator"
	cmp: string
	args: Array<unknown>
}
type OnMarker = {
	__kind: "control:on"
	event: string
	target?: string
	handler?: unknown
}
type ConditionalMarker = {
	__kind: "control:conditional"
	condition?: unknown
	ifTrue: Array<unknown>
	ifFalse: Array<unknown>
}
type AuthorizedMarker = {
	__kind: "control:authorized"
	policy: { type: "policy"; tag: string; args?: Record<string, unknown> }
	ifTrue: Array<unknown>
	ifFalse: Array<unknown>
}

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
const isAuthorizedMarker = (x: unknown): x is AuthorizedMarker => {
	if (!isObject(x)) return false
	const k = x.__kind
	return k === "control:authorized"
}

// Engine constructor shapes we support
type ConstructorBase = { tag?: string; type?: string; datatype?: unknown }

const asString = (v: unknown) => (typeof v === "string" ? v : String(v))
const constDatatype = (
	v: unknown,
): DataType => (typeof v === "boolean"
	? "Boolean"
	: (typeof v === "number" ? "Float" : "String"))

// Normalize component-facing datatype aliases to Engine DataType
const normalizeDatatype = (dt?: unknown): DataType | undefined => {
	if (dt === undefined) return undefined
	const s = String(dt)
	if (s === "Number") return "Float"
	// pass through if already a supported DataType or leave undefined
	if (
		s === "String" || s === "Boolean" || s === "Float" || s === "Integer" ||
		s === "PlainDate" || s === "PlainDateTime" || s === "ZonedDateTime"
	) {
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

// Attach optional debug warnings to nodes without changing shapes
const metaWithWarnings = (warnings: string[] | undefined) =>
	(warnings && warnings.length > 0)
		? ({ meta: { debug: { warnings } } } as {
			meta: { debug: Record<string, unknown> }
		})
		: ({})

type ConstantCtor = {
	type: "injector"
	tag: "Constant"
	datatype?: DataType
	value: unknown
}
type FromElementCtor = {
	type: "injector"
	tag: "FromElement"
	datatype?: DataType
	source: string
}
type FromAuthenticationCtor = {
	type: "injector"
	tag: "FromAuthenticator"
	datatype?: DataType
	path?: string
}
type AddCtor = {
	type: "operator"
	tag: "Add"
	datatype?: DataType
	addends?: Array<unknown>
}
type MultiplyCtor = {
	type: "operator"
	tag: "Multiply"
	datatype?: DataType
	multipliers?: Array<unknown>
	factors?: Array<unknown>
}
type MinCtor = {
	type: "operator"
	tag: "Min"
	datatype?: DataType
	operands?: Array<unknown>
}
type MaxCtor = {
	type: "operator"
	tag: "Max"
	datatype?: DataType
	operands?: Array<unknown>
}
type LogicalCtor = {
	type: "logical"
	tag: "And" | "Or"
	datatype?: DataType
	operands?: Array<unknown>
}
type ComparatorCtor = {
	type: "comparator"
	tag: string
	datatype?: DataType
	operand?: unknown
	test?: unknown
}

const isCtor = (x: unknown): x is { type: string; tag: string } =>
	isObject(x) && typeof (x as { type?: unknown }).type === "string" &&
	typeof (x as { tag?: unknown }).tag === "string"
const isConstantCtor = (x: unknown): x is ConstantCtor =>
	isCtor(x) && (x as { tag: string }).tag === "Constant" &&
	(x as { type: string }).type === "injector"
const isFromElementCtor = (x: unknown): x is FromElementCtor =>
	isCtor(x) && (x as { tag: string }).tag === "FromElement" &&
	(x as { type: string }).type === "injector"
const isFromAuthenticationCtor = (x: unknown): x is FromAuthenticationCtor =>
	isCtor(x) && (x as { tag: string }).tag === "FromAuthenticator" &&
	(x as { type: string }).type === "injector"
const isAddCtor = (x: unknown): x is AddCtor =>
	isCtor(x) && (x as { tag: string }).tag === "Add" &&
	(x as { type: string }).type === "operator"
const isMultiplyCtor = (x: unknown): x is MultiplyCtor =>
	isCtor(x) && (x as { tag: string }).tag === "Multiply" &&
	(x as { type: string }).type === "operator"
const isMinCtor = (x: unknown): x is MinCtor =>
	isCtor(x) && (x as { tag: string }).tag === "Min" &&
	(x as { type: string }).type === "operator"
const isMaxCtor = (x: unknown): x is MaxCtor =>
	isCtor(x) && (x as { tag: string }).tag === "Max" &&
	(x as { type: string }).type === "operator"
const isLogicalCtor = (x: unknown): x is LogicalCtor =>
	isCtor(x) && (x as { type: string }).type === "logical"
const isComparatorCtor = (x: unknown): x is ComparatorCtor =>
	isCtor(x) && (x as { type: string }).type === "comparator"

function inferAnchorFromActionArgs(action?: ActionMarker): string | undefined {
	if (!action) return undefined
	for (const arg of action.args ?? []) {
		if (isFromElementCtor(arg)) {
			const src = arg.source || ""
			if (typeof src === "string" && src.startsWith("#") && src.length > 1) {
				return src.slice(1)
			}
		}
		if (isAddCtor(arg)) {
			const arr = Array.isArray(arg.addends) ? arg.addends : []
			for (const a of arr) {
				if (isFromElementCtor(a)) {
					const src = a.source || ""
					if (
						typeof src === "string" && src.startsWith("#") && src.length > 1
					) return src.slice(1)
				}
			}
		}
		if (isMultiplyCtor(arg)) {
			const arr = Array.isArray(arg.multipliers)
				? arg.multipliers
				: (Array.isArray(arg.factors) ? arg.factors : [])
			for (const a of arr) {
				if (isFromElementCtor(a)) {
					const src = a.source || ""
					if (
						typeof src === "string" && src.startsWith("#") && src.length > 1
					) return src.slice(1)
				}
			}
		}
	}
	return undefined
}

function compileOperand(x: unknown): Node {
	// Pass-through for already-constructed IR nodes (from nested compile steps)
	if (
		isObject(x) &&
		typeof (x as { v?: unknown }).v === "string" &&
		typeof (x as { kind?: unknown }).kind === "string"
	) {
		return x as unknown as Node
	}
	// Primitive → Constant injector
	if (
		typeof x === "string" || typeof x === "number" || typeof x === "boolean"
	) {
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
		const cmpTag = x.cmp
		const argCount = Array.isArray(x.args) ? x.args.length : 0
		const warnings: string[] = []
		if (cmpTag === "Is.EqualTo" || cmpTag === "Is.UnequalTo") {
			if (argCount !== 2) {
				warnings.push(`${cmpTag} expects 2 arguments, got ${argCount}`)
			}
		}
		if (cmpTag === "Is.And" || cmpTag === "Is.Or") {
			if (argCount < 1) {
				warnings.push(`${cmpTag} expects at least 1 argument, got ${argCount}`)
			}
		}
		if (cmpTag === "Is.NotEmpty") {
			if (argCount !== 1) {
				warnings.push(`${cmpTag} expects 1 argument, got ${argCount}`)
			}
		}
		return {
			v: "0.1.0",
			kind: "comparator",
			id: nextC(),
			cmp: x.cmp,
			args: x.args.map(compileOperand) as ComparatorNode["args"],
			...metaWithWarnings(warnings),
		} satisfies ComparatorNode
	}

	// Marker actions (used e.g., inside Act.If branches)
	if (isActionMarker(x)) {
		return compileAction(x)
	}

	// Conditional control -> Act.If action
	if (isConditionalMarker(x)) {
		const cond = x.condition
		// Allow either an action or a nested conditional to serve as the branch executable
		const pickFirstExec = (arr?: Array<unknown>) =>
			Array.isArray(arr)
				? arr.find((n) => isActionMarker(n) || isConditionalMarker(n))
				: undefined
		const thenFirst = pickFirstExec(x.ifTrue)
		const elseFirst = pickFirstExec(x.ifFalse)
		const marker: ActionMarker = {
			__kind: "action",
			action: "Act.If",
			args: [cond ?? undefined, thenFirst ?? undefined, elseFirst ?? undefined]
				.filter((v) => typeof v !== "undefined"),
		}
		return compileAction(marker)
	}

	// Authorized control -> Act.If with policy as condition
	if (isAuthorizedMarker(x)) {
		const policyNode: ComparatorNode = {
			v: "0.1.0",
			kind: "comparator",
			id: nextC(),
			// Policies compile as comparator-like nodes; runtime will resolve by tag
			cmp: x.policy.tag.startsWith("Is.") ? x.policy.tag : x.policy.tag,
			args: [
				{
					v: "0.1.0",
					kind: "injector",
					id: nextI(),
					injector: "From.Constant",
					datatype: "String",
					args: { value: x.policy.args ?? {} },
				} as unknown as Node,
			],
		}
		const thenFirst = Array.isArray(x.ifTrue)
			? x.ifTrue.find((n) =>
				isActionMarker(n) || isConditionalMarker(n) || isAuthorizedMarker(n)
			)
			: undefined
		const elseFirst = Array.isArray(x.ifFalse)
			? x.ifFalse.find((n) =>
				isActionMarker(n) || isConditionalMarker(n) || isAuthorizedMarker(n)
			)
			: undefined
		const marker: ActionMarker = {
			__kind: "action",
			action: "Act.If",
			args: [policyNode, thenFirst ?? undefined, elseFirst ?? undefined].filter(
				(v) => typeof v !== "undefined",
			),
		}
		return compileAction(marker)
	}

	// Engine constructors (injectors/operators)
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
	if (isFromAuthenticationCtor(x)) {
		const datatype = normalizeDatatype(x.datatype) ?? "String"
		return {
			v: "0.1.0",
			kind: "injector",
			id: nextI(),
			injector: "From.Authenticator",
			datatype,
			args: { path: x.path },
		} satisfies InjectorNode
	}
	if (isAddCtor(x)) {
		const datatype = normalizeDatatype(x.datatype) ?? "Float"
		const addends = Array.isArray(x.addends) ? x.addends : []
		const warnings: string[] = []
		if (addends.length < 2) warnings.push("Op.Add expects at least 2 addends")
		return {
			v: "0.1.0",
			kind: "operator",
			id: nextO(),
			op: "Op.Add",
			datatype,
			args: addends.map(compileOperand) as OperatorNode["args"],
			...metaWithWarnings(warnings),
		} satisfies OperatorNode
	}
	if (isMultiplyCtor(x)) {
		const datatype = normalizeDatatype(x.datatype) ?? "Float"
		const multipliers = Array.isArray(x.multipliers)
			? x.multipliers
			: (Array.isArray(x.factors) ? x.factors : [])
		const warnings: string[] = []
		if (multipliers.length < 2) {
			warnings.push("Op.Multiply expects at least 2 multipliers")
		}
		return {
			v: "0.1.0",
			kind: "operator",
			id: nextO(),
			op: "Op.Multiply",
			datatype,
			args: multipliers.map(compileOperand) as OperatorNode["args"],
			...metaWithWarnings(warnings),
		} satisfies OperatorNode
	}
	// Subtract/Divide are not explicitly modeled as Ctors in this file; warn when detected via tag
	if (
		isCtor(x) && (x as { type: string }).type === "operator" &&
		(x as { tag: string }).tag === "Subtract"
	) {
		const datatype =
			normalizeDatatype((x as { datatype?: unknown }).datatype) ?? "Float"
		const children =
			(x as { minuend?: unknown; subtrahend?: unknown; children?: unknown[] })
				.children as unknown[] | undefined
		const ops = Array.isArray(children) ? children : []
		const warnings: string[] = []
		if (ops.length !== 2) {
			warnings.push(
				"Op.Subtract expects exactly 2 operands (minuend and subtrahend)",
			)
		}
		return {
			v: "0.1.0",
			kind: "operator",
			id: nextO(),
			op: "Op.Subtract",
			datatype,
			args: ops.map(compileOperand) as OperatorNode["args"],
			...metaWithWarnings(warnings),
		} satisfies OperatorNode
	}
	if (
		isCtor(x) && (x as { type: string }).type === "operator" &&
		(x as { tag: string }).tag === "Divide"
	) {
		const datatype =
			normalizeDatatype((x as { datatype?: unknown }).datatype) ?? "Float"
		const children = (x as { children?: unknown[] }).children as
			| unknown[]
			| undefined
		const ops = Array.isArray(children) ? children : []
		const warnings: string[] = []
		if (ops.length !== 2) {
			warnings.push(
				"Op.Divide expects exactly 2 operands (dividend and divisor)",
			)
		}
		return {
			v: "0.1.0",
			kind: "operator",
			id: nextO(),
			op: "Op.Divide",
			datatype,
			args: ops.map(compileOperand) as OperatorNode["args"],
			...metaWithWarnings(warnings),
		} satisfies OperatorNode
	}
	if (isMinCtor(x)) {
		const datatype = normalizeDatatype(x.datatype) ?? "Float"
		const ops = Array.isArray(x.operands) ? x.operands : []
		const warnings: string[] = []
		if (ops.length < 1) warnings.push("Op.Min expects at least 1 operand")
		return {
			v: "0.1.0",
			kind: "operator",
			id: nextO(),
			op: "Op.Min",
			datatype,
			args: ops.map(compileOperand) as OperatorNode["args"],
			...metaWithWarnings(warnings),
		} satisfies OperatorNode
	}
	if (isMaxCtor(x)) {
		const datatype = normalizeDatatype(x.datatype) ?? "Float"
		const ops = Array.isArray(x.operands) ? x.operands : []
		const warnings: string[] = []
		if (ops.length < 1) warnings.push("Op.Max expects at least 1 operand")
		return {
			v: "0.1.0",
			kind: "operator",
			id: nextO(),
			op: "Op.Max",
			datatype,
			args: ops.map(compileOperand) as OperatorNode["args"],
			...metaWithWarnings(warnings),
		} satisfies OperatorNode
	}

	// Logical constructors (And/Or) from engine wrappers -> comparator nodes
	if (isLogicalCtor(x)) {
		const tag = x.tag === "And" ? "Is.And" : x.tag === "Or" ? "Is.Or" : x.tag
		const ops = Array.isArray(x.operands) ? x.operands : []
		const warnings: string[] = []
		if ((tag === "Is.And" || tag === "Is.Or") && ops.length < 1) {
			warnings.push(`${tag} expects at least 1 operand`)
		}
		return {
			v: "0.1.0",
			kind: "comparator",
			id: nextC(),
			cmp: tag,
			args: ops.map(compileOperand) as ComparatorNode["args"],
			...metaWithWarnings(warnings),
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
		// Support comparators that use alternate field names
		const pattern = (x as { pattern?: unknown }).pattern
		if (typeof pattern !== "undefined") args.push(pattern)
		const flags = (x as { flags?: unknown }).flags
		if (typeof flags !== "undefined") args.push(flags)
		const warnings: string[] = []
		// Additional guard: raw non-null field count for Matches/DoesNotMatch
		if (x.tag === "Matches" || x.tag === "DoesNotMatch") {
			const rawCount = [
				(x as { operand?: unknown }).operand,
				(x as { pattern?: unknown }).pattern,
				(x as { flags?: unknown }).flags,
			].filter((v) => v !== null && v !== undefined).length
			const tag = x.tag === "Matches" ? "Matches" : "DoesNotMatch"
			if (rawCount < 2) {
				warnings.push(
					`${tag} expects 2 or 3 arguments (operand, pattern, flags?), got ${rawCount}`,
				)
			}
		}
		// Guard for InSet: require non-null operand and set (as test)
		if (x.tag === "InSet") {
			const rawCount = [
				(x as { operand?: unknown }).operand,
				(x as { test?: unknown }).test,
			].filter((v) => v !== null && v !== undefined).length
			if (rawCount !== 2) {
				warnings.push(`InSet expects 2 arguments (value, set), got ${rawCount}`)
			}
		}
		if ((cmp === "Is.EqualTo" || cmp === "Is.UnequalTo") && args.length !== 2) {
			warnings.push(`${cmp} expects 2 arguments, got ${args.length}`)
		}
		if ((cmp === "Is.And" || cmp === "Is.Or") && args.length < 1) {
			warnings.push(`${cmp} expects at least 1 argument, got ${args.length}`)
		}
		// Two-argument comparator families (amount/length/etc.) — require exactly 2 args
		const twoArgTags = new Set([
			"IsMoreThan",
			"IsLessThan",
			"IsNoMoreThan",
			"IsNoLessThan",
			"IsShorterThan",
			"IsLongerThan",
			"IsNoShorterThan",
			"IsNoLongerThan",
			"IsSameLength",
			"IsLength",
			"IsNotLength",
			"IsAfterDate",
			"IsBeforeDate",
			"IsSameDate",
			"IsNotAfterDate",
			"IsNotBeforeDate",
			"IsNotSameDate",
			"InSet",
			"IsAfterDateTime",
			"IsBeforeDateTime",
			"IsSameDateTime",
			"IsNotAfterDateTime",
			"IsNotBeforeDateTime",
			"IsAfterTime",
			"IsBeforeTime",
			"IsSameTime",
			"IsNotAfterTime",
			"IsNotBeforeTime",
		])
		if (twoArgTags.has(x.tag) && args.length !== 2) {
			const tagForMsg = cmp || x.tag
			warnings.push(`${tagForMsg} expects 2 arguments, got ${args.length}`)
		}
		if (
			(cmp === "Matches" || cmp === "Is.Matches") &&
			(args.length < 2 || args.length > 3)
		) {
			warnings.push(
				`${cmp} expects 2 or 3 arguments (operand, pattern, flags?), got ${args.length}`,
			)
		}
		if (
			(cmp === "DoesNotMatch" || cmp === "Is.DoesNotMatch") &&
			(args.length < 2 || args.length > 3)
		) {
			warnings.push(
				`${cmp} expects 2 or 3 arguments (operand, pattern, flags?), got ${args.length}`,
			)
		}
		return {
			v: "0.1.0",
			kind: "comparator",
			id: nextC(),
			cmp,
			args: args.map(compileOperand) as ComparatorNode["args"],
			...metaWithWarnings(warnings),
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

export default function compileToEngine(
	children?: MaybeVNode | MaybeVNode[],
): IrDocument {
	const arr: MaybeVNode[] = Array.isArray(children)
		? children
		: (children ? [children] : [])
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
						? [(n as { handler?: unknown }).handler as unknown]
						: [])
				const firstAction = kids.find(isActionMarker) as
					| ActionMarker
					| undefined
				const firstConditional = kids.find(isConditionalMarker) as
					| ConditionalMarker
					| undefined
				const firstAuthorized = kids.find(isAuthorizedMarker) as
					| AuthorizedMarker
					| undefined
				const handler = firstAction
					? compileAction(firstAction)
					: (firstConditional
						? compileOperand(firstConditional) as unknown as ActionNode
						: (firstAuthorized
							? compileOperand(firstAuthorized) as unknown as ActionNode
							: undefined))
				const inferred = inferAnchorFromActionArgs(firstAction)
				const anchor = n.target || lastAnchor || inferred
				if (anchor && handler) {
					events.push({
						v: "0.1.0",
						kind: "on",
						id: anchor,
						event: evt,
						handler,
					})
				}
				continue
			}

			if (isObject(n) && "type" in n) {
				const v = n as VNode
				const type = v.type
				const props = (v.props ?? {}) as Record<string, unknown>
				const tag = typeof type === "string" ? type : undefined
				if (tag) {
					const anchor = (props["data-ir-id"] as string) ||
						(props.id as string) || undefined
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
