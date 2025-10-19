"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkProjectExists = checkProjectExists;
exports.getProjectPath = getProjectPath;
const fs_1 = require("fs");
const path_1 = require("path");
function checkProjectExists(projectName) {
    const projectPath = (0, path_1.join)(process.cwd(), projectName);
    return (0, fs_1.existsSync)(projectPath);
}
function getProjectPath(projectName) {
    return (0, path_1.join)(process.cwd(), projectName);
}
