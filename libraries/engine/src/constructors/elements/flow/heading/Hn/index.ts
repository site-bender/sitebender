import type { Value } from "@engineTypes/index.ts"

import FilteredAllowText from "../../../../../constructors/abstracted/FilteredAllowText/index.ts"
import { HEADING_ROLES } from "../../../../../constructors/elements/constants/index.ts"
import getId from "../../../../../constructors/helpers/getId/index.ts"
import filterAttribute from "../../../../../guards/filterAttribute/index.ts"
import isMemberOf from "../../../../../guards/isMemberOf/index.ts"
import pickGlobalAttributes from "../../../../../guards/pickGlobalAttributes/index.ts"

import filterAttributes from "./filterAttributes/index.ts"
/**
 * Filters attributes for Hn element
 * Allows global attributes and validates role attribute against HEADING_ROLES
 */


/**
 * Creates an Hn element configuration object for dynamic heading levels
 *
 * @example
 * ```typescript
 * const hn = Hn({ id: "dynamic-heading", role: "tab" })([
 *   TextNode("Dynamic Heading")
 * ])
 * ```
 */
export const Hn = FilteredAllowText("Hn")(filterAttributes)

export default Hn

export { default as filterAttributes } from "./filterAttributes/index.ts"
