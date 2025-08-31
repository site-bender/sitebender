import type { Datatype } from "../../../../types/index.ts"

import { OPERAND_TYPES } from "../../constants/index.ts"

type FromAuthenticationInjector = {
  tag: "FromAuthentication"
  type: typeof OPERAND_TYPES.injector
  datatype: Datatype
  path?: string
}

/**
 * FromAuthentication
 *
 * Authoring-time constructor that represents reading from auth context
 * (ComposeContext.localValues.user by default). Optional dot-path lets you
 * reach into claims, e.g., "user.email" or "claims.sub".
 */
const FromAuthentication =
  (datatype: Datatype = "String") => (path?: string): FromAuthenticationInjector => ({
    tag: "FromAuthentication",
    type: OPERAND_TYPES.injector,
    datatype,
    path,
  })

export default FromAuthentication
