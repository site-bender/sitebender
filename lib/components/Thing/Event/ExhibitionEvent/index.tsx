import type BaseProps from "../../../../types/index.ts"
import type { ExhibitionEvent as ExhibitionEventProps } from "../../../../types/index.ts"

import Event from "../index.tsx"

export type Props = ExhibitionEventProps & BaseProps

export default function ExhibitionEvent({
	_type = "ExhibitionEvent",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
