import Database from "database/database";
// import userModel from "@model/users.model";
const _sequelize = Database.getInstance();

export const userRepo = {
	async getAllUsers() {
		const users = await _sequelize.models.User.findAll();
		return users;
	},

	async findById(id: number) {
		const user = await _sequelize.models.User.findByPk(id);
		return user;
	},
};
