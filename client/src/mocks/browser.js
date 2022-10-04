import { setupWorker } from 'msw';
import { handlers } from './handlers';

// for browser environments
export const worker = setupWorker(...handlers);
