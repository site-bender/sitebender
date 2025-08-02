import type BaseProps from "../../../../../../types/index.ts"
import type BowlingAlleyProps from "../../../../../../types/Thing/Organization/LocalBusiness/SportsActivityLocation/BowlingAlley/index.ts"

import SportsActivityLocation from "../index.tsx"

export type Props = BowlingAlleyProps & BaseProps

export default function BowlingAlley({
	_type = "BowlingAlley",
	children,
	subtypeProperties = {},
	...props
}: Props): JSX.Element {
	return (
		<SportsActivityLocation
			{...props}
			_type={_type}
			subtypeProperties={{
				...subtypeProperties,
			}}
		>
			{children}
		</SportsActivityLocation>
	)
}
