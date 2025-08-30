// Shim re-export so internal src files can import types via relative paths
// This forwards to the canonical types located at libraries/adaptive/types/
export * from "../../types/index.ts"

// Local shims for legacy imports in src that referenced GlobalAttributes/AriaAttributes
// These operators don't actually use these attribute types; providing permissive
// aliases here keeps type-checks green without coupling to element attribute defs.
export type GlobalAttributes = Record<string, unknown>
export type AriaAttributes = Record<string, unknown>

// Re-export commonly used element constructor types so src files can import from here
export type {
	ElementAttributes,
	ElementConfig,
	TextNodeConfig,
	TextNodeConstructor,
	ChildFilter,
} from "../constructors/elements/types/index.ts"
