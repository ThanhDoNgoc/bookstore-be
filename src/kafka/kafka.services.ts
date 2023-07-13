import { Kafka } from "kafkajs";
import { topics } from "./topics";
import * as dotenv from "dotenv";
import { SchemaRegistry, SchemaType } from "@kafkajs/confluent-schema-registry";

dotenv.config();

export default class KafkaService {
  private kafka: Kafka;
  private producer;
  private static instance: KafkaService = new KafkaService();
  private registry;
  private bookSchemaId;

  constructor() {
    this.kafka = new Kafka({
      clientId: process.env.CLIENT_ID,
      brokers: JSON.parse(process.env.BROKERS),
    });
  }

  public static getInstance(): KafkaService {
    return this.instance;
  }

  public async connect() {
    this.producer = this.kafka.producer();
    this.registry = new SchemaRegistry({ host: "http://0.0.0.0:8081" });
    await this.regisSchema();
    await this.producer.connect().then(() => {
      console.log("producer connected");
    });
  }

  public async createTopic() {
    const admin = this.kafka.admin();

    await admin.connect();
    admin.createTopics({
      waitForLeaders: true,
      topics,
    });
  }

  public async sendMessage(topic: string, message: any) {
    const encodedPayload = await this.registry.encode(this.bookSchemaId, message);
    try {
      await this.producer.send({
        topic,
        messages: [
          {
            value: encodedPayload,
          },
        ],
      });
      console.log("successful send message", message, encodedPayload);
    } catch (error) {
      console.log("failed to send message", error);
    }
  }

  private async regisSchema() {
    const bookSchema = `{
      "type": "record",
      "name": "BookMessage",
      "namespace": "Book1",
      "fields": [
        {
          "name": "book",
          "type": {
            "type": "record",
            "name": "Book",
            "fields": [
              {
                "name": "title",
                "type": "string"
              },
              {
                "name": "image",
                "type": "string"
              },
              {
                "name": "quantity",
                "type": "int"
              },
              {
                "name": "price",
                "type": "long"
              },
              {
                "name": "description",
                "type": "string"
              },
              {
                "name": "category",
                "type": "string"
              },
              {
                "name": "isDeleted",
                "type": "boolean"
              },
              {
                "name": "_id",
                "type": "string"
              }
            ]
          }
        },
        {
          "name": "type",
          "type": "string"
        }
      ]
    }`;

    const { id } = await this.registry.register({
      type: SchemaType.AVRO,
      schema: bookSchema,
    });

    this.bookSchemaId = id;
  }
}
