import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"
import type SportsActivityLocationProps from "../../../../../types/Thing/SportsActivityLocation/index.ts"

import LocalBusiness from "./index.tsx"

// SportsActivityLocation adds no properties to the LocalBusiness schema type
export type Props = BaseComponentProps<
	SportsActivityLocationProps,
	"SportsActivityLocation",
	ExtractLevelProps<SportsActivityLocationProps, LocalBusinessProps>
>

export default function SportsActivityLocation({
	schemaType = "SportsActivityLocation",
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
