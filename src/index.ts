import { config } from './config';
import { JobService } from './services/jobService';
import { JobContext } from './types';
import logger from './utils/logger';

async function main(): Promise<void> {
  const context: JobContext = {
    startTime: new Date(),
    config
  };

  const jobService = new JobService(context);

  try {
    const result = await jobService.execute();
    
    if (result.success) {
      logger.info('Job completed successfully', { result });
      process.exit(0);
    } else {
      logger.error('Job failed', { result });
      process.exit(1);
    }
  } catch (error) {
    logger.error('Unexpected error during job execution', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    process.exit(1);
  }
}

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception', { error: error.message });
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {
  logger.error('Unhandled rejection', { 
    reason: reason instanceof Error ? reason.message : 'Unknown reason' 
  });
  process.exit(1);
});

(async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    // Error handling
    process.exit(1);
  }
})();
