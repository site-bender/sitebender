import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type InternetCafeProps from "../../../../../types/Thing/InternetCafe/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"

import LocalBusiness from "../index.tsx"

// InternetCafe adds no properties to the LocalBusiness schema type
export type Props = BaseComponentProps<
	InternetCafeProps,
	"InternetCafe",
	ExtractLevelProps<InternetCafeProps, LocalBusinessProps>
>

export default function InternetCafe({
	schemaType = "InternetCafe",
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
