import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"
import ADVANCED_FILTERS from "../../../../../guards/createAdvancedFilters/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const Address = GlobalOnly("Address")(ADVANCED_FILTERS.addressContent)

export default Address
