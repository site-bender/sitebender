import type BaseProps from "../../../../types/index.ts"
import type { SoftwareApplication as SoftwareApplicationProps } from "../../../../types/index.ts"

import CreativeWork from "../index.tsx"

export type Props = SoftwareApplicationProps & BaseProps

export default function SoftwareApplication({
	_type = "SoftwareApplication",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
