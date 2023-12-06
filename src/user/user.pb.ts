/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export interface Error {
  message: string;
}

export interface CredentialsRequest {
  email: string;
  password: string;
}

export interface RegisterUserResponse {
  succcess: boolean;
  error: Error | undefined;
}

export interface LoginUserResponse {
  token: string;
  error: Error | undefined;
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  register(request: CredentialsRequest): Observable<RegisterUserResponse>;

  login(request: CredentialsRequest): Observable<LoginUserResponse>;
}

export interface UserServiceController {
  register(
    request: CredentialsRequest,
  ): Promise<RegisterUserResponse> | Observable<RegisterUserResponse> | RegisterUserResponse;

  login(request: CredentialsRequest): Promise<LoginUserResponse> | Observable<LoginUserResponse> | LoginUserResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["register", "login"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
