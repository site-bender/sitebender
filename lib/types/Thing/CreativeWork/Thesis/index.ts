import type { Text } from "../../../DataType/index.ts"
import type CreativeWork from "../index.ts"

export default interface Thesis extends CreativeWork {
	/** Qualification, candidature, degree, application that Thesis supports. */
	inSupportOf?: Text
}
