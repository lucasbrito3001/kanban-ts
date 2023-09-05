import { Router } from "express";
import { UserController } from "./users.controllers";
import { UserService } from "./users.services";
import { HashService } from "@/utils/hash.services";
import { compare, hash } from "bcrypt";
import { JwtService } from "@/utils/jwt.services";
import { sign, verify } from "jsonwebtoken";
import { UserEntity, userDtoSchema } from "./users.entities";
import { DataSource } from "typeorm";
import { UserAdapter } from "./users.interfaces";

export class UserRouter {
	private router = Router();
	private hashRounds = process.env.HASH_ROUNDS ? +process.env.HASH_ROUNDS : 4;
	private jwtSecret = process.env.JWT_SECRET;
	private jwtDuration = process.env.JWT_DURATION;
	private userController: UserAdapter;

	constructor(private dataSource: DataSource) {
		const hashService = new HashService(this.hashRounds, hash, compare);
		const jwtService = new JwtService(
			"" + this.jwtSecret,
			"" + this.jwtDuration,
			sign,
			verify
		);
		const userRepository = this.dataSource.getRepository(UserEntity);

		const userService = new UserService(
			userRepository,
			hashService,
			jwtService,
			userDtoSchema
		);

		this.userController = new UserController(userService);
	}

	public getRoutes = () => {
		this.router.get("/:id", this.userController.readOne);
		this.router.post("/", this.userController.create);

		return this.router;
	};
}
