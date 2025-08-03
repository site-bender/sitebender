import type BaseProps from "../../../../types/index.ts"
import type { EducationEvent as EducationEventProps } from "../../../../types/index.ts"

import Event from "../index.tsx"

export type Props = EducationEventProps & BaseProps

export default function EducationEvent({
	_type = "EducationEvent",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
