//++ Violation type used by enforcement scripts
export type Violation = {
  file: string
  line: number
  col: number
  rule: string
  snippet: string
}
