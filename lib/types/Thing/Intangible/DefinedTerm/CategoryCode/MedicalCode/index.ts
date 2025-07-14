import { Text } from "../../../../../DataType/index.ts"
import CategoryCode from "../index.ts"

export default interface MedicalCode extends CategoryCode {
	/** A short textual code that uniquely identifies the value. */
	codeValue?: Text
	/** The coding system, e.g. 'ICD-10'. */
	codingSystem?: Text
}
