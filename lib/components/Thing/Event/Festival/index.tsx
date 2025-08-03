import type BaseProps from "../../../../types/index.ts"
import type { Festival as FestivalProps } from "../../../../types/index.ts"

import Event from "../index.tsx"

export type Props = FestivalProps & BaseProps

export default function Festival({
	_type = "Festival",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
