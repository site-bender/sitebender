import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DDxElementProps from "../../../../../types/Thing/DDxElement/index.ts"
import type MedicalIntangibleProps from "../../../../../types/Thing/MedicalIntangible/index.ts"

import MedicalIntangible from "../index.tsx"

export type Props = BaseComponentProps<
	DDxElementProps,
	"DDxElement",
	ExtractLevelProps<DDxElementProps, MedicalIntangibleProps>
>

export default function DDxElement(
	{
		diagnosis,
		distinguishingSign,
		schemaType = "DDxElement",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<MedicalIntangible
			{...props}
			schemaType={schemaType}
			subtypeProperties={{
				diagnosis,
				distinguishingSign,
				...subtypeProperties,
			}}
		/>
	)
}
