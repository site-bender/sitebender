import type { Text } from "../../../DataType/index.ts"
import type { AdministrativeArea } from "../../index.ts"
import type { Intangible } from "../index.ts"

// Audience interface - extends Intangible
// Intended audience for an item, i.e. the group for whom the item was created.
export interface Audience extends Intangible {
	audienceType?: Text
	geographicArea?: AdministrativeArea
}
