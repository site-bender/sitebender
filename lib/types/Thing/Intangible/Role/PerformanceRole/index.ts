import { Text } from "../../../../DataType/index.ts"
import Role from "../index.ts"

export default interface PerformanceRole extends Role {
	/** The name of a character played in some acting or performing role, i.e. in a PerformanceRole. */
	characterName?: Text
}
