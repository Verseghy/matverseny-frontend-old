/**
 * @fileoverview gRPC-Web generated client stub for auth
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as shared_pb from './shared_pb';
import * as admin_pb from './admin_pb';


export class AdminClient {
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

  methodInfoCreateProblem = new grpcWeb.AbstractClientBase.MethodInfo(
    admin_pb.CreateResponse,
    (request: admin_pb.CreateRequest) => {
      return request.serializeBinary();
    },
    admin_pb.CreateResponse.deserializeBinary
  );

  createProblem(
    request: admin_pb.CreateRequest,
    metadata: grpcWeb.Metadata | null): Promise<admin_pb.CreateResponse>;

  createProblem(
    request: admin_pb.CreateRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: admin_pb.CreateResponse) => void): grpcWeb.ClientReadableStream<admin_pb.CreateResponse>;

  createProblem(
    request: admin_pb.CreateRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: admin_pb.CreateResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/auth.Admin/CreateProblem',
        request,
        metadata || {},
        this.methodInfoCreateProblem,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/auth.Admin/CreateProblem',
    request,
    metadata || {},
    this.methodInfoCreateProblem);
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
        '/auth.Admin/GetProblems',
      request,
      metadata || {},
      this.methodInfoGetProblems);
  }

  methodInfoUpdateProblem = new grpcWeb.AbstractClientBase.MethodInfo(
    admin_pb.UpdateResponse,
    (request: admin_pb.UpdateRequest) => {
      return request.serializeBinary();
    },
    admin_pb.UpdateResponse.deserializeBinary
  );

  updateProblem(
    request: admin_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null): Promise<admin_pb.UpdateResponse>;

  updateProblem(
    request: admin_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: admin_pb.UpdateResponse) => void): grpcWeb.ClientReadableStream<admin_pb.UpdateResponse>;

  updateProblem(
    request: admin_pb.UpdateRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: admin_pb.UpdateResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/auth.Admin/UpdateProblem',
        request,
        metadata || {},
        this.methodInfoUpdateProblem,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/auth.Admin/UpdateProblem',
    request,
    metadata || {},
    this.methodInfoUpdateProblem);
  }

  methodInfoDeleteProblem = new grpcWeb.AbstractClientBase.MethodInfo(
    admin_pb.DeleteResponse,
    (request: admin_pb.DeleteRequest) => {
      return request.serializeBinary();
    },
    admin_pb.DeleteResponse.deserializeBinary
  );

  deleteProblem(
    request: admin_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null): Promise<admin_pb.DeleteResponse>;

  deleteProblem(
    request: admin_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: admin_pb.DeleteResponse) => void): grpcWeb.ClientReadableStream<admin_pb.DeleteResponse>;

  deleteProblem(
    request: admin_pb.DeleteRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: admin_pb.DeleteResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/auth.Admin/DeleteProblem',
        request,
        metadata || {},
        this.methodInfoDeleteProblem,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/auth.Admin/DeleteProblem',
    request,
    metadata || {},
    this.methodInfoDeleteProblem);
  }

  methodInfoSwapProblem = new grpcWeb.AbstractClientBase.MethodInfo(
    admin_pb.SwapResponse,
    (request: admin_pb.SwapRequest) => {
      return request.serializeBinary();
    },
    admin_pb.SwapResponse.deserializeBinary
  );

  swapProblem(
    request: admin_pb.SwapRequest,
    metadata: grpcWeb.Metadata | null): Promise<admin_pb.SwapResponse>;

  swapProblem(
    request: admin_pb.SwapRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: admin_pb.SwapResponse) => void): grpcWeb.ClientReadableStream<admin_pb.SwapResponse>;

  swapProblem(
    request: admin_pb.SwapRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: admin_pb.SwapResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/auth.Admin/SwapProblem',
        request,
        metadata || {},
        this.methodInfoSwapProblem,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/auth.Admin/SwapProblem',
    request,
    metadata || {},
    this.methodInfoSwapProblem);
  }

}

