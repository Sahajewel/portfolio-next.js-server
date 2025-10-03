"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const db_1 = require("../../config/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (!payload.password) {
        throw new Error("password is required");
    }
    const hashedPassword = yield bcryptjs_1.default.hash(payload.password, Number(process.env.SALT_ROUNDS));
    const userCreate = yield db_1.prisma.user.create({
        data: Object.assign(Object.assign({}, payload), { password: hashedPassword })
    });
    const { password } = userCreate, safeUser = __rest(userCreate, ["password"]);
    return safeUser;
});
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const emailOrUsername = payload["email Or Username"];
    if (!emailOrUsername || !payload.password) {
        throw new Error("Invalid or missing input. Please check your data");
    }
    const user = yield db_1.prisma.user.findFirst({
        where: {
            OR: [
                { email: emailOrUsername },
                { username: emailOrUsername }
            ]
        }
        // select: {id: true, email: true, password: true}
    });
    if (!user) {
        throw new Error("User not found");
    }
    const isMatched = yield bcryptjs_1.default.compare(payload.password, user.password);
    if (!isMatched) {
        throw new Error("Invalid Password");
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error("Jwt_secret is not defined in env");
    }
    const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";
    const tokenPayload = {
        id: user.id, role: user.role
    };
    const token = jsonwebtoken_1.default.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    const { password } = user, safeUser = __rest(user, ["password"]);
    return Object.assign(Object.assign({}, safeUser), { token });
});
const getUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const userGet = yield db_1.prisma.user.findMany();
    return userGet;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.prisma.user.findUnique({
        where: { id },
    });
    return user;
});
const updateUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield db_1.prisma.user.update({
        where: { id },
        data: payload,
    });
    return user;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield db_1.prisma.user.delete({
        where: { id },
    });
    return deletedUser;
});
exports.UserService = {
    createUser,
    getUser,
    getSingleUser,
    updateUser,
    deleteUser,
    login
};
