import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AdultEntertainmentProps from "../../../../../../types/Thing/AdultEntertainment/index.ts"
import type EntertainmentBusinessProps from "../../../../../../types/Thing/EntertainmentBusiness/index.ts"

import EntertainmentBusiness from "./index.tsx"

// AdultEntertainment adds no properties to the EntertainmentBusiness schema type
export type Props = BaseComponentProps<
	AdultEntertainmentProps,
	"AdultEntertainment",
	ExtractLevelProps<AdultEntertainmentProps, EntertainmentBusinessProps>
>

export default function AdultEntertainment({
	schemaType = "AdultEntertainment",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<EntertainmentBusiness
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
