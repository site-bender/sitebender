import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"
import ADVANCED_FILTERS from "../../../../../guards/createAdvancedFilters/index.ts"

/**
 * Creates an Address element configuration object
 *
 * The address element represents contact information for its nearest
 * article or body element ancestor. It cannot contain other address elements.
 *
 * @example
 * ```typescript
 * const address = Address({ id: "contact-info" })([
 *   P()("Contact: John Doe"),
 *   P()("Email: john@example.com")
 * ])
 * ```
 */
const Address = GlobalOnly("Address")(ADVANCED_FILTERS.addressContent)

export default Address
