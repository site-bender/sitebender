import type BaseProps from "../../../../../../../types/index.ts"
import type { DefenceEstablishment as DefenceEstablishmentProps } from "../../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = DefenceEstablishmentProps & BaseProps

export default function DefenceEstablishment({
	_type = "DefenceEstablishment",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
