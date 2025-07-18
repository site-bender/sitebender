import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type BloodTestProps from "../../../../../types/Thing/BloodTest/index.ts"
import type MedicalTestProps from "../../../../../types/Thing/MedicalTest/index.ts"

import MedicalTest from "../index.tsx"

// BloodTest adds no properties to the MedicalTest schema type
export type Props = BaseComponentProps<
	BloodTestProps,
	"BloodTest",
	ExtractLevelProps<BloodTestProps, MedicalTestProps>
>

export default function BloodTest({
	schemaType = "BloodTest",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<MedicalTest
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
