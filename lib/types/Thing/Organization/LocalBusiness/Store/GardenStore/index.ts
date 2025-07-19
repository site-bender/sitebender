// GardenStore extends Store but adds no additional properties
import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { LocalBusinessProps } from "../../../../Place/LocalBusiness/index.ts"
import type { StoreProps } from "../../../../Place/LocalBusiness/Store/index.ts"

// deno-lint-ignore no-empty-interface
export interface GardenStoreProps {}

type GardenStore =
	& Thing
	& LocalBusinessProps
	& PlaceProps
	& StoreProps
	& GardenStoreProps

export default GardenStore
