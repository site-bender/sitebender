import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type HealthAndBeautyBusinessProps from "../../../../../types/Thing/HealthAndBeautyBusiness/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"

import LocalBusiness from "./index.tsx"

// HealthAndBeautyBusiness adds no properties to the LocalBusiness schema type
export type Props = BaseComponentProps<
	HealthAndBeautyBusinessProps,
	"HealthAndBeautyBusiness",
	ExtractLevelProps<HealthAndBeautyBusinessProps, LocalBusinessProps>
>

export default function HealthAndBeautyBusiness({
	schemaType = "HealthAndBeautyBusiness",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<LocalBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
