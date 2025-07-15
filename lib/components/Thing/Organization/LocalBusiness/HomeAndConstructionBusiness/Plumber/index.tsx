import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type HomeAndConstructionBusinessProps from "../../../../../../types/Thing/HomeAndConstructionBusiness/index.ts"
import type PlumberProps from "../../../../../../types/Thing/Plumber/index.ts"

import HomeAndConstructionBusiness from "./index.tsx"

// Plumber adds no properties to the HomeAndConstructionBusiness schema type
export type Props = BaseComponentProps<
	PlumberProps,
	"Plumber",
	ExtractLevelProps<PlumberProps, HomeAndConstructionBusinessProps>
>

export default function Plumber({
	schemaType = "Plumber",
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
