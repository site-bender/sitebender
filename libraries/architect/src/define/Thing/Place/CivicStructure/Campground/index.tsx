import type BaseProps from "../../../../../../types/index.ts"
import type { Campground as CampgroundProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = CampgroundProps & BaseProps

export default function Campground({
	_type = "Campground",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
