declare global {
  namespace JSX {
    // Allow any intrinsic element for demo simplicity
    interface IntrinsicElements {
      [elemName: string]: unknown
    }
  }
}
export {}
