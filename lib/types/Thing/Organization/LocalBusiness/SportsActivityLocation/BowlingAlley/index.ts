import type Thing from "../../../../index.ts"
import type { PlaceProps } from "../../../../Place/index.ts"
import type { OrganizationProps } from "../../../index.ts"
import type { LocalBusinessProps } from "../../index.ts"
import type { SportsActivityLocationProps } from "../index.ts"

export interface BowlingAlleyProps {}

type BowlingAlley =
	& Thing
	& PlaceProps
	& LocalBusinessProps
	& SportsActivityLocationProps
	& OrganizationProps
	& BowlingAlleyProps

export default BowlingAlley
