import type BaseProps from "../../../../../../types/index.ts"
import type SkiResortProps from "../../../../../../types/Thing/Organization/LocalBusiness/SportsActivityLocation/SkiResort/index.ts"

import SportsActivityLocation from "../index.tsx"

export type Props = SkiResortProps & BaseProps

export default function SkiResort({
	_type = "SkiResort",
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
