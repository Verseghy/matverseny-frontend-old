/**
 * @fileoverview gRPC-Web generated client stub for auth
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as auth_pb from './auth_pb';


export class AuthClient {
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

  methodInfoLogin = new grpcWeb.AbstractClientBase.MethodInfo(
    auth_pb.LoginResponse,
    (request: auth_pb.LoginRequest) => {
      return request.serializeBinary();
    },
    auth_pb.LoginResponse.deserializeBinary
  );

  login(
    request: auth_pb.LoginRequest,
    metadata: grpcWeb.Metadata | null): Promise<auth_pb.LoginResponse>;

  login(
    request: auth_pb.LoginRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: auth_pb.LoginResponse) => void): grpcWeb.ClientReadableStream<auth_pb.LoginResponse>;

  login(
    request: auth_pb.LoginRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: auth_pb.LoginResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/auth.Auth/Login',
        request,
        metadata || {},
        this.methodInfoLogin,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/auth.Auth/Login',
    request,
    metadata || {},
    this.methodInfoLogin);
  }

  methodInfoRegister = new grpcWeb.AbstractClientBase.MethodInfo(
    auth_pb.RegisterResponse,
    (request: auth_pb.RegisterRequest) => {
      return request.serializeBinary();
    },
    auth_pb.RegisterResponse.deserializeBinary
  );

  register(
    request: auth_pb.RegisterRequest,
    metadata: grpcWeb.Metadata | null): Promise<auth_pb.RegisterResponse>;

  register(
    request: auth_pb.RegisterRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: auth_pb.RegisterResponse) => void): grpcWeb.ClientReadableStream<auth_pb.RegisterResponse>;

  register(
    request: auth_pb.RegisterRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: auth_pb.RegisterResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/auth.Auth/Register',
        request,
        metadata || {},
        this.methodInfoRegister,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/auth.Auth/Register',
    request,
    metadata || {},
    this.methodInfoRegister);
  }

  methodInfoForgotPassword = new grpcWeb.AbstractClientBase.MethodInfo(
    auth_pb.ForgotPasswordResponse,
    (request: auth_pb.ForgotPasswordRequest) => {
      return request.serializeBinary();
    },
    auth_pb.ForgotPasswordResponse.deserializeBinary
  );

  forgotPassword(
    request: auth_pb.ForgotPasswordRequest,
    metadata: grpcWeb.Metadata | null): Promise<auth_pb.ForgotPasswordResponse>;

  forgotPassword(
    request: auth_pb.ForgotPasswordRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: auth_pb.ForgotPasswordResponse) => void): grpcWeb.ClientReadableStream<auth_pb.ForgotPasswordResponse>;

  forgotPassword(
    request: auth_pb.ForgotPasswordRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: auth_pb.ForgotPasswordResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/auth.Auth/ForgotPassword',
        request,
        metadata || {},
        this.methodInfoForgotPassword,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/auth.Auth/ForgotPassword',
    request,
    metadata || {},
    this.methodInfoForgotPassword);
  }

  methodInfoRefreshToken = new grpcWeb.AbstractClientBase.MethodInfo(
    auth_pb.RefreshTokenResponse,
    (request: auth_pb.RefreshTokenRequest) => {
      return request.serializeBinary();
    },
    auth_pb.RefreshTokenResponse.deserializeBinary
  );

  refreshToken(
    request: auth_pb.RefreshTokenRequest,
    metadata: grpcWeb.Metadata | null): Promise<auth_pb.RefreshTokenResponse>;

  refreshToken(
    request: auth_pb.RefreshTokenRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: auth_pb.RefreshTokenResponse) => void): grpcWeb.ClientReadableStream<auth_pb.RefreshTokenResponse>;

  refreshToken(
    request: auth_pb.RefreshTokenRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.Error,
               response: auth_pb.RefreshTokenResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/auth.Auth/RefreshToken',
        request,
        metadata || {},
        this.methodInfoRefreshToken,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/auth.Auth/RefreshToken',
    request,
    metadata || {},
    this.methodInfoRefreshToken);
  }

}

