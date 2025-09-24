import pipe from "@sitebender/toolsmith/vanilla/combinator/pipe/index.ts"
import replace from "@sitebender/toolsmith/vanilla/string/replace/index.ts"

//++ Remove comments and string/template literals for safer scanning
export default function stripCommentsAndStrings(input: string): string {
  return pipe([
    // Remove block comments
    replace(/\/\*[\s\S]*?\*\//g)(""),
    // Remove line comments
    replace(/(^|[^:])\/\/.*$/gm)("$1"),
    // Remove template strings (greedy but fine for scanning)
    replace(/`[\s\S]*?`/g)("``"),
    // Remove single quoted strings
    replace(/'(?:\\.|[^'\\])*'/g)("''"),
    // Remove double quoted strings
    replace(/"(?:\\.|[^"\\])*"/g)('""'),
  ])(input)
}
