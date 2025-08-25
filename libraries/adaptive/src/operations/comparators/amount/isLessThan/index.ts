import compare from "../../compare.ts"

const isLessThan = compare((o: number | Temporal.PlainDate | Temporal.PlainTime | Temporal.PlainDateTime, t: typeof o) => (o as any) < (t as any))

export default isLessThan
