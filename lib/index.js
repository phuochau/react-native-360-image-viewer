"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var styles_1 = __importDefault(require("./styles"));
var width = react_native_1.Dimensions.get('window').width;
var Image360Viewer = /** @class */ (function (_super) {
    __extends(Image360Viewer, _super);
    function Image360Viewer(props) {
        var _this = _super.call(this, props) || this;
        _this.panResponder = react_native_1.PanResponder.create({});
        _this.startX = 0;
        _this.startRotation = 0;
        _this.currentX = 0;
        _this.createPanResponder = function () {
            _this.panResponder = react_native_1.PanResponder.create({
                onMoveShouldSetPanResponder: function () { return true; },
                onPanResponderGrant: function (_, gestureState) {
                    _this.startMoving(gestureState);
                },
                onPanResponderMove: function (_, gestureState) {
                    _this.moving(gestureState);
                },
                onPanResponderRelease: function (_, gestureState) {
                    _this.endMoving(gestureState);
                }
            });
        };
        _this.startMoving = function (gestureState) {
            _this.startX = gestureState.moveX;
            _this.startRotation = _this.state.rotation;
        };
        _this.moving = function (gestureState) {
            _this.currentX = gestureState.moveX;
            _this.updateRotation();
        };
        _this.endMoving = function (gestureState) {
            _this.currentX = gestureState.moveX;
            _this.updateRotation();
        };
        _this.updateRotation = function () {
            var _a = _this.props, rotationRatio = _a.rotationRatio, width = _a.width;
            var deltaRotation = (_this.currentX - _this.startX) * 180 / (rotationRatio * width);
            _this.setState({ rotation: _this.startRotation + deltaRotation });
        };
        _this.getImage = function () {
            var _a = _this.state, rotation = _a.rotation, rotatePeriod = _a.rotatePeriod;
            var srcset = _this.props.srcset;
            var mRotation = rotation - Math.floor(rotation / 360) * 360;
            var index = Math.floor(mRotation / rotatePeriod);
            return srcset[index];
        };
        _this.createPanResponder();
        _this.state = {
            rotation: 0,
            rotatePeriod: 360 / props.srcset.length
        };
        return _this;
    }
    Image360Viewer.prototype.render = function () {
        var _a = this.props, width = _a.width, height = _a.height, style = _a.style;
        return (react_1.default.createElement(react_native_1.View, __assign({}, this.panResponder.panHandlers, { style: style }),
            react_1.default.createElement(react_native_1.Image, { source: this.getImage(), style: [styles_1.default.image, { width: width, height: height }] })));
    };
    Image360Viewer.defaultProps = {
        width: width, // width of image
        height: 300, // height of image
        srcset: [],
        rotationRatio: 0.5, // the drag distance compares to 180 degree: width / rotationRatio = 180 degree,
    };
    return Image360Viewer;
}(react_1.Component));
exports.default = Image360Viewer;
