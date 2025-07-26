import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { AdministrativeAreaProps } from "../index.ts"

export interface StateProps {
}

type State =
	& Thing
	& PlaceProps
	& AdministrativeAreaProps
	& StateProps

export default State
