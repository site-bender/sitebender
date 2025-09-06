/**
 * Runs Deno test with coverage collection
 * Returns the raw coverage data
 */
export default async function runCoverage(testFilePath: string): Promise<string> {
	// Create temp directory for coverage data
	const coverageDir = await Deno.makeTempDir({ prefix: "deno_coverage_" })
	
	try {
		// Run tests with coverage
		const command = new Deno.Command("deno", {
			args: [
				"test",
				"--coverage=" + coverageDir,
				"--quiet",
				testFilePath
			],
			stdout: "piped",
			stderr: "piped"
		})
		
		const process = command.spawn()
		const output = await process.output()
		
		if (!output.success) {
			const error = new TextDecoder().decode(output.stderr)
			throw new Error(`Test execution failed: ${error}`)
		}
		
		// Generate coverage report in lcov format (Deno doesn't have JSON output)
		const reportCommand = new Deno.Command("deno", {
			args: [
				"coverage",
				"--lcov",
				coverageDir
			],
			stdout: "piped",
			stderr: "piped"
		})
		
		const reportProcess = reportCommand.spawn()
		const reportOutput = await reportProcess.output()
		
		if (!reportOutput.success) {
			const error = new TextDecoder().decode(reportOutput.stderr)
			throw new Error(`Coverage report generation failed: ${error}`)
		}
		
		// Return the lcov report output
		const lcovReport = new TextDecoder().decode(reportOutput.stdout)
		
		return lcovReport
	} finally {
		// Cleanup temp directory
		try {
			await Deno.remove(coverageDir, { recursive: true })
		} catch {
			// Ignore cleanup errors
		}
	}
}