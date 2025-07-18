import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"
import type RadioStationProps from "../../../../../types/Thing/RadioStation/index.ts"

import LocalBusiness from "../index.tsx"

// RadioStation adds no properties to the LocalBusiness schema type
export type Props = BaseComponentProps<
	RadioStationProps,
	"RadioStation",
	ExtractLevelProps<RadioStationProps, LocalBusinessProps>
>

export default function RadioStation({
	schemaType = "RadioStation",
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
