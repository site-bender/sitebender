import type BaseProps from "../../../../types/index.ts"
import type { Legislation as LegislationProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = LegislationProps & BaseProps

export default function Legislation({
	_type = "Legislation",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
