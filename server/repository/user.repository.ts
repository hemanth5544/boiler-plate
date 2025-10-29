import Database from "database/database";
import { User } from "@model/users.model";

const _sequelize = Database.getInstance();

export class UserRepo {
	static async getAllUsers() {

		const res= await User.findAll();

		return res;
	}

	static async findById(id: number) {
		return await User.findByPk(id);
	}

	static async createUser(data: {
		username: string;
		email: string;
		password: string;
	}) {
		return await User.create(data);
	}

	static async updateUser(
		id: number,
		updates: Partial<{
			username: string;
			email: string;
			password: string;
			isActive: boolean;
		}>,
	) {
		const user = await User.findByPk(id);
		if (!user) return null;
		await user.update(updates);
		return user;
	}

	static async deleteUser(id: number) {
		const user = await User.findByPk(id);
		if (!user) return null;
		await user.destroy();
		return true;
	}
}
