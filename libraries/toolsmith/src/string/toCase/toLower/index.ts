//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const toLower = (str: string): string => {
	//++ [EXCEPTION] .toLocaleLowerCase() permitted in Toolsmith for performance - provides toLower wrapper
	return str.toLocaleLowerCase()
}

export default toLower
