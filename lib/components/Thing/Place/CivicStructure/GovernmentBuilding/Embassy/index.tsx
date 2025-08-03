import type BaseProps from "../../../../../../types/index.ts"
import type { Embassy as EmbassyProps } from "../../../../../../types/index.ts"

import GovernmentBuilding from "../index.tsx"

export type Props = EmbassyProps & BaseProps

export default function Embassy({
	_type = "Embassy",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
