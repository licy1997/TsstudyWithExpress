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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var query_1 = __importDefault(require("../modules/query"));
var excel_export_1 = __importDefault(require("excel-export"));
var router = express_1.default.Router();
var queryAllSQL = "SELECT employee.*, level.level, department.department\n    FROM employee, level, department\n    WHERE\n        employee.levelId = level.id AND\n        employee.departmentId = department.id\n    ";
/**
 * @swagger
 * definitions:
 *   employee:
 *     properties:
 *       name:
 *         type: string
 *       levelId:
 *         type: string
 *       departmentId:
 *         type: string
 *       hiredate:
 *         type: string
 */
/**
 * @swagger
 * /api/employee/getEmployee:
 *   get:
 *     tags:
 *       - Puppies
 *     description: Returns all puppies
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: employsee's name
 *         in: query
 *         required: false
 *         type: string
 *       - name: departmentId
 *         description: employsee's departmentId
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: An array of puppies
 *         schema:
 *           $ref: '#/definitions/employee'
 */
router.get('/getEmployee', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, _b, name, departmentId, conditions, sql, result, e_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _a = req.query, _b = _a.name, name = _b === void 0 ? '' : _b, departmentId = _a.departmentId;
                    conditions = "AND employee.name LIKE '%" + name + "%'";
                    if (departmentId) {
                        conditions += " AND employee.departmentId=" + departmentId;
                    }
                    sql = queryAllSQL + " " + conditions + " ORDER BY employee.id DESC";
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, query_1.default(sql)];
                case 2:
                    result = _c.sent();
                    result.forEach(function (i) {
                        i.key = i.id;
                    });
                    res.json({
                        flag: 0,
                        data: result
                    });
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _c.sent();
                    res.json({
                        flag: 1,
                        msg: e_1.toString()
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
/**
 * @swagger
 * /api/employee/createEmployee:
 *   post:
 *     tags:
 *       - employee
 *     description: Creates a new employee
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: employee
 *         description: employee object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/employee'
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post('/createEmployee', function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, name, departmentId, hiredate, levelId, sql, result, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = req.body, name = _a.name, departmentId = _a.departmentId, hiredate = _a.hiredate, levelId = _a.levelId;
                    sql = "INSERT INTO employee (name, departmentId, hiredate, levelId)\n      VALUES ('" + name + "', '" + departmentId + "', '" + hiredate + "', '" + levelId + "')\n  ";
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, query_1.default(sql)];
                case 2:
                    result = _b.sent();
                    res.json({
                        flag: 0,
                        data: {
                            key: result.insertId,
                            id: result.insertId
                        }
                    });
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _b.sent();
                    res.json({
                        flag: 1,
                        msg: e_2.toString()
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
});
var conf = {
    cols: [
        { caption: '??????ID', type: 'number' },
        { caption: '??????', type: 'string' },
        { caption: '??????', type: 'string' },
        { caption: '????????????', type: 'string' },
        { caption: '??????', type: 'string' }
    ],
    rows: []
};
/**
 * @swagger
 * /api/employee/downloadEmployee:
 *   get:
 *     tags:
 *       - Puppies
 *     description: downloadEmployee
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 */
router.get('/downloadEmployee', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, excel, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, query_1.default(queryAllSQL)];
            case 1:
                result = _a.sent();
                conf.rows = result.map(function (i) {
                    return [i.id, i.name, i.department, i.hiredate, i.level];
                });
                excel = excel_export_1.default.execute(conf);
                res.setHeader('Content-Type', 'application/vnd.openxmlformats');
                res.setHeader('Content-Disposition', 'attachment;filename=Employee.xlsx');
                res.end(excel, 'binary');
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                res.send(e_3.toString());
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
