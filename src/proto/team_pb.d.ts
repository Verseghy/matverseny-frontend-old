import * as jspb from 'google-protobuf'



export class CreateTeamRequest extends jspb.Message {
  getName(): string;
  setName(value: string): CreateTeamRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateTeamRequest.AsObject;
  static toObject(includeInstance: boolean, msg: CreateTeamRequest): CreateTeamRequest.AsObject;
  static serializeBinaryToWriter(message: CreateTeamRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateTeamRequest;
  static deserializeBinaryFromReader(message: CreateTeamRequest, reader: jspb.BinaryReader): CreateTeamRequest;
}

export namespace CreateTeamRequest {
  export type AsObject = {
    name: string,
  }
}

export class CreateTeamResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateTeamResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CreateTeamResponse): CreateTeamResponse.AsObject;
  static serializeBinaryToWriter(message: CreateTeamResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CreateTeamResponse;
  static deserializeBinaryFromReader(message: CreateTeamResponse, reader: jspb.BinaryReader): CreateTeamResponse;
}

export namespace CreateTeamResponse {
  export type AsObject = {
  }
}

export class JoinTeamRequest extends jspb.Message {
  getCode(): string;
  setCode(value: string): JoinTeamRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): JoinTeamRequest.AsObject;
  static toObject(includeInstance: boolean, msg: JoinTeamRequest): JoinTeamRequest.AsObject;
  static serializeBinaryToWriter(message: JoinTeamRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): JoinTeamRequest;
  static deserializeBinaryFromReader(message: JoinTeamRequest, reader: jspb.BinaryReader): JoinTeamRequest;
}

export namespace JoinTeamRequest {
  export type AsObject = {
    code: string,
  }
}

export class JoinTeamResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): JoinTeamResponse.AsObject;
  static toObject(includeInstance: boolean, msg: JoinTeamResponse): JoinTeamResponse.AsObject;
  static serializeBinaryToWriter(message: JoinTeamResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): JoinTeamResponse;
  static deserializeBinaryFromReader(message: JoinTeamResponse, reader: jspb.BinaryReader): JoinTeamResponse;
}

export namespace JoinTeamResponse {
  export type AsObject = {
  }
}

export class LeaveTeamRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LeaveTeamRequest.AsObject;
  static toObject(includeInstance: boolean, msg: LeaveTeamRequest): LeaveTeamRequest.AsObject;
  static serializeBinaryToWriter(message: LeaveTeamRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LeaveTeamRequest;
  static deserializeBinaryFromReader(message: LeaveTeamRequest, reader: jspb.BinaryReader): LeaveTeamRequest;
}

export namespace LeaveTeamRequest {
  export type AsObject = {
  }
}

export class LeaveTeamResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LeaveTeamResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LeaveTeamResponse): LeaveTeamResponse.AsObject;
  static serializeBinaryToWriter(message: LeaveTeamResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LeaveTeamResponse;
  static deserializeBinaryFromReader(message: LeaveTeamResponse, reader: jspb.BinaryReader): LeaveTeamResponse;
}

export namespace LeaveTeamResponse {
  export type AsObject = {
  }
}

export class GetTeamInfoRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTeamInfoRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GetTeamInfoRequest): GetTeamInfoRequest.AsObject;
  static serializeBinaryToWriter(message: GetTeamInfoRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTeamInfoRequest;
  static deserializeBinaryFromReader(message: GetTeamInfoRequest, reader: jspb.BinaryReader): GetTeamInfoRequest;
}

export namespace GetTeamInfoRequest {
  export type AsObject = {
  }
}

export class GetTeamInfoResponse extends jspb.Message {
  getName(): string;
  setName(value: string): GetTeamInfoResponse;

  getJoinCode(): string;
  setJoinCode(value: string): GetTeamInfoResponse;

  getMembersList(): Array<GetTeamInfoResponse.Member>;
  setMembersList(value: Array<GetTeamInfoResponse.Member>): GetTeamInfoResponse;
  clearMembersList(): GetTeamInfoResponse;
  addMembers(value?: GetTeamInfoResponse.Member, index?: number): GetTeamInfoResponse.Member;

  getIsLocked(): boolean;
  setIsLocked(value: boolean): GetTeamInfoResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetTeamInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetTeamInfoResponse): GetTeamInfoResponse.AsObject;
  static serializeBinaryToWriter(message: GetTeamInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetTeamInfoResponse;
  static deserializeBinaryFromReader(message: GetTeamInfoResponse, reader: jspb.BinaryReader): GetTeamInfoResponse;
}

export namespace GetTeamInfoResponse {
  export type AsObject = {
    name: string,
    joinCode: string,
    membersList: Array<GetTeamInfoResponse.Member.AsObject>,
    isLocked: boolean,
  }

  export class Member extends jspb.Message {
    getId(): string;
    setId(value: string): Member;

    getName(): string;
    setName(value: string): Member;

    getClass(): GetTeamInfoResponse.Member.Class;
    setClass(value: GetTeamInfoResponse.Member.Class): Member;

    getRank(): GetTeamInfoResponse.Member.Rank;
    setRank(value: GetTeamInfoResponse.Member.Rank): Member;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Member.AsObject;
    static toObject(includeInstance: boolean, msg: Member): Member.AsObject;
    static serializeBinaryToWriter(message: Member, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Member;
    static deserializeBinaryFromReader(message: Member, reader: jspb.BinaryReader): Member;
  }

  export namespace Member {
    export type AsObject = {
      id: string,
      name: string,
      pb_class: GetTeamInfoResponse.Member.Class,
      rank: GetTeamInfoResponse.Member.Rank,
    }

    export enum Class { 
      K_9 = 0,
      K_10 = 1,
      K_11 = 2,
      K_12 = 3,
    }

    export enum Rank { 
      K_MEMBER = 0,
      K_COOWNER = 1,
      K_OWNER = 2,
    }
  }

}

export class UpdateTeamRequest extends jspb.Message {
  getName(): string;
  setName(value: string): UpdateTeamRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateTeamRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateTeamRequest): UpdateTeamRequest.AsObject;
  static serializeBinaryToWriter(message: UpdateTeamRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateTeamRequest;
  static deserializeBinaryFromReader(message: UpdateTeamRequest, reader: jspb.BinaryReader): UpdateTeamRequest;
}

export namespace UpdateTeamRequest {
  export type AsObject = {
    name: string,
  }
}

export class UpdateTeamResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UpdateTeamResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UpdateTeamResponse): UpdateTeamResponse.AsObject;
  static serializeBinaryToWriter(message: UpdateTeamResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UpdateTeamResponse;
  static deserializeBinaryFromReader(message: UpdateTeamResponse, reader: jspb.BinaryReader): UpdateTeamResponse;
}

export namespace UpdateTeamResponse {
  export type AsObject = {
  }
}

export class DisbandTeamRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DisbandTeamRequest.AsObject;
  static toObject(includeInstance: boolean, msg: DisbandTeamRequest): DisbandTeamRequest.AsObject;
  static serializeBinaryToWriter(message: DisbandTeamRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DisbandTeamRequest;
  static deserializeBinaryFromReader(message: DisbandTeamRequest, reader: jspb.BinaryReader): DisbandTeamRequest;
}

export namespace DisbandTeamRequest {
  export type AsObject = {
  }
}

export class DisbandTeamResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DisbandTeamResponse.AsObject;
  static toObject(includeInstance: boolean, msg: DisbandTeamResponse): DisbandTeamResponse.AsObject;
  static serializeBinaryToWriter(message: DisbandTeamResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DisbandTeamResponse;
  static deserializeBinaryFromReader(message: DisbandTeamResponse, reader: jspb.BinaryReader): DisbandTeamResponse;
}

export namespace DisbandTeamResponse {
  export type AsObject = {
  }
}

export class ChangeLockRequest extends jspb.Message {
  getShouldLock(): boolean;
  setShouldLock(value: boolean): ChangeLockRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChangeLockRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ChangeLockRequest): ChangeLockRequest.AsObject;
  static serializeBinaryToWriter(message: ChangeLockRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChangeLockRequest;
  static deserializeBinaryFromReader(message: ChangeLockRequest, reader: jspb.BinaryReader): ChangeLockRequest;
}

export namespace ChangeLockRequest {
  export type AsObject = {
    shouldLock: boolean,
  }
}

export class ChangeLockResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChangeLockResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ChangeLockResponse): ChangeLockResponse.AsObject;
  static serializeBinaryToWriter(message: ChangeLockResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChangeLockResponse;
  static deserializeBinaryFromReader(message: ChangeLockResponse, reader: jspb.BinaryReader): ChangeLockResponse;
}

export namespace ChangeLockResponse {
  export type AsObject = {
  }
}

export class ChangeCoOwnerStatusRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): ChangeCoOwnerStatusRequest;

  getShouldCoowner(): boolean;
  setShouldCoowner(value: boolean): ChangeCoOwnerStatusRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChangeCoOwnerStatusRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ChangeCoOwnerStatusRequest): ChangeCoOwnerStatusRequest.AsObject;
  static serializeBinaryToWriter(message: ChangeCoOwnerStatusRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChangeCoOwnerStatusRequest;
  static deserializeBinaryFromReader(message: ChangeCoOwnerStatusRequest, reader: jspb.BinaryReader): ChangeCoOwnerStatusRequest;
}

export namespace ChangeCoOwnerStatusRequest {
  export type AsObject = {
    userId: string,
    shouldCoowner: boolean,
  }
}

export class ChangeCoOwnerStatusResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChangeCoOwnerStatusResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ChangeCoOwnerStatusResponse): ChangeCoOwnerStatusResponse.AsObject;
  static serializeBinaryToWriter(message: ChangeCoOwnerStatusResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChangeCoOwnerStatusResponse;
  static deserializeBinaryFromReader(message: ChangeCoOwnerStatusResponse, reader: jspb.BinaryReader): ChangeCoOwnerStatusResponse;
}

export namespace ChangeCoOwnerStatusResponse {
  export type AsObject = {
  }
}

export class KickUserRequest extends jspb.Message {
  getUserId(): string;
  setUserId(value: string): KickUserRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): KickUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: KickUserRequest): KickUserRequest.AsObject;
  static serializeBinaryToWriter(message: KickUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): KickUserRequest;
  static deserializeBinaryFromReader(message: KickUserRequest, reader: jspb.BinaryReader): KickUserRequest;
}

export namespace KickUserRequest {
  export type AsObject = {
    userId: string,
  }
}

export class KickUserResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): KickUserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: KickUserResponse): KickUserResponse.AsObject;
  static serializeBinaryToWriter(message: KickUserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): KickUserResponse;
  static deserializeBinaryFromReader(message: KickUserResponse, reader: jspb.BinaryReader): KickUserResponse;
}

export namespace KickUserResponse {
  export type AsObject = {
  }
}

export class GenerateJoinCodeRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GenerateJoinCodeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: GenerateJoinCodeRequest): GenerateJoinCodeRequest.AsObject;
  static serializeBinaryToWriter(message: GenerateJoinCodeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GenerateJoinCodeRequest;
  static deserializeBinaryFromReader(message: GenerateJoinCodeRequest, reader: jspb.BinaryReader): GenerateJoinCodeRequest;
}

export namespace GenerateJoinCodeRequest {
  export type AsObject = {
  }
}

export class GenerateJoinCodeResponse extends jspb.Message {
  getNewCode(): string;
  setNewCode(value: string): GenerateJoinCodeResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GenerateJoinCodeResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GenerateJoinCodeResponse): GenerateJoinCodeResponse.AsObject;
  static serializeBinaryToWriter(message: GenerateJoinCodeResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GenerateJoinCodeResponse;
  static deserializeBinaryFromReader(message: GenerateJoinCodeResponse, reader: jspb.BinaryReader): GenerateJoinCodeResponse;
}

export namespace GenerateJoinCodeResponse {
  export type AsObject = {
    newCode: string,
  }
}

