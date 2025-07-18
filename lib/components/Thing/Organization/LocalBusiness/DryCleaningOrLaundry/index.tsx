import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type DryCleaningOrLaundryProps from "../../../../../types/Thing/DryCleaningOrLaundry/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"

import LocalBusiness from "../index.tsx"

// DryCleaningOrLaundry adds no properties to the LocalBusiness schema type
export type Props = BaseComponentProps<
	DryCleaningOrLaundryProps,
	"DryCleaningOrLaundry",
	ExtractLevelProps<DryCleaningOrLaundryProps, LocalBusinessProps>
>

export default function DryCleaningOrLaundry({
	schemaType = "DryCleaningOrLaundry",
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
