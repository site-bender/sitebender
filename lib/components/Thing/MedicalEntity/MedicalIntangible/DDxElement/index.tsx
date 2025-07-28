import type { BaseComponentProps, ExtractLevelProps } from "../../../../../types/index.ts"
import type ThingProps from "../../../../../types/Thing/index.ts"
import type { MedicalEntityProps } from "../../../../../types/Thing/MedicalEntity/index.ts"
import type { MedicalIntangibleProps } from "../../../../../types/Thing/MedicalEntity/MedicalIntangible/index.ts"
import type { DDxElementProps } from "../../../../../types/Thing/MedicalEntity/MedicalIntangible/DDxElement/index.ts"

import MedicalIntangible from "../index.tsx"

export type Props = BaseComponentProps<
	DDxElementProps,
	"DDxElement",
	ExtractLevelProps<ThingProps, MedicalEntityProps, MedicalIntangibleProps>
>

export default function DDxElement({
	diagnosis,
	distinguishingSign,
	schemaType = "DDxElement",
	subtypeProperties = {},
	...props
}): Props {
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
