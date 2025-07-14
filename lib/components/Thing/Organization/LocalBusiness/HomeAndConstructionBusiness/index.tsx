import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type HomeAndConstructionBusinessProps from "../../../../../types/Thing/Organization/LocalBusiness/HomeAndConstructionBusiness/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/Organization/LocalBusiness/index.ts"

import LocalBusiness from "../index.tsx"

// HomeAndConstructionBusiness adds no properties to the LocalBusiness schema type
export type Props = BaseComponentProps<
	HomeAndConstructionBusinessProps,
	"HomeAndConstructionBusiness",
	ExtractLevelProps<HomeAndConstructionBusinessProps, LocalBusinessProps>
>

export default function HomeAndConstructionBusiness(
	{
		schemaType = "HomeAndConstructionBusiness",
		subtypeProperties = {},
		...props
	}: Props,
) {
	return (
		<LocalBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
