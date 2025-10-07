// Public entrypoint for @sitebender/architect

export { default as evaluate } from "./runtime/evaluate/index.ts"
export { default as hydrate } from "./runtime/hydrator/index.ts"
export { default as renderHtml } from "./runtime/render/html/index.ts"

export { computed, effect, signal } from "./reactive/index.ts"

export { default as createComposeContext } from "./context/composeContext/index.ts"
export { default as registerDefaultExecutors } from "./operations/defaults/registerDefaults/index.ts"

export * as actions from "./operations/registries/actions.ts"
export * as operators from "./operations/registries/operators.ts"
export * as comparators from "./operations/registries/comparators.ts"
export * as injectors from "./operations/registries/injectors.ts"
export * as events from "./operations/registries/events.ts"

export type * from "../types/ir/index.ts"
