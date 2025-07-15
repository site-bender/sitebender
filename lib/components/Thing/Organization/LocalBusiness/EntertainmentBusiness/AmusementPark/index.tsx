import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type AmusementParkProps from "../../../../../../types/Thing/AmusementPark/index.ts"
import type EntertainmentBusinessProps from "../../../../../../types/Thing/EntertainmentBusiness/index.ts"

import EntertainmentBusiness from "./index.tsx"

// AmusementPark adds no properties to the EntertainmentBusiness schema type
export type Props = BaseComponentProps<
	AmusementParkProps,
	"AmusementPark",
	ExtractLevelProps<AmusementParkProps, EntertainmentBusinessProps>
>

export default function AmusementPark({
	schemaType = "AmusementPark",
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
