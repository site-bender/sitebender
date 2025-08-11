import type BaseProps from "../../../../../../types/index.ts"
import type { PoliceStation as PoliceStationProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

// PoliceStation adds no properties to the ListItem schema type
export type Props = PoliceStationProps & BaseProps

export default function PoliceStation({
	_type = "PoliceStation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
