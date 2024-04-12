interface EnvironmentVariables {
  BASE_PATH: string;
  HOST?: string;
  NODE_ENV?: string;
  PORT?: string;
  BASE_API_URL: string;
}

interface Window {
  __env__?: EnvironmentVariables;
}
