import { AxiosRequestConfig } from "axios";
import { Request, Response, Router } from "express";

export declare class Authentication {
  public router: Router;
  private static config: AxiosRequestConfig;
  public initialiseRoutes(): void;
  public registerUser(req: Request, res: Response): Promise<void>;
  public verifyEmail(req: Request, res: Response): Promise<void>;
}
