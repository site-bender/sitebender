/*++
 + Types shared by isUserActive and clampAccountAge
 + UserData is used by both isUserActive AND clampAccountAge
 + This demonstrates types rising to LCA when shared by multiple consumers
 */
export type UserData = {
	readonly accountAgeDays: number
}
