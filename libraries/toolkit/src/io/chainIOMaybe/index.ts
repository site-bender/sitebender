import type { IOMaybe } from "../../types/fp/io/index.ts"
import isJust from "../../maybe/isJust/index.ts"
import nothing from "../../maybe/nothing/index.ts"

/**
 * Flat maps a function returning IOMaybe over the Maybe value inside IOMaybe
 * 
 * Enables sequencing of IOMaybe computations where the second computation depends
 * on the result of the first. This is the monadic bind operation for IOMaybe that
 * prevents nested IOMaybe<Maybe<A>> structures. If the first IOMaybe produces
 * Nothing, the function is not called and Nothing is returned immediately.
 * 
 * @curried (f) => (ioMaybe) => chainedIOMaybe
 * @param f - Function that takes a value and returns an IOMaybe
 * @param ioMaybe - IOMaybe to chain from
 * @returns New IOMaybe representing the sequenced computation
 * @example
 * ```typescript
 * import { ioMaybe } from "../ioMaybe/index.ts"
 * import { runIO } from "../runIO/index.ts"
 * import { just } from "../../maybe/just/index.ts"
 * import { nothing } from "../../maybe/nothing/index.ts"
 * import { mapIOMaybe } from "../mapIOMaybe/index.ts"
 * 
 * // Basic chaining
 * const getUserIdIO = ioMaybe(() => just("user-123"))
 * const fetchUserIO = (id: string) => ioMaybe(() => 
 *   id.startsWith("user-") ? just({ id, name: "Alice" }) : nothing()
 * )
 * const userDataIO = chainIOMaybe(fetchUserIO)(getUserIdIO)
 * runIO(userDataIO)                        // Just({ id: "user-123", name: "Alice" })
 * 
 * // Chaining with failure
 * const invalidIdIO = ioMaybe(() => just("invalid-id"))
 * const failedUserIO = chainIOMaybe(fetchUserIO)(invalidIdIO)
 * runIO(failedUserIO)                      // Nothing
 * 
 * // Nothing input short-circuits
 * const nothingInputIO = ioMaybe(() => nothing())
 * const neverCalledIO = chainIOMaybe((x: string) => {
 *   console.log("This will never execute")
 *   return ioMaybe(() => just(x))
 * })(nothingInputIO)
 * runIO(neverCalledIO)                     // Nothing (function never called)
 * 
 * // Safe parsing chain
 * const parseJsonIO = ioMaybe(() => {
 *   const jsonString = '{"userId": "123", "email": "alice@example.com"}'
 *   try {
 *     return just(JSON.parse(jsonString))
 *   } catch {
 *     return nothing()
 *   }
 * })
 * 
 * const validateUserIO = (data: { userId: string; email: string }) => 
 *   ioMaybe(() => 
 *     data.email.includes("@") ? just(data) : nothing()
 *   )
 * 
 * const validatedUserIO = chainIOMaybe(validateUserIO)(parseJsonIO)
 * runIO(validatedUserIO)                   // Just({ userId: "123", email: "alice@example.com" })
 * 
 * // Database-like operations
 * const findUserIO = ioMaybe(() => {
 *   const users = [
 *     { id: 1, name: "Alice", roleId: 2 },
 *     { id: 2, name: "Bob", roleId: 1 }
 *   ]
 *   const user = users.find(u => u.id === 1)
 *   return user ? just(user) : nothing()
 * })
 * 
 * const findRoleIO = (user: { roleId: number }) => ioMaybe(() => {
 *   const roles = [
 *     { id: 1, name: "User" },
 *     { id: 2, name: "Admin" }
 *   ]
 *   const role = roles.find(r => r.id === user.roleId)
 *   return role ? just(role.name) : nothing()
 * })
 * 
 * const userWithRoleIO = chainIOMaybe(findRoleIO)(findUserIO)
 * runIO(userWithRoleIO)                    // Just("Admin")
 * 
 * // Configuration loading and validation
 * const loadConfigIO = ioMaybe(() => {
 *   const configJson = '{"apiUrl": "https://api.example.com", "timeout": 5000}'
 *   try {
 *     return just(JSON.parse(configJson))
 *   } catch {
 *     return nothing()
 *   }
 * })
 * 
 * const validateConfigIO = (config: { apiUrl: string; timeout: number }) => 
 *   ioMaybe(() => 
 *     config.apiUrl.startsWith("https://") && config.timeout > 0
 *       ? just(config)
 *       : nothing()
 *   )
 * 
 * const validConfigIO = chainIOMaybe(validateConfigIO)(loadConfigIO)
 * runIO(validConfigIO)                     // Just({ apiUrl: "https://api.example.com", timeout: 5000 })
 * 
 * // File path processing
 * const getFilePathIO = ioMaybe(() => {
 *   const path = "/users/alice/documents/report.pdf"
 *   return path.length > 0 ? just(path) : nothing()
 * })
 * 
 * const extractExtensionIO = (path: string) => ioMaybe(() => {
 *   const parts = path.split(".")
 *   return parts.length > 1 ? just(parts[parts.length - 1]) : nothing()
 * })
 * 
 * const extensionIO = chainIOMaybe(extractExtensionIO)(getFilePathIO)
 * runIO(extensionIO)                       // Just("pdf")
 * 
 * // URL validation and processing
 * const parseUrlIO = ioMaybe(() => {
 *   const urlString = "https://api.example.com/users/123"
 *   try {
 *     return just(new URL(urlString))
 *   } catch {
 *     return nothing()
 *   }
 * })
 * 
 * const extractUserIdIO = (url: URL) => ioMaybe(() => {
 *   const pathParts = url.pathname.split("/")
 *   const userId = pathParts[pathParts.length - 1]
 *   return userId && !isNaN(parseInt(userId)) ? just(parseInt(userId)) : nothing()
 * })
 * 
 * const userIdIO = chainIOMaybe(extractUserIdIO)(parseUrlIO)
 * runIO(userIdIO)                          // Just(123)
 * 
 * // Multi-step validation
 * const emailInputIO = ioMaybe(() => {
 *   const input = "  alice@EXAMPLE.com  "
 *   return input.trim().length > 0 ? just(input.trim()) : nothing()
 * })
 * 
 * const normalizeEmailIO = (email: string) => ioMaybe(() => 
 *   just(email.toLowerCase())
 * )
 * 
 * const validateEmailFormatIO = (email: string) => ioMaybe(() => 
 *   email.includes("@") && email.includes(".") ? just(email) : nothing()
 * )
 * 
 * const processedEmailIO = chainIOMaybe((email: string) =>
 *   chainIOMaybe(validateEmailFormatIO)(normalizeEmailIO(email))
 * )(emailInputIO)
 * runIO(processedEmailIO)                  // Just("alice@example.com")
 * 
 * // Random success/failure with processing
 * const randomOperationIO = ioMaybe(() => 
 *   Math.random() > 0.3 ? just("success-token") : nothing()
 * )
 * 
 * const processTokenIO = (token: string) => ioMaybe(() => 
 *   just(`processed-${token}-${Date.now()}`)
 * )
 * 
 * const processedTokenIO = chainIOMaybe(processTokenIO)(randomOperationIO)
 * runIO(processedTokenIO)                  // Just("processed-success-token-1692547200000") or Nothing
 * 
 * // API response processing
 * const fetchApiDataIO = ioMaybe(() => {
 *   const response = {
 *     status: 200,
 *     data: { users: [{ id: 1, name: "Alice" }] }
 *   }
 *   return response.status === 200 ? just(response.data) : nothing()
 * })
 * 
 * const extractFirstUserIO = (data: { users: Array<{ id: number; name: string }> }) => 
 *   ioMaybe(() => 
 *     data.users.length > 0 ? just(data.users[0]) : nothing()
 *   )
 * 
 * const formatUserIO = (user: { id: number; name: string }) => ioMaybe(() => 
 *   just(`User #${user.id}: ${user.name}`)
 * )
 * 
 * const formattedUserIO = chainIOMaybe((data: any) =>
 *   chainIOMaybe(formatUserIO)(extractFirstUserIO(data))
 * )(fetchApiDataIO)
 * runIO(formattedUserIO)                   // Just("User #1: Alice")
 * 
 * // Complex conditional processing
 * const getPermissionsIO = ioMaybe(() => {
 *   const user = { role: "admin", active: true }
 *   return user.active ? just(user) : nothing()
 * })
 * 
 * const checkAdminPermissionIO = (user: { role: string; active: boolean }) => 
 *   ioMaybe(() => 
 *     user.role === "admin" ? just("admin-access") : nothing()
 *   )
 * 
 * const performAdminActionIO = (permission: string) => ioMaybe(() => 
 *   just(`Action performed with ${permission}`)
 * )
 * 
 * const adminActionIO = chainIOMaybe((user: any) =>
 *   chainIOMaybe(performAdminActionIO)(checkAdminPermissionIO(user))
 * )(getPermissionsIO)
 * runIO(adminActionIO)                     // Just("Action performed with admin-access")
 * 
 * // Error recovery with alternatives
 * const primaryServiceIO = ioMaybe(() => nothing()) // Simulating failure
 * 
 * const fallbackServiceIO = (ignored: any) => ioMaybe(() => 
 *   just("fallback-result")
 * )
 * 
 * // Note: This would return Nothing since primary fails
 * // For actual fallback behavior, you'd use orElse pattern
 * const serviceResultIO = chainIOMaybe(fallbackServiceIO)(primaryServiceIO)
 * runIO(serviceResultIO)                   // Nothing
 * 
 * // Successful chain with multiple steps
 * const step1IO = ioMaybe(() => just("input"))
 * const step2IO = (input: string) => ioMaybe(() => just(`${input}-step2`))
 * const step3IO = (input: string) => ioMaybe(() => just(`${input}-step3`))
 * const step4IO = (input: string) => ioMaybe(() => just(`${input}-final`))
 * 
 * const fullPipelineIO = chainIOMaybe((s1: string) =>
 *   chainIOMaybe((s2: string) =>
 *     chainIOMaybe(step4IO)(step3IO(s2))
 *   )(step2IO(s1))
 * )(step1IO)
 * runIO(fullPipelineIO)                    // Just("input-step2-step3-final")
 * ```
 * @property Monad - Enables sequencing of dependent IOMaybe computations
 * @property Short-circuiting - Nothing input bypasses function execution
 * @property Flattening - Prevents nested IOMaybe<Maybe<A>> structures
 * @property Composable - Chains can be further chained or mapped
 */
const chainIOMaybe = <A, B>(f: (a: A) => IOMaybe<B>) => (ioMaybe: IOMaybe<A>): IOMaybe<B> => 
  () => {
    const maybeValue = ioMaybe()
    return isJust(maybeValue) ? f(maybeValue.value)() : nothing()
  }

export default chainIOMaybe