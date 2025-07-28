import type { Text } from "../../../../DataType/index.ts"
import type Thing from "../../../index.ts"
import type { MedicalEntityProps } from "../../index.ts"
import type { MedicalTestProps } from "../index.ts"

import PathologyTestComponent from "../../../../../../components/Thing/MedicalEntity/MedicalTest/PathologyTest/index.tsx"

export interface PathologyTestProps {
	tissueSample?: Text
}

type PathologyTest =
	& Thing
	& MedicalEntityProps
	& MedicalTestProps
	& PathologyTestProps

export default PathologyTest
