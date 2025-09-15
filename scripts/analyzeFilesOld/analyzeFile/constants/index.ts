//++ [GROUP] Regular expressions for parsing TypeScript/JavaScript functions and exports

//++ Matches function declarations (supports async/generator and optional name)
export const FUNCTION_DECLARATION_REGEX = /(export\s+default\s+)?(async\s+)?function(\s*\*)?\s*([A-Za-z0-9_$]+)?\s*\(/g

//++ Matches named function expressions: const x = function() {}/async/generator
export const NAMED_FUNCTION_EXPRESSION_REGEX = /(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(async\s+)?function(\s*\*)?\s*\(/g

//++ Matches arrow functions with block body: const x = (...) => { ... }
export const ARROW_FUNCTION_BLOCK_REGEX = /(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s+)?(?:\([^)]*\)|[A-Za-z0-9_$]+)\s*=>\s*\{/g

//++ Matches arrow functions with concise body: const x = (...) => expr
export const ARROW_FUNCTION_CONCISE_REGEX = /(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s+)?(?:\([^)]*\)|[A-Za-z0-9_$]+)\s*=>\s*(?!\{)/g

//++ Matches export default arrow/function without name
export const EXPORT_DEFAULT_ARROW_REGEX = /export\s+default\s+(?:async\s+)?(?:\([^)]*\)|[A-Za-z0-9_$]+)\s*=>\s*(\{)?/g

//++ Matches export default Name (identifier or function name)
export const EXPORT_DEFAULT_NAME_REGEX = /\bexport\s+default\s+([A-Za-z0-9_$]+)\b(?!\s*\()/g

//++ Matches export { X as default }
export const LOCAL_EXPORT_AS_DEFAULT_REGEX = /\bexport\s*\{([\s\S]*?)\}/g

//++ Matches exported named const function: export const X = function
export const EXPORT_NAMED_FUNCTION_EXPRESSION_REGEX = /\bexport\s+(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s+)?function/g

//++ Matches exported named const arrow: export const X = () =>
export const EXPORT_NAMED_ARROW_REGEX = /\bexport\s+(?:const|let|var)\s+([A-Za-z0-9_$]+)\s*=\s*(?:async\s+)?(?:\([^)]*\)|[A-Za-z0-9_$]+)\s*=>/g

//++ Matches exported function declaration (named, non-default)
export const EXPORT_FUNCTION_DECLARATION_REGEX = /\bexport\s+(?:async\s+)?function\s+([A-Za-z0-9_$]+)/g

//++ Matches local named export list (no 'from'): export { A, B as C }
export const LOCAL_NAMED_EXPORT_LIST_REGEX = /\bexport\s*\{([\s\S]*?)\}\s*(?!from\b)/g

//++ [END]