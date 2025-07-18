import type { Text } from "../../../../DataType/index.ts"
import type Article from "../index.ts"

export default interface Report extends Article {
	/** The number or other unique designator assigned to a Report by the publishing organization. */
	reportNumber?: Text
}
