"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelManager = void 0;
const fs = __importStar(require("fs/promises"));
class ModelManager {
    constructor(filePath) {
        this.filePath = filePath;
        console.log(`ModelManager will use file path: ${filePath}`);
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let itemsTxt = yield fs.readFile(this.filePath, "utf8");
                let items = JSON.parse(itemsTxt);
                console.log(items);
                return items;
            }
            catch (err) {
                if (err.code === "ENOENT") {
                    // file does not exits
                    yield this.save([]); // create a new file with ampty array
                    return []; // return empty array
                } // // cannot handle this exception, so rethrow
                else
                    throw err;
            }
        });
    }
    // save array of items to file
    save() {
        return __awaiter(this, arguments, void 0, function* (items = []) {
            let itemsTxt = JSON.stringify(items);
            yield fs.writeFile(this.filePath, itemsTxt);
        });
    }
}
exports.ModelManager = ModelManager;
