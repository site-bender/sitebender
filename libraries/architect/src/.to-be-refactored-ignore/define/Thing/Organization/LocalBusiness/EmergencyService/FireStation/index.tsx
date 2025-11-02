import type BaseProps from "../../../../../../../types/index.ts"
import type { FireStation as FireStationProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

// FireStation adds no properties to the ListItem schema type
export type Props = FireStationProps & BaseProps

export default function FireStation({
	_type = "FireStation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
