import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type HomeAndConstructionBusinessProps from "../../../../../../types/Thing/HomeAndConstructionBusiness/index.ts"
import type MovingCompanyProps from "../../../../../../types/Thing/MovingCompany/index.ts"

import HomeAndConstructionBusiness from "./index.tsx"

// MovingCompany adds no properties to the HomeAndConstructionBusiness schema type
export type Props = BaseComponentProps<
	MovingCompanyProps,
	"MovingCompany",
	ExtractLevelProps<MovingCompanyProps, HomeAndConstructionBusinessProps>
>

export default function MovingCompany({
	schemaType = "MovingCompany",
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
