import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type ComedyClubProps from "../../../../../../types/Thing/ComedyClub/index.ts"
import type EntertainmentBusinessProps from "../../../../../../types/Thing/EntertainmentBusiness/index.ts"

import EntertainmentBusiness from "./index.tsx"

// ComedyClub adds no properties to the EntertainmentBusiness schema type
export type Props = BaseComponentProps<
	ComedyClubProps,
	"ComedyClub",
	ExtractLevelProps<ComedyClubProps, EntertainmentBusinessProps>
>

export default function ComedyClub({
	schemaType = "ComedyClub",
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
