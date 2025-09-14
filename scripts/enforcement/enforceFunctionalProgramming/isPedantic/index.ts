import includes from "@sitebender/toolkit/vanilla/array/includes/index.ts"

export default function isPedantic(args: Array<string>): boolean {
  return includes("--pedantic")(args)
}
