import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../types/index.ts"
import type LocalBusinessProps from "../../../../../types/Thing/LocalBusiness/index.ts"
import type TelevisionStationProps from "../../../../../types/Thing/TelevisionStation/index.ts"

import LocalBusiness from "../index.tsx"

// TelevisionStation adds no properties to the LocalBusiness schema type
export type Props = BaseComponentProps<
	TelevisionStationProps,
	"TelevisionStation",
	ExtractLevelProps<TelevisionStationProps, LocalBusinessProps>
>

export default function TelevisionStation({
	schemaType = "TelevisionStation",
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
