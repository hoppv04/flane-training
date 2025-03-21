export interface ITraining {
  sourceUri: string;
  code: string;
  trainingSrc: string;
  name: string;
  language?: string;
  status: boolean;
  trainingType: string;
  miningAt: Date;
}
