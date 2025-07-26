import type Thing from "../../index.ts"
import type { PlaceProps } from "../index.ts"

export interface LandformProps {
}

type Landform =
	& Thing
	& PlaceProps
	& LandformProps

export default Landform
