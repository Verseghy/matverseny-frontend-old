import * as jspb from 'google-protobuf'



export class SetTimeRequest extends jspb.Message {
  getStart(): string;
  setStart(value: string): SetTimeRequest;

  getEnd(): string;
  setEnd(value: string): SetTimeRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetTimeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetTimeRequest): SetTimeRequest.AsObject;
  static serializeBinaryToWriter(message: SetTimeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetTimeRequest;
  static deserializeBinaryFromReader(message: SetTimeRequest, reader: jspb.BinaryReader): SetTimeRequest;
}

export namespace SetTimeRequest {
  export type AsObject = {
    start: string,
    end: string,
  }
}

export class SetTimeResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetTimeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetTimeResponse): SetTimeResponse.AsObject;
  static serializeBinaryToWriter(message: SetTimeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetTimeResponse;
  static deserializeBinaryFromReader(message: SetTimeResponse, reader: jspb.BinaryReader): SetTimeResponse;
}

export namespace SetTimeResponse {
  export type AsObject = {
  }
}

