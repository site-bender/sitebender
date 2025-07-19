import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalTestProps } from "../index.ts"

export interface PathologyTestProps {
	/** The type of tissue sample required for the test. */
	tissueSample?: Text
}

type PathologyTest =
	& Thing
	& MedicalEntityProps
	& MedicalTestProps
	& PathologyTestProps

export default PathologyTest
