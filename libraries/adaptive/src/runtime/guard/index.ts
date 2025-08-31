import type { ComparatorNode, InjectorNode } from "../../../types/ir/index.ts"
import type { ComposeContext } from "../../context/composeContext/index.ts"

import evaluate from "../evaluate/index.ts"
import { registerDefaultExecutors } from "../../operations/defaults/registerDefaults/index.ts"

export type GuardDecision =
  | { allow: true }
  | { redirect: string }
  | { status: 401 | 403 }

export type GuardPolicy = { tag: string; args?: Record<string, unknown> }

export type GuardOnFail = { redirect?: string; status?: 401 | 403 }

/**
 * guardAuthorized
 *
 * Evaluates an auth policy using the runtime comparator→policy fallback.
 * Returns an allow/redirect/status decision for SSR routing.
 */
export async function guardAuthorized(
  ctx: ComposeContext,
  policy: GuardPolicy,
  onFail?: GuardOnFail,
): Promise<GuardDecision> {
  // Ensure default executors/policies are registered for this context
  registerDefaultExecutors(ctx)

  const policyArgNode: InjectorNode = {
    v: "0.1.0",
    kind: "injector",
    id: crypto.randomUUID(),
    injector: "From.Constant",
    datatype: "String",
    args: { value: policy.args ?? {} },
  }

  const cmpNode: ComparatorNode = {
    v: "0.1.0",
    kind: "comparator",
    id: crypto.randomUUID(),
    cmp: policy.tag,
    args: [policyArgNode],
  }

  const allowed = Boolean(await evaluate(cmpNode, ctx))
  if (allowed) return { allow: true }

  if (onFail?.redirect) return { redirect: onFail.redirect }
  if (onFail?.status) return { status: onFail.status }
  return { status: 403 }
}

/**
 * Convenience wrapper with a flat signature.
 */
export function guardRoute(
  ctx: ComposeContext,
  policyTag: string,
  policyArgs?: Record<string, unknown>,
  onFail?: GuardOnFail,
): Promise<GuardDecision> {
  return guardAuthorized(ctx, { tag: policyTag, args: policyArgs }, onFail)
}

export default guardAuthorized
