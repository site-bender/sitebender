import type BaseProps from "../../../../../types/index.ts"
import type { TouristInformationCenter as TouristInformationCenterProps } from "../../../../../types/index.ts"

import LocalBusiness from "../index.tsx"

export type Props = TouristInformationCenterProps & BaseProps

export default function TouristInformationCenter({
	_type = "TouristInformationCenter",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
