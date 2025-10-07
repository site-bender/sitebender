import type { Datatype } from "../../../../types/index.ts"

import { OPERAND_TYPES } from "../../constants/index.ts"

type FromAuthenticatorInjector = {
	tag: "FromAuthenticator"
	type: typeof OPERAND_TYPES.injector
	datatype: Datatype
	path?: string
}

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const FromAuthenticator =
	(datatype: Datatype = "String") =>
	(path?: string): FromAuthenticatorInjector => ({
		tag: "FromAuthenticator",
		type: OPERAND_TYPES.injector,
		datatype,
		path,
	})

export default FromAuthenticator
