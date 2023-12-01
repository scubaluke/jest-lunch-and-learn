export function validateEnvVariables(variables: Array<string>) {
  const result = []
  for (const value of variables) {
    if (!process.env[value]) {
      result.push(value)
    }
  }

  if (result.length) {
    throw new Error(
      `Environmental variables ${result.toString()} are missing missing`,
    )
  }
}
