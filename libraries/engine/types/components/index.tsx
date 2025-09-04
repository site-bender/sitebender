// Re-export all component definitions for schema.org from the public components package.
// This local barrel exists so engine/types can reference "../../../../components/index.tsx"
// without deep-crossing into another package; it forwards to the public alias.
export * from "@sitebender/components/define/index.ts"
