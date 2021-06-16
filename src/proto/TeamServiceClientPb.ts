/**
 * @fileoverview gRPC-Web generated client stub for team
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as team_pb from './team_pb';


export class TeamClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfoCreateTeam = new grpcWeb.AbstractClientBase.MethodInfo(
    team_pb.CreateTeamResponse,
    (request: team_pb.CreateTeamRequest) => {
      return request.serializeBinary();
    },
    team_pb.CreateTeamResponse.deserializeBinary
  );

  createTeam(
    request: team_pb.CreateTeamRequest,
    metadata: grpcWeb.Metadata | null): Promise<team_pb.CreateTeamResponse>;

  createTeam(
    request: team_pb.CreateTeamRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: team_pb.CreateTeamResponse) => void): grpcWeb.ClientReadableStream<team_pb.CreateTeamResponse>;

  createTeam(
    request: team_pb.CreateTeamRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: team_pb.CreateTeamResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/team.Team/CreateTeam',
        request,
        metadata || {},
        this.methodInfoCreateTeam,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/team.Team/CreateTeam',
    request,
    metadata || {},
    this.methodInfoCreateTeam);
  }

  methodInfoJoinTeam = new grpcWeb.AbstractClientBase.MethodInfo(
    team_pb.JoinTeamResponse,
    (request: team_pb.JoinTeamRequest) => {
      return request.serializeBinary();
    },
    team_pb.JoinTeamResponse.deserializeBinary
  );

  joinTeam(
    request: team_pb.JoinTeamRequest,
    metadata: grpcWeb.Metadata | null): Promise<team_pb.JoinTeamResponse>;

  joinTeam(
    request: team_pb.JoinTeamRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: team_pb.JoinTeamResponse) => void): grpcWeb.ClientReadableStream<team_pb.JoinTeamResponse>;

  joinTeam(
    request: team_pb.JoinTeamRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: team_pb.JoinTeamResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/team.Team/JoinTeam',
        request,
        metadata || {},
        this.methodInfoJoinTeam,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/team.Team/JoinTeam',
    request,
    metadata || {},
    this.methodInfoJoinTeam);
  }

  methodInfoLeaveTeam = new grpcWeb.AbstractClientBase.MethodInfo(
    team_pb.LeaveTeamResponse,
    (request: team_pb.LeaveTeamRequest) => {
      return request.serializeBinary();
    },
    team_pb.LeaveTeamResponse.deserializeBinary
  );

  leaveTeam(
    request: team_pb.LeaveTeamRequest,
    metadata: grpcWeb.Metadata | null): Promise<team_pb.LeaveTeamResponse>;

  leaveTeam(
    request: team_pb.LeaveTeamRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: team_pb.LeaveTeamResponse) => void): grpcWeb.ClientReadableStream<team_pb.LeaveTeamResponse>;

  leaveTeam(
    request: team_pb.LeaveTeamRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: team_pb.LeaveTeamResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/team.Team/LeaveTeam',
        request,
        metadata || {},
        this.methodInfoLeaveTeam,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/team.Team/LeaveTeam',
    request,
    metadata || {},
    this.methodInfoLeaveTeam);
  }

  methodInfoListMembers = new grpcWeb.AbstractClientBase.MethodInfo(
    team_pb.ListMembersResponse,
    (request: team_pb.ListMembersRequest) => {
      return request.serializeBinary();
    },
    team_pb.ListMembersResponse.deserializeBinary
  );

  listMembers(
    request: team_pb.ListMembersRequest,
    metadata: grpcWeb.Metadata | null): Promise<team_pb.ListMembersResponse>;

  listMembers(
    request: team_pb.ListMembersRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: team_pb.ListMembersResponse) => void): grpcWeb.ClientReadableStream<team_pb.ListMembersResponse>;

  listMembers(
    request: team_pb.ListMembersRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: team_pb.ListMembersResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/team.Team/ListMembers',
        request,
        metadata || {},
        this.methodInfoListMembers,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/team.Team/ListMembers',
    request,
    metadata || {},
    this.methodInfoListMembers);
  }

  methodInfoUpdateTeam = new grpcWeb.AbstractClientBase.MethodInfo(
    team_pb.UpdateTeamResponse,
    (request: team_pb.UpdateTeamRequest) => {
      return request.serializeBinary();
    },
    team_pb.UpdateTeamResponse.deserializeBinary
  );

  updateTeam(
    request: team_pb.UpdateTeamRequest,
    metadata: grpcWeb.Metadata | null): Promise<team_pb.UpdateTeamResponse>;

  updateTeam(
    request: team_pb.UpdateTeamRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: team_pb.UpdateTeamResponse) => void): grpcWeb.ClientReadableStream<team_pb.UpdateTeamResponse>;

  updateTeam(
    request: team_pb.UpdateTeamRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: team_pb.UpdateTeamResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/team.Team/UpdateTeam',
        request,
        metadata || {},
        this.methodInfoUpdateTeam,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/team.Team/UpdateTeam',
    request,
    metadata || {},
    this.methodInfoUpdateTeam);
  }

  methodInfoDisbandTeam = new grpcWeb.AbstractClientBase.MethodInfo(
    team_pb.DisbandTeamResponse,
    (request: team_pb.DisbandTeamRequest) => {
      return request.serializeBinary();
    },
    team_pb.DisbandTeamResponse.deserializeBinary
  );

  disbandTeam(
    request: team_pb.DisbandTeamRequest,
    metadata: grpcWeb.Metadata | null): Promise<team_pb.DisbandTeamResponse>;

  disbandTeam(
    request: team_pb.DisbandTeamRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: team_pb.DisbandTeamResponse) => void): grpcWeb.ClientReadableStream<team_pb.DisbandTeamResponse>;

  disbandTeam(
    request: team_pb.DisbandTeamRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: team_pb.DisbandTeamResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/team.Team/DisbandTeam',
        request,
        metadata || {},
        this.methodInfoDisbandTeam,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/team.Team/DisbandTeam',
    request,
    metadata || {},
    this.methodInfoDisbandTeam);
  }

  methodInfoChangeLock = new grpcWeb.AbstractClientBase.MethodInfo(
    team_pb.ChangeLockResponse,
    (request: team_pb.ChangeLockRequest) => {
      return request.serializeBinary();
    },
    team_pb.ChangeLockResponse.deserializeBinary
  );

  changeLock(
    request: team_pb.ChangeLockRequest,
    metadata: grpcWeb.Metadata | null): Promise<team_pb.ChangeLockResponse>;

  changeLock(
    request: team_pb.ChangeLockRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: team_pb.ChangeLockResponse) => void): grpcWeb.ClientReadableStream<team_pb.ChangeLockResponse>;

  changeLock(
    request: team_pb.ChangeLockRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: team_pb.ChangeLockResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/team.Team/ChangeLock',
        request,
        metadata || {},
        this.methodInfoChangeLock,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/team.Team/ChangeLock',
    request,
    metadata || {},
    this.methodInfoChangeLock);
  }

  methodInfoChangeCoOwnerStatus = new grpcWeb.AbstractClientBase.MethodInfo(
    team_pb.ChangeCoOwnerStatusResponse,
    (request: team_pb.ChangeCoOwnerStatusRequest) => {
      return request.serializeBinary();
    },
    team_pb.ChangeCoOwnerStatusResponse.deserializeBinary
  );

  changeCoOwnerStatus(
    request: team_pb.ChangeCoOwnerStatusRequest,
    metadata: grpcWeb.Metadata | null): Promise<team_pb.ChangeCoOwnerStatusResponse>;

  changeCoOwnerStatus(
    request: team_pb.ChangeCoOwnerStatusRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: team_pb.ChangeCoOwnerStatusResponse) => void): grpcWeb.ClientReadableStream<team_pb.ChangeCoOwnerStatusResponse>;

  changeCoOwnerStatus(
    request: team_pb.ChangeCoOwnerStatusRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: team_pb.ChangeCoOwnerStatusResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/team.Team/ChangeCoOwnerStatus',
        request,
        metadata || {},
        this.methodInfoChangeCoOwnerStatus,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/team.Team/ChangeCoOwnerStatus',
    request,
    metadata || {},
    this.methodInfoChangeCoOwnerStatus);
  }

  methodInfoKickUser = new grpcWeb.AbstractClientBase.MethodInfo(
    team_pb.KickUserResponse,
    (request: team_pb.KickUserRequest) => {
      return request.serializeBinary();
    },
    team_pb.KickUserResponse.deserializeBinary
  );

  kickUser(
    request: team_pb.KickUserRequest,
    metadata: grpcWeb.Metadata | null): Promise<team_pb.KickUserResponse>;

  kickUser(
    request: team_pb.KickUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: team_pb.KickUserResponse) => void): grpcWeb.ClientReadableStream<team_pb.KickUserResponse>;

  kickUser(
    request: team_pb.KickUserRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: team_pb.KickUserResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/team.Team/KickUser',
        request,
        metadata || {},
        this.methodInfoKickUser,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/team.Team/KickUser',
    request,
    metadata || {},
    this.methodInfoKickUser);
  }

  methodInfoGenerateJoinCode = new grpcWeb.AbstractClientBase.MethodInfo(
    team_pb.GenerateJoinCodeResponse,
    (request: team_pb.GenerateJoinCodeRequest) => {
      return request.serializeBinary();
    },
    team_pb.GenerateJoinCodeResponse.deserializeBinary
  );

  generateJoinCode(
    request: team_pb.GenerateJoinCodeRequest,
    metadata: grpcWeb.Metadata | null): Promise<team_pb.GenerateJoinCodeResponse>;

  generateJoinCode(
    request: team_pb.GenerateJoinCodeRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: team_pb.GenerateJoinCodeResponse) => void): grpcWeb.ClientReadableStream<team_pb.GenerateJoinCodeResponse>;

  generateJoinCode(
    request: team_pb.GenerateJoinCodeRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: team_pb.GenerateJoinCodeResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/team.Team/GenerateJoinCode',
        request,
        metadata || {},
        this.methodInfoGenerateJoinCode,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/team.Team/GenerateJoinCode',
    request,
    metadata || {},
    this.methodInfoGenerateJoinCode);
  }

}

