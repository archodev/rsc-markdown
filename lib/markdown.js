'use server';
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
import * as prod from 'react/jsx-runtime';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeReact from 'rehype-react';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus/all';
import { rehype } from 'rehype';
import './markdown.css';
var production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs };
// @ts-ignore
var Markdown = function (_a) {
    var markdown = _a.markdown, options = _a.options, components = _a.components;
    return __awaiter(void 0, void 0, void 0, function () {
        var md, html, _b, hl, _c, file;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    md = (options === null || options === void 0 ? void 0 : options.trimWhiteSpace)
                        ? String(markdown).trim().replace(/^\s+/gm, '')
                        : String(markdown);
                    if (!(options === null || options === void 0 ? void 0 : options.gfm)) return [3 /*break*/, 2];
                    return [4 /*yield*/, unified()
                            .use(remarkParse)
                            .use(remarkGfm)
                            .use(remarkRehype)
                            .use(rehypeStringify)
                            .process(md)];
                case 1:
                    _b = _d.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, unified()
                        .use(remarkParse)
                        .use(remarkRehype)
                        .use(rehypeStringify)
                        .process(md)];
                case 3:
                    _b = _d.sent();
                    _d.label = 4;
                case 4:
                    html = _b;
                    if (!(options === null || options === void 0 ? void 0 : options.syntaxHighlighting)) return [3 /*break*/, 6];
                    return [4 /*yield*/, rehype().use(rehypePrism).process(String(html))];
                case 5:
                    _c = _d.sent();
                    return [3 /*break*/, 7];
                case 6:
                    _c = html;
                    _d.label = 7;
                case 7:
                    hl = _c;
                    return [4 /*yield*/, unified()
                            .use(rehypeParse, { fragment: true })
                            // @ts-ignore
                            .use(rehypeReact, __assign(__assign({}, production), { components: components }))
                            .process(String(hl))];
                case 8:
                    file = _d.sent();
                    return [2 /*return*/, file.result];
            }
        });
    });
};
export default Markdown;
