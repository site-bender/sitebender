// Minimal phase-2 shim: keep module present with any-typed passthrough to avoid new TS errors.
// deno-lint-ignore no-explicit-any
const castValue: any = (_datatype: unknown) => (input: any) => input

export default castValue
