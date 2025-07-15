import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type SportsActivityLocationProps from "../../../../../../types/Thing/SportsActivityLocation/index.ts"
import type SportsClubProps from "../../../../../../types/Thing/SportsClub/index.ts"

import SportsActivityLocation from "./index.tsx"

// SportsClub adds no properties to the SportsActivityLocation schema type
export type Props = BaseComponentProps<
	SportsClubProps,
	"SportsClub",
	ExtractLevelProps<SportsClubProps, SportsActivityLocationProps>
>

export default function SportsClub({
	schemaType = "SportsClub",
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<SportsActivityLocation
			{...props}
			schemaType={schemaType}
			subtypeProperties={subtypeProperties}
		/>
	)
}
