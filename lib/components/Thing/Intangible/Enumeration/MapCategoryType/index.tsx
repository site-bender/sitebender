import type BaseProps from "../../../../../types/index.ts"
import type { MapCategoryType as MapCategoryTypeProps } from "../../../../../types/index.ts"

import Enumeration from "../index.tsx"

export type Props = MapCategoryTypeProps & BaseProps

export default function MapCategoryType({
	_type = "MapCategoryType",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
