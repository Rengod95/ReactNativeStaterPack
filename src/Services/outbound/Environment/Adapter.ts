import * as process from "process";

type ENVS = "development" | "development.local" | "production";
export class EnvironmentService {
  private env = process.env;

  public getApplicationEnvironment(): ENVS {
    return this.env as unknown as ENVS;
  }
}
