import type {
	BaseComponentProps,
	ExtractLevelProps,
} from "../../../../../../types/index.ts"
import type HealthClubProps from "../../../../../../types/Thing/HealthClub/index.ts"
import type SportsActivityLocationProps from "../../../../../../types/Thing/SportsActivityLocation/index.ts"

import SportsActivityLocation from "../index.tsx"

// HealthClub adds no properties to the SportsActivityLocation schema type
export type Props = BaseComponentProps<
	HealthClubProps,
	"HealthClub",
	ExtractLevelProps<HealthClubProps, SportsActivityLocationProps>
>

export default function HealthClub({
	_type = "HealthClub",
	children,
	subtypeProperties = {},
	...props
}: Props) {
	return (
		<SportsActivityLocation
			{...props}
			_type={_type}
			subtypeProperties={subtypeProperties}
		>{children}</HealthClubProps>
	)
}
