import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type HomeAndConstructionBusinessProps from "../../../../../../types/Thing/HomeAndConstructionBusiness/index.ts"
import type HVACBusinessProps from "../../../../../../types/Thing/HVACBusiness/index.ts"

import HomeAndConstructionBusiness from "./index.tsx"

// HVACBusiness adds no properties to the HomeAndConstructionBusiness schema type
export type Props = BaseComponentProps<
	HVACBusinessProps,
	"HVACBusiness",
	ExtractLevelProps<HVACBusinessProps, HomeAndConstructionBusinessProps>
>

export default function HVACBusiness({
	schemaType = "HVACBusiness",
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
