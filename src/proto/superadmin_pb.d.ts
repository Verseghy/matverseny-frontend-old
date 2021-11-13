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

export class GetTimeRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTimeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTimeRequest): GetTimeRequest.AsObject;
  static serializeBinaryToWriter(message: GetTimeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTimeRequest;
  static deserializeBinaryFromReader(message: GetTimeRequest, reader: jspb.BinaryReader): GetTimeRequest;
}

export namespace GetTimeRequest {
  export type AsObject = {
  }
}

export class GetTimeResponse extends jspb.Message {
  getStart(): string;
  setStart(value: string): GetTimeResponse;

  getEnd(): string;
  setEnd(value: string): GetTimeResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTimeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTimeResponse): GetTimeResponse.AsObject;
  static serializeBinaryToWriter(message: GetTimeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTimeResponse;
  static deserializeBinaryFromReader(message: GetTimeResponse, reader: jspb.BinaryReader): GetTimeResponse;
}

export namespace GetTimeResponse {
  export type AsObject = {
    start: string,
    end: string,
  }
}

export class GetResultsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetResultsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetResultsRequest): GetResultsRequest.AsObject;
  static serializeBinaryToWriter(message: GetResultsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetResultsRequest;
  static deserializeBinaryFromReader(message: GetResultsRequest, reader: jspb.BinaryReader): GetResultsRequest;
}

export namespace GetResultsRequest {
  export type AsObject = {
  }
}

export class GetResultsResponse extends jspb.Message {
  getResultsMap(): jspb.Map<string, GetResultsResponse.Result>;
  clearResultsMap(): GetResultsResponse;

  getTimestamp(): number;
  setTimestamp(value: number): GetResultsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetResultsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetResultsResponse): GetResultsResponse.AsObject;
  static serializeBinaryToWriter(message: GetResultsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetResultsResponse;
  static deserializeBinaryFromReader(message: GetResultsResponse, reader: jspb.BinaryReader): GetResultsResponse;
}

export namespace GetResultsResponse {
  export type AsObject = {
    resultsMap: Array<[string, GetResultsResponse.Result.AsObject]>,
    timestamp: number,
  }

  export class Result extends jspb.Message {
    getTotalAnswered(): number;
    setTotalAnswered(value: number): Result;

    getSuccessfullyAnswered(): number;
    setSuccessfullyAnswered(value: number): Result;

    getTeamName(): string;
    setTeamName(value: string): Result;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Result.AsObject;
    static toObject(includeInstance: boolean, msg: Result): Result.AsObject;
    static serializeBinaryToWriter(message: Result, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Result;
    static deserializeBinaryFromReader(message: Result, reader: jspb.BinaryReader): Result;
  }

  export namespace Result {
    export type AsObject = {
      totalAnswered: number,
      successfullyAnswered: number,
      teamName: string,
    }
  }

}

