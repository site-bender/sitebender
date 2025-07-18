import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type HomeAndConstructionBusinessProps from "../../../../../../types/Thing/HomeAndConstructionBusiness/index.ts"
import type LocksmithProps from "../../../../../../types/Thing/Locksmith/index.ts"

import HomeAndConstructionBusiness from "../index.tsx"

// Locksmith adds no properties to the HomeAndConstructionBusiness schema type
export type Props = BaseComponentProps<
	LocksmithProps,
	"Locksmith",
	ExtractLevelProps<LocksmithProps, HomeAndConstructionBusinessProps>
>

export default function Locksmith({
	schemaType = "Locksmith",
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
