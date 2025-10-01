//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const lt = <T>(threshold: T) => (value: T): boolean => value < threshold

export default lt
