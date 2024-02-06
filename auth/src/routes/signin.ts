import express, { Request, Response } from "express";
import { body } from "express-validator";
import { validateRequest, BadRequetError } from "@uoticketsdev/common";
import { User } from "../models/user";
import { Password } from "../services/password";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid."),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password."),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequetError("Invalid credentials.");
    }

    const passwordsMatched = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatched) {
      throw new BadRequetError("Invalid credentials.");
    }

    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.send(200).send(existingUser);
  }
);

export { router as signinRouter };
