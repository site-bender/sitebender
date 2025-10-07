import GlobalOnly from "../../../../../constructors/abstracted/GlobalOnly/index.ts"
import isFlowContent from "../../../../../guards/isFlowContent/index.ts"

//-- [REFACTOR] Provide a concise description of this function here using Envoy description comment style
const Search = GlobalOnly("Search")(isFlowContent())

export default Search
