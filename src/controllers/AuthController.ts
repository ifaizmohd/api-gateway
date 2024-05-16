import { AxiosRequestConfig, AxiosResponse } from "axios";
import express, { Request, Response } from "express";
import https from "https";
import { ApiHandler } from "../handlers/ApiHandler";
import {
  ApiResponse,
  RegisterUserResponse,
} from "../interfaces/handlers/ApiHandler";
import {
  AUTH_ROUTES_PREFIX,
  REGISTER_USER_ROUTE,
} from "../constants/AuthController.constants";

class AuthController {
  public router = express.Router();
  private static config: AxiosRequestConfig = {
    baseURL: process.env.AUTH_SERVICE_ENDPOINT + AUTH_ROUTES_PREFIX,
    timeout: 10000, // Timeout in milliseconds
    headers: {
      "Content-Type": "application/json",
      // Add any other default headers here
    },
    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  };

  constructor() {
    ApiHandler.configure(AuthController.config);
    this.initialiseRoutes();
  }

  public initialiseRoutes(): void {
    // Initialise routes here...
    this.router.get("/ping", (req: Request, res: Response) => {
      res.send("Hi from API gateway!");
    });
    this.router.post(REGISTER_USER_ROUTE, this.registerUser);
  }

  public async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password } = req.body;
      const response: ApiResponse<RegisterUserResponse> = await ApiHandler.post(
        REGISTER_USER_ROUTE,
        {
          name,
          email,
          password,
        }
      );
      res.send(response.data.message);
    } catch (error) {
      console.error(error);
      res.send("error occurred in api");
    }
  }
}

export const AuthRouter = new AuthController().router;
