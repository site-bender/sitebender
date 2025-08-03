import type BaseProps from "../../../../../../types/index.ts"
import type { Notary as NotaryProps } from "../../../../../../types/index.ts"

import LegalService from "../index.tsx"

export type Props = NotaryProps & BaseProps

export default function Notary({
	_type = "Notary",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
