import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../index.ts"
import type { LandformProps } from "../../index.ts"
import type { BodyOfWaterProps } from "../index.ts"

export interface PondProps {}

type Pond = Thing & PlaceProps & LandformProps & BodyOfWaterProps & PondProps

export default Pond
