import type BaseProps from "../../../../../../types/index.ts"
import type { DonateAction as DonateActionProps } from "../../../../../../types/index.ts"

import Base from "../../../../Base/index.tsx"

export type Props = DonateActionProps & BaseProps

export default function DonateAction({
	_type = "DonateAction",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
