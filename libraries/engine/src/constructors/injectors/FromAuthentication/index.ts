import type { Datatype } from "../../../../types/index.ts"

import { OPERAND_TYPES } from "../../constants/index.ts"

type FromAuthenticatorInjector = {
  tag: "FromAuthenticator"
  type: typeof OPERAND_TYPES.injector
  datatype: Datatype
  path?: string
}

/**
 * FromAuthenticator
 *
 * Authoring-time constructor that represents reading from auth context
 * (ComposeContext.localValues.user by default). Optional dot-path lets you
 * reach into claims, e.g., "user.email" or "claims.sub".
 */
const FromAuthenticator =
  (datatype: Datatype = "String") => (path?: string): FromAuthenticatorInjector => ({
    tag: "FromAuthenticator",
    type: OPERAND_TYPES.injector,
    datatype,
    path,
  })

export default FromAuthenticator
