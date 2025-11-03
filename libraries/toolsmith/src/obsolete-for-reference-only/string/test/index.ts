//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const test = (pattern: RegExp) => (str: string): boolean => pattern.test(str)

export default test
