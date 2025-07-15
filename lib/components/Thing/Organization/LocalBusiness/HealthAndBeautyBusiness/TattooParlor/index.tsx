import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type HealthAndBeautyBusinessProps from "../../../../../../types/Thing/HealthAndBeautyBusiness/index.ts"
import type TattooParlorProps from "../../../../../../types/Thing/TattooParlor/index.ts"

import HealthAndBeautyBusiness from "./index.tsx"

// TattooParlor adds no properties to the HealthAndBeautyBusiness schema type
export type Props = BaseComponentProps<
	TattooParlorProps,
	"TattooParlor",
	ExtractLevelProps<TattooParlorProps, HealthAndBeautyBusinessProps>
>

export default function TattooParlor({
	schemaType = "TattooParlor",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<HealthAndBeautyBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
