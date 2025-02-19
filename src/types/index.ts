export interface JobConfig {
  maxRetries: number;
  timeoutSeconds: number;
}

export interface JobResult {
  success: boolean;
  message: string;
  data?: unknown;
  error?: Error;
}

export interface JobContext {
  startTime: Date;
  config: JobConfig;
}

