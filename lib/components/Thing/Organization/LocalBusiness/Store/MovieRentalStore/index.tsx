import type BaseProps from "../../../../../../types/index.ts"
import type { MovieRentalStore as MovieRentalStoreProps } from "../../../../../../types/index.ts"

import Store from "../index.tsx"

export type Props = MovieRentalStoreProps & BaseProps

export default function MovieRentalStore({
	_type = "MovieRentalStore",
	children,
	...props
}: Props): JSX.Element {
	return <Base _type={_type} {...props}>{children}</Base>
}
