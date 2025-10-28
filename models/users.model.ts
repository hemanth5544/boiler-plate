import { DataTypes, Model, Sequelize } from "sequelize";

export class User extends Model {
	id!: number;
	username!: string;
	email!: string;
	password!: string;
	isActive!: boolean;
	createdAt!: Date;
	updatedAt!: Date;
}

export default function initUserModel(sequelize: Sequelize) {
	User.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: true,
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			isActive: {
				type: DataTypes.BOOLEAN,
				defaultValue: true,
			},
			createdAt: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
			updatedAt: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
			},
		},
		{
			sequelize,
			modelName: "User",
			tableName: "users",
			timestamps: true,
		}
	);

	return User;
}
