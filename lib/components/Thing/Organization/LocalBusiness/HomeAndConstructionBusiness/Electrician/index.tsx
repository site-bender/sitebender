import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type ElectricianProps from "../../../../../../types/Thing/Organization/LocalBusiness/HomeAndConstructionBusiness/Electrician/index.ts"
import type HomeAndConstructionBusinessProps from "../../../../../../types/Thing/Organization/LocalBusiness/HomeAndConstructionBusiness/index.ts"

import HomeAndConstructionBusiness from "../index.tsx"

// Electrician adds no properties to the HomeAndConstructionBusiness schema type
export type Props = BaseComponentProps<
	ElectricianProps,
	"Electrician",
	ExtractLevelProps<ElectricianProps, HomeAndConstructionBusinessProps>
>

export default function Electrician({
	schemaType = "Electrician",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<HomeAndConstructionBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
