import type BaseProps from "../../../../../../types/index.ts"
import type { StadiumOrArena as StadiumOrArenaProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

// StadiumOrArena adds no properties to the ListItem schema type
export type Props = StadiumOrArenaProps & BaseProps

export default function StadiumOrArena({
	_type = "StadiumOrArena",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
