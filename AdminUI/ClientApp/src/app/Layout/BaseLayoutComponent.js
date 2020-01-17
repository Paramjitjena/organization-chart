"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseLayoutComponent = /** @class */ (function () {
    function BaseLayoutComponent(authSvc) {
        this.authSvc = authSvc;
    }
    BaseLayoutComponent.prototype.ngOnInit = function () {
    };
    BaseLayoutComponent.prototype.ngOnDestroy = function () {
    };
    BaseLayoutComponent.prototype.logout = function () {
        this.authSvc.logout();
    };
    return BaseLayoutComponent;
}());
exports.BaseLayoutComponent = BaseLayoutComponent;
//# sourceMappingURL=BaseLayoutComponent.js.map