/**
 * @fileoverview gRPC-Web generated client stub for superadmin
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as superadmin_pb from './superadmin_pb';


export class SuperAdminClient {
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

  methodInfoSetTime = new grpcWeb.AbstractClientBase.MethodInfo(
    superadmin_pb.SetTimeResponse,
    (request: superadmin_pb.SetTimeRequest) => {
      return request.serializeBinary();
    },
    superadmin_pb.SetTimeResponse.deserializeBinary
  );

  setTime(
    request: superadmin_pb.SetTimeRequest,
    metadata: grpcWeb.Metadata | null): Promise<superadmin_pb.SetTimeResponse>;

  setTime(
    request: superadmin_pb.SetTimeRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: superadmin_pb.SetTimeResponse) => void): grpcWeb.ClientReadableStream<superadmin_pb.SetTimeResponse>;

  setTime(
    request: superadmin_pb.SetTimeRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: superadmin_pb.SetTimeResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/superadmin.SuperAdmin/SetTime',
        request,
        metadata || {},
        this.methodInfoSetTime,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/superadmin.SuperAdmin/SetTime',
    request,
    metadata || {},
    this.methodInfoSetTime);
  }

  methodInfoGetTime = new grpcWeb.AbstractClientBase.MethodInfo(
    superadmin_pb.GetTimeResponse,
    (request: superadmin_pb.GetTimeRequest) => {
      return request.serializeBinary();
    },
    superadmin_pb.GetTimeResponse.deserializeBinary
  );

  getTime(
    request: superadmin_pb.GetTimeRequest,
    metadata: grpcWeb.Metadata | null): Promise<superadmin_pb.GetTimeResponse>;

  getTime(
    request: superadmin_pb.GetTimeRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: superadmin_pb.GetTimeResponse) => void): grpcWeb.ClientReadableStream<superadmin_pb.GetTimeResponse>;

  getTime(
    request: superadmin_pb.GetTimeRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: superadmin_pb.GetTimeResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/superadmin.SuperAdmin/GetTime',
        request,
        metadata || {},
        this.methodInfoGetTime,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/superadmin.SuperAdmin/GetTime',
    request,
    metadata || {},
    this.methodInfoGetTime);
  }

  methodInfoGetResults = new grpcWeb.AbstractClientBase.MethodInfo(
    superadmin_pb.GetResultsResponse,
    (request: superadmin_pb.GetResultsRequest) => {
      return request.serializeBinary();
    },
    superadmin_pb.GetResultsResponse.deserializeBinary
  );

  getResults(
    request: superadmin_pb.GetResultsRequest,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/superadmin.SuperAdmin/GetResults',
      request,
      metadata || {},
      this.methodInfoGetResults);
  }

}

