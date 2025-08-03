import type BaseProps from "../../../../../../types/index.ts"
import type { AutoPartsStore as AutoPartsStoreProps } from "../../../../../../types/index.ts"

import Store from "../index.tsx"

// AutoPartsStore adds no properties to the ListItem schema type
export type Props = AutoPartsStoreProps & BaseProps

export default function AutoPartsStore({
	_type = "AutoPartsStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
