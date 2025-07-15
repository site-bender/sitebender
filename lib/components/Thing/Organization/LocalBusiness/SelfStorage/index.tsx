import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"
import type SelfStorageProps from "../../../../../types/Thing/SelfStorage/index.ts"

import LocalBusiness from "./index.tsx"

// SelfStorage adds no properties to the LocalBusiness schema type
export type Props = BaseComponentProps<
	SelfStorageProps,
	"SelfStorage",
	ExtractLevelProps<SelfStorageProps, LocalBusinessProps>
>

export default function SelfStorage({
	schemaType = "SelfStorage",
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
