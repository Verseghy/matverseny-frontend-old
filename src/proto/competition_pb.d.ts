import * as jspb from 'google-protobuf'

import * as shared_pb from './shared_pb';


export class GetProblemsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetProblemsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetProblemsRequest): GetProblemsRequest.AsObject;
  static serializeBinaryToWriter(message: GetProblemsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetProblemsRequest;
  static deserializeBinaryFromReader(message: GetProblemsRequest, reader: jspb.BinaryReader): GetProblemsRequest;
}

export namespace GetProblemsRequest {
  export type AsObject = {
  }
}

export class GetSolutionsRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSolutionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetSolutionsRequest): GetSolutionsRequest.AsObject;
  static serializeBinaryToWriter(message: GetSolutionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSolutionsRequest;
  static deserializeBinaryFromReader(message: GetSolutionsRequest, reader: jspb.BinaryReader): GetSolutionsRequest;
}

export namespace GetSolutionsRequest {
  export type AsObject = {
  }
}

export class GetSolutionsResponse extends jspb.Message {
  getId(): string;
  setId(value: string): GetSolutionsResponse;

  getType(): GetSolutionsResponse.Modification;
  setType(value: GetSolutionsResponse.Modification): GetSolutionsResponse;

  getValue(): number;
  setValue(value: number): GetSolutionsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetSolutionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetSolutionsResponse): GetSolutionsResponse.AsObject;
  static serializeBinaryToWriter(message: GetSolutionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetSolutionsResponse;
  static deserializeBinaryFromReader(message: GetSolutionsResponse, reader: jspb.BinaryReader): GetSolutionsResponse;
}

export namespace GetSolutionsResponse {
  export type AsObject = {
    id: string,
    type: GetSolutionsResponse.Modification,
    value: number,
  }

  export enum Modification { 
    K_CHANGE = 0,
    K_DELETE = 1,
  }
}

export class SetSolutionsRequest extends jspb.Message {
  getId(): string;
  setId(value: string): SetSolutionsRequest;

  getValue(): number;
  setValue(value: number): SetSolutionsRequest;

  getDelete(): boolean;
  setDelete(value: boolean): SetSolutionsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetSolutionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SetSolutionsRequest): SetSolutionsRequest.AsObject;
  static serializeBinaryToWriter(message: SetSolutionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetSolutionsRequest;
  static deserializeBinaryFromReader(message: SetSolutionsRequest, reader: jspb.BinaryReader): SetSolutionsRequest;
}

export namespace SetSolutionsRequest {
  export type AsObject = {
    id: string,
    value: number,
    pb_delete: boolean,
  }
}

export class SetSolutionsResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SetSolutionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SetSolutionsResponse): SetSolutionsResponse.AsObject;
  static serializeBinaryToWriter(message: SetSolutionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SetSolutionsResponse;
  static deserializeBinaryFromReader(message: SetSolutionsResponse, reader: jspb.BinaryReader): SetSolutionsResponse;
}

export namespace SetSolutionsResponse {
  export type AsObject = {
  }
}

export class GetTimesRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTimesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTimesRequest): GetTimesRequest.AsObject;
  static serializeBinaryToWriter(message: GetTimesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTimesRequest;
  static deserializeBinaryFromReader(message: GetTimesRequest, reader: jspb.BinaryReader): GetTimesRequest;
}

export namespace GetTimesRequest {
  export type AsObject = {
  }
}

export class GetTimesResponse extends jspb.Message {
  getStart(): string;
  setStart(value: string): GetTimesResponse;

  getEnd(): string;
  setEnd(value: string): GetTimesResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTimesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTimesResponse): GetTimesResponse.AsObject;
  static serializeBinaryToWriter(message: GetTimesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTimesResponse;
  static deserializeBinaryFromReader(message: GetTimesResponse, reader: jspb.BinaryReader): GetTimesResponse;
}

export namespace GetTimesResponse {
  export type AsObject = {
    start: string,
    end: string,
  }
}

