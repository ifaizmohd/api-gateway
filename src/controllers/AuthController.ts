import { AxiosRequestConfig } from "axios";
import { Request, Response, Router } from "express";
import https from "https";
import { ApiHandler } from "../handlers/ApiHandler";
import {
  ApiResponse,
  RegisterUserResponse,
} from "../interfaces/handlers/ApiHandler";
import {
  AUTH_ROUTES_PREFIX,
  REGISTER_USER_ROUTE,
  VERIFY_TOKEN_ROUTER,
} from "../constants/AuthController.constants";
import { Authentication } from "../interfaces/controllers/AuthController";

class AuthController implements Authentication {
  public router: Router = Router();
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

  public async verifyEmail(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.params;
      const response: ApiResponse<any> = await ApiHandler.get(
        `${VERIFY_TOKEN_ROUTER}/${token}`
      );
      console.log(response);
    } catch (error) {
      console.error(error);
      res.send("error occurred in api");
    }
  }
}

export const AuthRouter = new AuthController().router;
