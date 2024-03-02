import {
  EnvironmentVariables,
  ServerlessEventObject,
} from '@twilio-labs/serverless-runtime-types/types';

interface CommonEventBody {
  CallStatus: string;
  From: string;
}

interface RespondEventBody extends CommonEventBody {
  SpeechResult: string;
}

interface StatusCallbackEventBody extends CommonEventBody {
  Timestamp: string;
  CallDuration: string;
}

interface Headers {}

interface Cookies {
  initiated: string;
  callStartTimestamp: string;
  convo: string;
  logFileName: string;
}

export interface CommonServerlessEventObject extends ServerlessEventObject<CommonEventBody, Headers, Cookies> {}
export interface RespondServerlessEventObject extends ServerlessEventObject<RespondEventBody, Headers, Cookies> {}
export interface StatusCallbackServerlessEventObject extends ServerlessEventObject<StatusCallbackEventBody, Headers, Cookies> {}

export interface TwilioEnvironmentVariables extends EnvironmentVariables {
  OPENAI_API_KEY: string;
  AWS_REGION: string;
  AWS_ACCESS_KEY_ID: string;
  AWS_SECRET_ACCESS_KEY: string;
  RDS_PASSWORD: string;
  RDS_USER: string;
  RDS_SERVER: string;
  RDS_PORT: string;
}

export interface InsertParams {
  callStartTimestamp: string;
  callEndTimestamp: string;
  callDurationInSeconds: string;
  callerNumber: string;
  logFileName?: string;
}
