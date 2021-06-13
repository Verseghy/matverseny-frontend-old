/**
 * @fileoverview gRPC-Web generated client stub for competition
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as shared_pb from './shared_pb';
import * as competition_pb from './competition_pb';


export class CompetitionClient {
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

  methodInfoGetProblems = new grpcWeb.AbstractClientBase.MethodInfo(
    shared_pb.ProblemStream,
    (request: shared_pb.ProblemStreamRequest) => {
      return request.serializeBinary();
    },
    shared_pb.ProblemStream.deserializeBinary
  );

  getProblems(
    request: shared_pb.ProblemStreamRequest,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/competition.Competition/GetProblems',
      request,
      metadata || {},
      this.methodInfoGetProblems);
  }

  methodInfoGetSolutions = new grpcWeb.AbstractClientBase.MethodInfo(
    competition_pb.GetSolutionsResponse,
    (request: competition_pb.GetSolutionsRequest) => {
      return request.serializeBinary();
    },
    competition_pb.GetSolutionsResponse.deserializeBinary
  );

  getSolutions(
    request: competition_pb.GetSolutionsRequest,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/competition.Competition/GetSolutions',
      request,
      metadata || {},
      this.methodInfoGetSolutions);
  }

  methodInfoSetSolutions = new grpcWeb.AbstractClientBase.MethodInfo(
    competition_pb.SetSolutionsResponse,
    (request: competition_pb.SetSolutionsRequest) => {
      return request.serializeBinary();
    },
    competition_pb.SetSolutionsResponse.deserializeBinary
  );

  setSolutions(
    request: competition_pb.SetSolutionsRequest,
    metadata: grpcWeb.Metadata | null): Promise<competition_pb.SetSolutionsResponse>;

  setSolutions(
    request: competition_pb.SetSolutionsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: competition_pb.SetSolutionsResponse) => void): grpcWeb.ClientReadableStream<competition_pb.SetSolutionsResponse>;

  setSolutions(
    request: competition_pb.SetSolutionsRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: competition_pb.SetSolutionsResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/competition.Competition/SetSolutions',
        request,
        metadata || {},
        this.methodInfoSetSolutions,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/competition.Competition/SetSolutions',
    request,
    metadata || {},
    this.methodInfoSetSolutions);
  }

  methodInfoGetTimes = new grpcWeb.AbstractClientBase.MethodInfo(
    competition_pb.GetTimesResponse,
    (request: competition_pb.GetTimesRequest) => {
      return request.serializeBinary();
    },
    competition_pb.GetTimesResponse.deserializeBinary
  );

  getTimes(
    request: competition_pb.GetTimesRequest,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/competition.Competition/GetTimes',
      request,
      metadata || {},
      this.methodInfoGetTimes);
  }

}

