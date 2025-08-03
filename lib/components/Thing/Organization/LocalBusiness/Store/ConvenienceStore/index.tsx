import type BaseProps from "../../../../../../types/index.ts"
import type { ConvenienceStore as ConvenienceStoreProps } from "../../../../../../types/index.ts"

import Store from "../index.tsx"

export type Props = ConvenienceStoreProps & BaseProps

export default function ConvenienceStore({
	_type = "ConvenienceStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
