import type BaseProps from "../../../../../../types/index.ts"
import type { MobilePhoneStore as MobilePhoneStoreProps } from "../../../../../../types/index.ts"

import Base from "../../../../../Base/index.tsx"

export type Props = MobilePhoneStoreProps & BaseProps

export default function MobilePhoneStore({
	_type = "MobilePhoneStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
