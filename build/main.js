webpackJsonp([0],{

/***/ 108:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 108;

/***/ }),

/***/ 150:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 150;

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(195);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = /** @class */ (function () {
    function HomePage(nav, navParams, loadingCtrl, modalCtrl, menuCtrl, connect, zone, alertCtrl, cdr) {
        this.nav = nav;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.menuCtrl = menuCtrl;
        this.connect = connect;
        this.zone = zone;
        this.alertCtrl = alertCtrl;
        this.cdr = cdr;
        this.myPic = './assets/img/blankbanner.jpg';
        this.total = 0;
        this.itemcount = 0;
        this.orderTotal = 0;
        this.freightAmount = 0;
        this.freightValid = false;
        this.userPostcode = '';
        this.mytext = '';
        this.orderitems = [];
        this.mytext = '';
    }
    HomePage.prototype.recalc = function () {
        if (window.localStorage.getItem('freightValid'))
            this.freightValid = true;
        else
            this.freightValid = false;
        if (window.localStorage.getItem('userPostcode'))
            this.userPostcode = window.localStorage.getItem('userPostcode');
        else
            this.userPostcode = '';
        this.orderitems = [];
        this.total = 0;
        this.itemcount = 0;
        var c = window.localStorage.getItem('cart');
        if (!c) {
            c = '';
            window.localStorage.setItem('cart', "");
        }
        if (c.length) {
            this.menuCtrl.enable(true, 'mainmenu');
            var i = c.split('~');
            for (var e = 0; e < i.length; e++) {
                var f = i[e].split('^');
                var ths = { id: f[0], qty: f[1], pic: 'http://tella.com.au/pics/' + f[0] + '.jpg', title: f[3], price: f[2], company: f[4], personal: f[5], persdets: f[6] };
                this.orderitems.push(ths);
                this.total += parseFloat(f[1]) * parseFloat(f[2]);
                this.itemcount += parseInt(f[1]);
                this.myPic = 'http://tella.com.au/banners/' + f[4] + '.jpg?v=3';
            }
            this.orderTotal = this.total + this.freightAmount;
        }
    };
    HomePage.prototype.ionViewDidEnter = function () {
        window.localStorage.removeItem('freightValid');
        this.recalc();
        var that = this;
        var w = window.localStorage.getItem('userTag');
        if (!w)
            w = '';
    };
    HomePage.prototype.signOutAlert = function () {
        var that = this;
        var alert = this.alertCtrl.create({
            title: 'Are you sure?',
            subTitle: '',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Yes',
                    role: 'cancel',
                    handler: function () {
                        that.doLogout();
                    }
                }
            ]
        });
        alert.present();
    };
    HomePage.prototype.doLogout = function () {
        window.localStorage.removeItem('userTag');
        window.localStorage.removeItem('cart');
    };
    HomePage.prototype.loadText = function () {
        this.checkCode('*' + this.mytext);
    };
    HomePage.prototype.checkCode = function (s) {
        var _this = this;
        var that = this;
        var loader = this.loadingCtrl.create({
            content: "Searching..."
        });
        loader.present();
        var w = window.localStorage.getItem('userTag');
        if (!w)
            w = '';
        var url = 'getitems.php?code=' + s + '&cart=' + window.localStorage.getItem('cart') + '&id=' + w;
        // console.log(url);
        this.connect.getList(url).subscribe(function (data) {
            loader.dismiss();
            that.mytext = '';
            that.zone.run(function () {
            });
        }, function (err) {
            loader.dismiss();
            that.mytext = '';
            _this.connect.logError(err);
        });
    };
    HomePage.prototype.removeProduct = function (id) {
        var c = window.localStorage.getItem('cart');
        var i = c.split('~');
        var nw = [];
        for (var e = 0; e < i.length; e++) {
            var a = i[e].split('^');
            if (a[0] != id)
                nw.push(i[e]);
        }
        window.localStorage.setItem('cart', nw.join('~'));
        window.localStorage.removeItem('freightValid');
        this.recalc();
    };
    HomePage.prototype.addProduct = function (id) {
        var c = window.localStorage.getItem('cart');
        var i = c.split('~');
        var nw = [];
        for (var e = 0; e < i.length; e++) {
            var a = i[e].split('^');
            if (a[0] != id)
                nw.push(i[e]);
            else {
                var q = parseInt(a[1]) + 1;
                a[1] = q.toString();
                nw.push(a.join('^'));
            }
        }
        window.localStorage.setItem('cart', nw.join('~'));
        window.localStorage.removeItem('freightValid');
        this.recalc();
    };
    HomePage.prototype.subProduct = function (id) {
        var c = window.localStorage.getItem('cart');
        var i = c.split('~');
        var nw = [];
        for (var e = 0; e < i.length; e++) {
            var a = i[e].split('^');
            if (a[0] == id) {
                var q = parseInt(a[1]) - 1;
                if (q > 0)
                    a[1] = q.toString();
            }
            nw.push(a.join('^'));
        }
        window.localStorage.setItem('cart', nw.join('~'));
        window.localStorage.removeItem('freightValid');
        this.recalc();
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/var/www/html/ionic/thai/src/pages/home/home.html"*/'<ion-header no-border no-shadow>\n	<ion-navbar align-title="center" class="backgroundTransparent">\n		<button ion-button menuToggle color="dark"><ion-icon name="menu"></ion-icon></button>\n		<ion-title>THAI ORCHID</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-menu id="mainmenu" [content]="myMenum" style="overflow:hidden" [persistent]=true >\n	<ion-content class="menucontainer">\n		<ion-item-group class="paddingMenu">\n			<button ion-item (click)="doScan()" class="list-item menuitems" menuClose>\n			   Order History\n			</button>\n			<button ion-item (click)="showAccount()" class="list-item menuitems" menuClose>\n			   Specials\n			</button>\n			<button ion-item (click)="orderHistory()" class="list-item menuitems" menuClose>\n			   My Profile\n			</button>\n			<button ion-item (click)="tandc()" class="list-item menuitems" menuClose>\n			   Terms & Conditions\n			</button>\n			<button ion-item (click)="concern()" class="list-item menuitems" menuClose>\n			   Feedback\n			</button>\n	\n			<button ion-item (click)="signOutAlert()" class="list-item menuitems" menuClose>\n			   Sign Out\n			</button>\n			\n		</ion-item-group>\n	</ion-content>\n</ion-menu>\n\n<ion-content #myMenum text-center>\n<div *ngIf="!orderitems.length">\n\n<ion-grid>\n <ion-row text-center>\n  <ion-col col-3>\n  </ion-col>\n  <ion-col col-6>\n    <img src="./assets/img/background.jpg" style="width:100%">\n  </ion-col>\n  <ion-col col-3>\n  </ion-col>\n </ion-row>\n</ion-grid>\n\n<ion-grid>\n<ion-row>\n<ion-col col-1>\n</ion-col>\n<ion-col col-10>\n<ion-item no-lines text-wrap text-center>\n<p>Welcome to Thai Orchid.  Our app allows you to order easily and receive special offers from us.</p>\n</ion-item>\n</ion-col>\n<ion-col col-1>\n</ion-col>\n</ion-row>\n<ion-row text-center style="margin-top:10px">\n<ion-col col-1>\n</ion-col>\n				<ion-col text-center col-10>\n					<button ion-button icon-left block color="primary"  (click)="doScan();">|| | || &nbsp; &nbsp; SCAN BARCODE &nbsp; &nbsp; || | ||</button>\n				</ion-col>\n<ion-col col-1>\n</ion-col>\n			</ion-row>\n<ion-row>\n<ion-col col-1>\n</ion-col>\n<ion-col col-8>\n<ion-input type="text" [(ngModel)]="mytext" style="margin-top:5px; border:1px solid #333333 !important" placeholder=" Or Enter Code"></ion-input>\n</ion-col>\n<ion-col col-2>\n<button ion-button block color="dark" icon-only (click)="loadText()"><ion-icon name="search"></ion-icon></button>\n</ion-col>\n<ion-col col-1>\n</ion-col>\n</ion-row>\n\n</ion-grid>\n\n</div>\n<div *ngIf="orderitems.length">\n\n<img [src]="myPic" style="width:100%">\n<ion-grid>\n<ion-row text-center style="margin-top:10px">\n<ion-col col-1>\n</ion-col>\n				<ion-col text-center col-10>\n					<button ion-button block color="primary"  (click)="doScan()">Scan Another Item</button>\n				</ion-col>\n<ion-col col-1>\n</ion-col>\n			</ion-row>\n<ion-row>\n<ion-col col-1>\n</ion-col>\n<ion-col col-8>\n<ion-input type="text" [(ngModel)]="mytext" style="margin-top:5px; border:1px solid #333333 !important" placeholder=" Or Enter Code"></ion-input>\n</ion-col>\n<ion-col col-2>\n<button ion-button block color="dark" icon-only (click)="loadText()"><ion-icon name="search"></ion-icon></button>\n</ion-col>\n<ion-col col-1>\n</ion-col>\n</ion-row>\n\n</ion-grid>\n\n<ion-grid>\n<ion-row>\n<ion-col col-1>\n</ion-col>\n<ion-col col-10>\n  <ion-grid>\n  <ion-row class="myborder" no-padding>\n  <ion-col col-12 no-padding>\n  <ion-item-divider text-center no-padding style="font-weight:bold">Your Cart Summary</ion-item-divider>\n  </ion-col>\n  </ion-row>\n  <ion-row class="myborder">\n  <ion-col col-8 text-left>\n  {{ itemcount }} item(s)\n  </ion-col>\n  <ion-col col-4 text-right>\n  ${{ total | number:\'1.2-2\' }}\n  </ion-col>\n  </ion-row>\n  <ion-row *ngIf="freightValid" class="myborder">\n   <ion-col col-8 (click)="calcShip()" text-left>\n     Ship To {{ userPostcode }} <div class="calcship">(Change)</div>\n  </ion-col>\n  <ion-col col-4 text-right>\n     ${{ freightAmount | number:\'1.2-2\' }}\n  </ion-col>\n  </ion-row>\n  <ion-row *ngIf="freightValid" class="myborder">\n  <ion-col col-8 text-left>\n    TOTAL\n  </ion-col>\n  <ion-col col-4 text-right>\n    ${{ orderTotal | number:\'1.2-2\' }}\n  </ion-col>\n </ion-row>\n <ion-row *ngIf="!freightValid" clss="myBorder">\n <ion-col col-12 text-center><ion-item text-center no-lines (click)="calcShip()" class="calcship">Calculate Shipping</ion-item></ion-col>\n </ion-row>\n </ion-grid>\n</ion-col>\n<ion-col col-1>\n</ion-col>\n</ion-row>\n\n\n</ion-grid>\n		<ion-list no-lines text-wrap >\n			<ion-item *ngFor="let et of orderitems"  class="borderBottomGainsboroAlpha">\n<ion-grid>\n <ion-row>\n  <ion-col col-4 (click)="goProd(et)"><img [src]="et.pic" style="border:1px solid gainsboro"></ion-col>\n  <ion-col col-8><p class="cartitem" (click)="goProd(et)">{{ et.title }}</p>\n    <p class="cartitem price">${{ et.price }}</p>\n\n   <ion-grid>\n      <ion-row>\n        <ion-col col-10>\n           <p class="cartitem"><span class="updown" (click)="subProduct(et.id);">-</span><span class="updown"> {{ et.qty }} </span><span class="updown" (click)="addProduct(et.id);">+</span></p>\n        </ion-col>\n        <ion-col col-2 text-right>\n           <ion-icon name="close-circle" style="color:gray" (click)="removeProduct(et.id);"></ion-icon>\n        </ion-col>\n      </ion-row>\n   </ion-grid>\n  \n\n  </ion-col>\n </ion-row>\n</ion-grid>\n			</ion-item>\n		</ion-list>\n\n</div>\n</ion-content>\n\n<ion-footer>\n<ion-grid no-padding>\n<ion-row text-center>\n <ion-col col-4 (click)="membership()">\n <ion-icon name="map-outline"> </ion-icon>\n </ion-col>\n <ion-col col-4 (click)="teams()">\n <ion-icon name="list"> </ion-icon>\n </ion-col>\n\n <ion-col col-4 (click)="goEvents()" >\n <ion-icon name="settings"> </ion-icon>\n </ion-col>\n\n</ion-row>\n<ion-row text-center style="min-height:30px !important">\n\n <ion-col col-4 (click)="membership()">\n Menu\n </ion-col>\n\n <ion-col col-4 (click)="teams()">\n My Order\n </ion-col>\n\n <ion-col col-4 (click)="goEvents()" >\n Settings\n </ion-col>\n</ion-row>\n\n</ion-grid>\n</ion-footer>\n'/*ion-inline-end:"/var/www/html/ionic/thai/src/pages/home/home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Connect; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var Connect = /** @class */ (function () {
    function Connect(http) {
        this.http = http;
        this.server_url = 'http://tella.com.au/server/';
        this.server2 = 'http://tella.com.au/server/';
    }
    Connect.prototype.PostQuery = function (object, parameter) {
        return this.http.get(this.server_url + object + parameter).map(function (res) { return res.json(); });
    };
    Connect.prototype.getList = function (object) {
        return this.http.get(this.server_url + object).map(function (res) { return res.json(); });
    };
    Connect.prototype.getList2 = function (object) {
        return this.http.get(this.server2 + object).map(function (res) { return res.json(); });
    };
    Connect.prototype.logError = function (err) {
        console.error('Error: ' + err);
    };
    Connect.prototype.getServerUrl = function () {
        return this.server_url;
    };
    Connect = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Http */]])
    ], Connect);
    return Connect;
}());

//# sourceMappingURL=connect.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(220);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(269);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_connect__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_http__ = __webpack_require__(196);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_8__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: []
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_7__providers_connect__["a" /* Connect */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/var/www/html/ionic/thai/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/var/www/html/ionic/thai/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ })

},[197]);
//# sourceMappingURL=main.js.map