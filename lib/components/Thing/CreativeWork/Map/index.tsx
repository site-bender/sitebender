import type BaseProps from "../../../../types/index.ts"
import type { Map as MapProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = MapProps & BaseProps

export default function Map({
	_type = "Map",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
