import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type EntertainmentBusinessProps from "../../../../../../types/Thing/EntertainmentBusiness/index.ts"
import type NightClubProps from "../../../../../../types/Thing/NightClub/index.ts"

import EntertainmentBusiness from "../index.tsx"

// NightClub adds no properties to the EntertainmentBusiness schema type
export type Props = BaseComponentProps<
	NightClubProps,
	"NightClub",
	ExtractLevelProps<NightClubProps, EntertainmentBusinessProps>
>

export default function NightClub({
	schemaType = "NightClub",
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
