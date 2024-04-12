/**
 * Retrieves an environment variable value.
 */
export function env(key: keyof EnvironmentVariables, fallback = "") {
  try {
    return (
      globalThis.window?.__env__?.[key] ??
      process.env[key]?.replace(/^"|"$/g, "") ??
      fallback
    );
  } catch (error) {
    return fallback;
  }
}
