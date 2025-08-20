import type Thing from "../../../index.ts"
import type { PlaceProps } from "../../index.ts"
import type { AdministrativeAreaProps } from "../index.ts"

export type StateType = "State"

export interface StateProps {
	"@type"?: StateType
}

type State = Thing & PlaceProps & AdministrativeAreaProps & StateProps

export default State
