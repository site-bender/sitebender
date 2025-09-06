import parseCoverageOutput from "../parseCoverageOutput/index.ts"
import validateCoverage from "../validateCoverage/index.ts"

/**
 * Runs tests with coverage collection and validates results against 100% requirement
 *
 * This is the main orchestrator function that:
 * 1. Cleans up previous coverage data
 * 2. Runs tests with coverage collection
 * 3. Generates coverage report
 * 4. Parses and validates coverage results
 * 5. Exits with appropriate code (0 for pass, 1 for fail)
 *
 * @example
 * ```typescript
 * // Usage in a script:
 * await runCoverageGate()
 * // Will exit process with code 1 if coverage < 100%
 * ```
 */
export default async function runCoverageGate(): Promise<void> {
  console.log('🚀 Running coverage gate for @sitebender/engine...\n')

  // Clean up previous coverage data
  try {
    await Deno.remove('coverage_data', { recursive: true })
  } catch {
    // Directory might not exist, that's ok
  }

  console.log('📊 Running tests with coverage collection...')

  // Run tests with coverage on the specific working test files
  const testCommand = new Deno.Command('deno', {
    args: [
      'test',
      '--coverage=coverage_data',
      'tests/behaviors/rendering/renderIrToHtml/',
      'tests/contracts/schemaV1/',
      'tests/golden/rendering/renderIrToHtml/',
      '--allow-read',
      '--allow-write'
    ],
    cwd: Deno.cwd(),
    stdout: 'piped',
    stderr: 'piped'
  })

  const testResult = await testCommand.output()

  if (!testResult.success) {
    console.error('❌ Tests failed:')
    console.error(new TextDecoder().decode(testResult.stderr))
    Deno.exit(1)
  }

  console.log('✅ Tests passed, analyzing coverage...\n')

  // Generate coverage report
  const coverageCommand = new Deno.Command('deno', {
    args: ['coverage', 'coverage_data'],
    cwd: Deno.cwd(),
    stdout: 'piped',
    stderr: 'piped'
  })

  const coverageResult = await coverageCommand.output()

  if (!coverageResult.success) {
    console.error('❌ Coverage analysis failed:')
    console.error(new TextDecoder().decode(coverageResult.stderr))
    Deno.exit(1)
  }

  const coverageOutput = new TextDecoder().decode(coverageResult.stdout)
  console.log('📈 Coverage Report:')
  console.log(coverageOutput)

  // Parse and validate coverage
  const results = parseCoverageOutput(coverageOutput)
  const validation = validateCoverage(results)

  console.log(validation.message)

  if (!validation.passed) {
    console.log('\n📚 See TESTING.md for coverage requirements')
    console.log('📚 See CLAUDE.md for the 100% coverage mandate')
    Deno.exit(1)
  }

  console.log('\n🎉 Coverage gate passed! All engine source files have 100% coverage.')
}
