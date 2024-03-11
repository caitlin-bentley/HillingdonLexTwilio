import { S3Client } from "@aws-sdk/client-s3";
import { Context as Context_, ServiceContext } from "@twilio-labs/serverless-runtime-types/types";
import OpenAI from "openai";
import { Twilio } from "twilio";
import { TwilioEnvironmentVariables } from "../types/interfaces";

type Context = Context_<TwilioEnvironmentVariables>;

export class ClientManager {
  private static openAIClient: OpenAI | null = null
  private static s3Client: S3Client | null = null;
  private static twilioClient: Twilio | null = null;
  private static syncClient: ServiceContext | null = null;

  public static getOpenAIClient(context: Context) {
    if (!this.openAIClient) {
      this.openAIClient = new OpenAI({apiKey: context.OPENAI_API_KEY});
    }
    return this.openAIClient;
  }

  public static getS3Client(context: Context) {
    if (!this.s3Client) {
      this.s3Client = new S3Client({
        region: context.AWS_REGION,
        credentials: {
          accessKeyId: context.AWS_ACCESS_KEY_ID,
          secretAccessKey: context.AWS_SECRET_ACCESS_KEY,
        }
      });
    }
    return this.s3Client;
  }

  public static getTwilioClient(context: Context) {
    if (!this.twilioClient) {
      this.twilioClient = context.getTwilioClient({ lazyLoading: true })
    }
    return this.twilioClient;
  }

  public static getSyncClient(context: Context) {
    if (!this.syncClient) {
      const twilioClient = this.getTwilioClient(context)
      this.syncClient = twilioClient.sync.v1.services(context.SYNC_SERVICE_SID)
    }
    return this.syncClient;
  }
}