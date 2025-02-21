import { JobResult, JobContext } from '../types';
import logger from '../utils/logger';
import db from '../database';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import jobtest from '../database';

export class JobService {
  private context: JobContext;

  constructor(context: JobContext) {
    this.context = context;
  }

  async execute(): Promise<JobResult> {
    try {
      logger.info('Starting job execution', {
        startTime: this.context.startTime,
        config: this.context.config
      });
     
      // Add your job logic here
      await this.simulateWork();

      return {
        success: true,
        message: 'Job completed successfully'
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      logger.error('Job execution failed', { error: errorMessage });
      
      return {
        success: false,
        message: 'Job execution failed',
        error: error as Error
      };
    }
  }
  private generateRandomUser() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }).toLowerCase()
    };
  }
  
  private async simulateWork(): Promise<void> {

      logger.info('Starting job processing');
  
      try {
          await jobtest();
          // Make third-party API call
          const response = await axios.post(
            process.env.THIRD_PARTY_URL as string, 
            'Hello World! testing third party',
            {
              headers: {
                'Content-Type': 'text/plain'
              }
            }
          );
    
          logger.info('Third-party API call successful', { 
            statusCode: response.status,
            responseData: response.data
          });
    
          // Simulate additional processing
          await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        logger.error('Error in job processing', {
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        throw error;
      }
  
      logger.info('Job processing complete');
  }
}
