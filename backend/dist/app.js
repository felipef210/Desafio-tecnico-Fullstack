"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskRoutes_1 = __importDefault(require("./routes/taskRoutes"));
const app = (0, express_1.default)();
const cors = require('cors');
app.use(express_1.default.json());
app.use(cors());
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && 'body' in err)
        return res.status(400).json({ message: 'JSON inválido' });
});
app.use('/tasks', taskRoutes_1.default);
exports.default = app;
