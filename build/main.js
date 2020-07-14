webpackJsonp([4],{

/***/ 101:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckoutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__enter_credit_card_enter_credit_card__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_connect__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CheckoutPage = /** @class */ (function () {
    function CheckoutPage(navCtrl, cdr, alertCtrl, navParams, loadingCtrl, connect, zone) {
        this.navCtrl = navCtrl;
        this.cdr = cdr;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.connect = connect;
        this.zone = zone;
        this.user = '';
        this.address = '';
        this.username = '';
        this.shipping = '';
        this.payment = '';
        this.paycard = '';
        this.pmode = 1;
        this.stripe_pub = '';
        this.total = 0.00;
        this.allok = false;
        this.methods = [];
        this.total = this.navParams.get('total');
        if (this.total < 0.01)
            this.allok = true;
    }
    CheckoutPage.prototype.ionViewDidEnter = function () {
        this.recalc();
    };
    CheckoutPage.prototype.showPayment = function (a) {
        window.localStorage.setItem('userPayment', a);
        this.pmode = 0;
        this.recalc();
    };
    CheckoutPage.prototype.showEnterPayment = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__enter_credit_card_enter_credit_card__["a" /* EnterCreditCardPage */], { stripe_pub: this.stripe_pub });
    };
    CheckoutPage.prototype.recalc = function () {
        var _this = this;
        var that = this;
        this.payment = window.localStorage.getItem('userPayment');
        if (!this.payment)
            this.payment = '';
        this.connect.getYum('getuserdetails.php?me=' + window.localStorage.getItem('userTag') + '&pmode=' + this.pmode + '&payment=' + this.payment).subscribe(function (data) {
            that.zone.run(function () {
                that.methods = data.methods;
                that.paycard = data.paycard;
                that.pmethods = data.pmethods;
                that.stripe_pub = data.stripe_pub;
                that.payment = data.payment;
                if ((that.payment.length) || (that.total < 0.01))
                    that.allok = true;
                else
                    that.allok = false;
                window.localStorage.setItem('userPayment', that.payment);
                that.cdr.markForCheck();
            });
        }, function (err) {
            _this.connect.logError(err);
        });
    };
    CheckoutPage.prototype.myAlert = function (msg) {
        var that = this;
        var alert = this.alertCtrl.create({
            title: 'Thank you',
            subTitle: msg,
            buttons: [
                {
                    text: 'Okay',
                    role: 'cancel',
                    handler: function () {
                    }
                }
            ]
        });
        alert.present();
    };
    CheckoutPage.prototype.doConfirm = function () {
        var _this = this;
        var that = this;
        var loader = this.loadingCtrl.create({
            content: "Please wait..."
        });
        loader.present();
        var url = 'saveorder.php?user=' + window.localStorage.getItem('userTag') + '^' + this.address + '^' + this.payment + '&cart=' + window.localStorage.getItem('cart') + '&spec=' + window.localStorage.getItem('spectext');
        console.log(url);
        this.connect.getList(url).subscribe(function (data) {
            loader.dismiss();
            if (data.success)
                _this.orderComplete();
            else
                _this.myAlert('Your order could not be completed.  Please try again later');
        }, function (err) {
            loader.dismiss();
            _this.connect.logError(err);
        });
    };
    CheckoutPage.prototype.orderComplete = function () {
        var that = this;
        var alert = this.alertCtrl.create({
            title: 'Thank you',
            subTitle: 'Your order has been received',
            buttons: [
                {
                    text: 'Okay',
                    role: 'cancel',
                    handler: function () {
                        window.localStorage.removeItem('cart');
                        window.localStorage.removeItem('spectext');
                        that.navCtrl.pop();
                    }
                }
            ]
        });
        alert.present();
    };
    CheckoutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-checkout',template:/*ion-inline-start:"/var/www/html/ionic/thai/src/pages/checkout/checkout.html"*/'<ion-header no-border no-shadow>\n	<ion-navbar align-title="center" class="backgroundTransparent">\n		<ion-title>THAI ORCHID</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content no-padding>\n <ion-item padding text-wrap no-lines>\n  <ion-row>\n   <ion-col col-sm-6>TOTAL</ion-col>\n   <ion-col col-sm-6 text-right>${{ total }}</ion-col>\n  </ion-row>\n </ion-item>\n <ion-item>\n  <ion-label>Notes</ion-label>\n  <ion-textarea rows="3" placeholder="Enter any notes here..." [(ngModel)]="notes"></ion-textarea>\n </ion-item>\n <div *ngIf="payment.length"  style="border-top:1px solid gainsboro; padding-bottom:40px">\n  <div>Payment Method :-</div>\n   <p class="userdetails" [innerHTML]="paycard"> </p>\n   <ion-item text-right no-lines>\n    <button ion-button small outline (click)="showPayment(\'\')">Change</button>\n   </ion-item> \n  </div>\n  <div *ngIf="!payment.length"  style="border-top:1px solid gainsboro"> \n   <div>Choose Payment Method :-</div>\n    <ion-list class="noBottomMargin">\n     <ion-item class="height80 borderBottom" no-lines  *ngFor="let m of pmethods">\n      <div (click)="showPayment(m.id);">\n       <ion-row>\n        <ion-col col-1>\n        </ion-col>\n        <ion-col col-11>\n         <div>\n  	  {{ m.typ }} ending in **** {{ m.last4 }}\n         </div>\n        </ion-col>\n       </ion-row>\n      </div>\n     </ion-item>\n    </ion-list>\n    <button ion-item (click)="showEnterPayment()" class="height80 borderBottom" no-lines>\n		Add Payment Method\n    </button>\n </div>\n</ion-content>\n<ion-footer *ngIf="allok">\n<button ion-button full (click)="doConfirm()" color="secondary" style="font-weight:bold!important">CONFIRM</button>\n</ion-footer>\n'/*ion-inline-end:"/var/www/html/ionic/thai/src/pages/checkout/checkout.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__providers_connect__["a" /* Connect */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__providers_connect__["a" /* Connect */]) === "function" && _f || Object, typeof (_g = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */]) === "function" && _g || Object])
    ], CheckoutPage);
    return CheckoutPage;
    var _a, _b, _c, _d, _e, _f, _g;
}());

//# sourceMappingURL=checkout.js.map

/***/ }),

/***/ 102:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EnterCreditCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_stripe__ = __webpack_require__(157);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



 //https://ionicframework.com/docs/native/stripe/
var EnterCreditCardPage = /** @class */ (function () {
    function EnterCreditCardPage(navCtrl, navParams, view, connect, zone, stripe, cdr, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.view = view;
        this.connect = connect;
        this.zone = zone;
        this.stripe = stripe;
        this.cdr = cdr;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.cardNumber = "";
        this.cardExpiryMon = "";
        this.cardExpiryYr = "";
        this.cardCvc = "";
        this.errMessage = "";
        this.makeDefault = false;
        this.donealready = false;
        this.stripe_pub = '';
        this.stripe_pub = this.navParams.get('stripe_pub');
        this.stripe.setPublishableKey(this.stripe_pub);
    }
    EnterCreditCardPage.prototype.getToken = function () {
        var _this = this;
        if (!this.donealready) {
            this.donealready = true;
            var loader_1 = this.loadingCtrl.create({
                content: "Please wait..."
            });
            loader_1.present();
            if (this.cardExpiryMon.length < 2)
                this.cardExpiryMon = '0' + this.cardExpiryMon;
            var card = {
                number: this.cardNumber,
                expMonth: this.cardExpiryMon.substr(0, 2),
                expYear: 20 + this.cardExpiryYr.substr(0, 2),
                cvc: this.cardCvc
            };
            var def;
            if (this.makeDefault) {
                def = 1;
            }
            else {
                def = 0;
            }
            var that_1 = this;
            this.stripe.createCardToken(card)
                .then(function (token) {
                _this.connect.getYum('newcc.php?tag=' + window.localStorage.getItem('userTag') + '&token=' + JSON.stringify(token) + '&dflt=' + def).subscribe(function (data) {
                    that_1.zone.run(function () {
                        setTimeout(function () {
                            loader_1.dismiss();
                            that_1.view.dismiss();
                        }, 200);
                        that_1.cdr.markForCheck();
                    });
                }, function (err) {
                    _this.connect.logError(err);
                    that_1.zone.run(function () {
                        setTimeout(function () {
                            loader_1.dismiss();
                            that_1.view.dismiss();
                        }, 200);
                        that_1.cdr.markForCheck();
                    });
                });
            })
                .catch(function (error) {
                loader_1.dismiss();
                that_1.errMessage = error;
                that_1.donealready = false;
            });
        }
    };
    EnterCreditCardPage.prototype.ionViewDidLoad = function () {
    };
    EnterCreditCardPage.prototype.closeme = function () {
        this.view.dismiss();
    };
    EnterCreditCardPage.prototype.showAlert = function (msg) {
        var that = this;
        var alert = this.alertCtrl.create({
            title: 'error',
            subTitle: msg,
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
                    }
                }
            ]
        });
        alert.present();
    };
    EnterCreditCardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-enter-credit-card',template:/*ion-inline-start:"/var/www/html/ionic/thai/src/pages/enter-credit-card/enter-credit-card.html"*/'<ion-header>\n  <ion-navbar color="blue">\n    <ion-title text-center>Payment Method</ion-title>\n  </ion-navbar>\n</ion-header>\n\n  <ion-content padding class="backgroundGrey">\n    <div class="height20"></div>\n    <ion-card color="light" class="maxWidth480">\n      <ion-card-header class="menuBackGroundTwo" padding-bottom>\n        <ion-fab top center>\n          <ion-icon ion-fab ios="ios-card" md="md-card" style="font-size:30px; background-color:#818e9b; border-radius: 5rem; border: 2px solid #e0e0e0;"></ion-icon>\n        </ion-fab>\n        <ion-card-title text-center style="padding-top:30px">\n            <h3 class="textWhite">Credit or Debit Card</h3>\n        </ion-card-title>\n      </ion-card-header>\n      <ion-card-content no-padding>\n        <ion-grid padding-top>\n          <ion-row>\n            <ion-col>\n              <ion-item style="border-radius:8px; border: 0.4px solid #eaeaea">\n                <ion-label stacked>Card</ion-label>\n                <ion-input type="tel" [(ngModel)]="cardNumber" maxlength="16" clearInput="false" required></ion-input>\n              </ion-item>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col>\n              <ion-item style="border-radius:8px; border: 0.4px solid #eaeaea">\n                <ion-label stacked>Expiry Month</ion-label>\n                <ion-input type="tel" [(ngModel)]="cardExpiryMon"  maxlength="2"  clearInput="false" required></ion-input> \n              </ion-item>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col>\n              <ion-item style="border-radius:8px; border: 0.4px solid #eaeaea">\n                <ion-label stacked>Expiry Year</ion-label>\n                <ion-input type="tel" [(ngModel)]="cardExpiryYr"  maxlength="2"  clearInput="false" required></ion-input>  \n              </ion-item>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col>\n              <ion-item style="border-radius:8px; border: 0.4px solid #eaeaea">\n                <ion-label stacked>CVC</ion-label>\n                <ion-input type="tel" [(ngModel)]="cardCvc" maxlength="4" clearInput="false" required></ion-input>\n              </ion-item>\n            </ion-col>\n          </ion-row>\n          <ion-row>\n            <ion-col padding class="error" text-wrap *ngIf="errMessage.length">\n              <p>{{ errMessage }}</p>\n            </ion-col>\n          </ion-row>\n  \n        </ion-grid>\n      </ion-card-content>\n    </ion-card>\n</ion-content>\n<ion-footer>\n              <button ion-button full (click)="getToken()" color="secondary">Submit</button>\n</ion-footer>\n  '/*ion-inline-end:"/var/www/html/ionic/thai/src/pages/enter-credit-card/enter-credit-card.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_stripe__["a" /* Stripe */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], EnterCreditCardPage);
    return EnterCreditCardPage;
}());

//# sourceMappingURL=enter-credit-card.js.map

/***/ }),

/***/ 103:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OneitemPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the OneitemPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var OneitemPage = /** @class */ (function () {
    function OneitemPage(navCtrl, navParams, view, connect, zone, cdr) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.view = view;
        this.connect = connect;
        this.zone = zone;
        this.cdr = cdr;
        this.myPic = './assets/img/blank.jpg';
        this.sel1 = './assets/imgs/sel1.png';
        this.sel0 = './assets/imgs/sel0.png';
        this.chk1 = './assets/imgs/chk1.png';
        this.chk0 = './assets/imgs/chk0.png';
        this.item = 0;
        this.title = '';
        this.price = '';
        this.totalprice = 0.00;
        this.description = '';
        this.buttonmode = 'Select';
        this.qty = 1;
        this.notes = '';
        this.item = this.navParams.get('item');
        this.buttonmode = this.navParams.get('buttonmode');
        this.description = 'Loading ...';
        this.choices = [];
        this.totalprice = 0.00;
        this.qty = 1;
        this.notes = '';
    }
    OneitemPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var that = this;
        this.connect.getList('itemdetails.php?id=' + this.item).subscribe(function (data) {
            that.zone.run(function () {
                that.description = data.description;
                that.price = data.price;
                that.title = data.name;
                that.myPic = data.pic;
                that.choices = data.choices;
                that.qty = 1;
                that.recalc();
                that.cdr.markForCheck();
            });
        }, function (err) { return _this.connect.logError(err); });
    };
    OneitemPage.prototype.setsel = function (c, a) {
        var j = this.choices[c];
        var sz = j.answers.length;
        for (var e = 0; e < sz; e++)
            this.choices[c].answers[e].chosen = (e == a ? true : false);
        this.recalc();
    };
    OneitemPage.prototype.recalc = function () {
        var p = parseFloat(this.price);
        var szc = this.choices.length;
        for (var e = 0; e < szc; e++) {
            var th = this.choices[e];
            var sza = th.answers.length;
            for (var i = 0; i < sza; i++)
                if (th.answers[i].chosen)
                    if (th.answers[i].extr.length) {
                        var ll = th.answers[i].extr;
                        p = p + parseFloat(ll.substr(3, ll.length - 4));
                    }
        }
        p *= this.qty;
        this.totalprice = p.toFixed(2);
    };
    OneitemPage.prototype.addqty = function (m) {
        this.qty += m;
        if (this.qty < 0)
            this.qty = 0;
        this.recalc();
    };
    OneitemPage.prototype.closeme = function () {
        this.view.dismiss();
    };
    OneitemPage.prototype.addProduct = function () {
        var c = window.localStorage.getItem('cart');
        if (!c)
            c = '';
        var chs = [];
        var szc = this.choices.length;
        for (var e = 0; e < szc; e++) {
            var ths = this.choices[e];
            var sza = ths.answers.length;
            for (var i = 0; i < sza; i++)
                if (ths.answers[i].chosen)
                    chs.push(ths.answers[i].id);
        }
        var nw = this.item.toString() + '^' + this.qty + '^' + this.totalprice + '^' + this.notes + '^' + JSON.stringify(chs);
        console.log(nw);
        if (c.length)
            c = c + '~' + nw;
        else
            c = nw;
        window.localStorage.setItem('cart', c);
        this.closeme();
    };
    OneitemPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-oneitem',template:/*ion-inline-start:"/var/www/html/ionic/thai/src/pages/oneitem/oneitem.html"*/'<ion-header no-border no-shadow>\n	<ion-navbar align-title="center" class="backgroundTransparent">\n		<ion-title>THAI ORCHID</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-content no-padding>\n<img [src]="myPic" style = "width:100%">\n<ion-item padding text-wrap no-lines>\n<div style="font-weight:bold">{{ title }}</div>\n<p [innerHTML]="description"></p>\n</ion-item>\n<ion-list no-lines no-padding>\n <ion-item *ngFor="let c of choices; let ic = index">\n  <ion-grid no-padding>\n   <ion-row style="background-color:#32DB64" no-padding>\n    <ion-col col-12 style="padding:5px; color:white">\n     {{ c.title }}\n    </ion-col>\n   </ion-row>\n   <ion-row *ngIf="c.typ==1" no-padding>\n    <ion-col col-12>\n     <ion-list lines no-padding>\n      <ion-item *ngFor="let a of c.answers; let ia1 = index">\n       <ion-grid>\n        <ion-row  (click)="setsel(ic, ia1)">\n         <ion-col col-1>\n          <img [src]="(a.chosen ? sel1 : sel0)">\n          </ion-col>\n         <ion-col col-11 text-wrap>\n	  <p>{{ a.name}} {{a.extr}}</p>\n         </ion-col>\n        </ion-row>\n       </ion-grid>\n      </ion-item>\n     </ion-list> \n    </ion-col>\n    </ion-row>\n   <ion-row *ngIf="c.typ==0" no-padding>\n    <ion-col col-12>\n     <ion-list lines no-padding>\n      <ion-item *ngFor="let a of c.answers; let ia2 = index">\n       <ion-grid lines>\n        <ion-row (click)="a.chosen = !a.chosen; recalc();" >\n         <ion-col col-1 >\n          <img [src]="(a.chosen ? chk1 : chk0)">\n          </ion-col>\n         <ion-col col-11 text-wrap>\n	  <p>{{ a.name}} {{a.extr}}</p>\n         </ion-col>\n        </ion-row>\n       </ion-grid>\n      </ion-item>\n     </ion-list> \n    </ion-col>\n    </ion-row>\n\n   </ion-grid>\n </ion-item>\n <ion-item>\n  <ion-row>\n   <ion-col col-4 text-right>\n     <button ion-button round small color="dark" (click)="addqty(-1)"> - </button>\n   </ion-col>\n   <ion-col col-4 text-center>\n    <p style="font-size:1.3em !important">Qty: {{ qty }}</p>\n   </ion-col>\n   <ion-col col-4 text-left>\n    <button ion-button round small color="dark" (click)="addqty(1)"> + </button>\n   </ion-col>\n  </ion-row>\n </ion-item>\n <ion-item>\n  <ion-label>Notes</ion-label>\n  <ion-textarea rows="3" placeholder="Enter any notes here..." [(ngModel)]="notes"></ion-textarea>\n </ion-item>\n</ion-list>\n</ion-content>\n<ion-footer>\n<button ion-button block color="secondary" (click)="addProduct()" style="font-weight:bold!important">[${{totalprice}}] {{ buttonmode }}</button>\n</ion-footer>\n\n'/*ion-inline-end:"/var/www/html/ionic/thai/src/pages/oneitem/oneitem.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]])
    ], OneitemPage);
    return OneitemPage;
}());

//# sourceMappingURL=oneitem.js.map

/***/ }),

/***/ 113:
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
webpackEmptyAsyncContext.id = 113;

/***/ }),

/***/ 155:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/checkout/checkout.module": [
		277,
		3
	],
	"../pages/edititem/edititem.module": [
		280,
		0
	],
	"../pages/enter-credit-card/enter-credit-card.module": [
		278,
		2
	],
	"../pages/oneitem/oneitem.module": [
		279,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 155;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__oneitem_oneitem__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__checkout_checkout__ = __webpack_require__(101);
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
        this.me = 0;
        this.spectext = '';
        this.total = 0;
        this.myname = '';
        this.freightAmount = 0;
        this.freightValid = false;
        this.userPostcode = '';
        this.mytext = '';
        this.mode = 0;
        this.menumode = 0;
        this.catname = '';
        this.message = 'Welcome to Thai Orchid.  Our app allows you to order easily and receive special offers from us.';
        this.mcats = [];
        this.items = [];
        this.mytext = '';
        this.mode = 0;
        this.menumode = 0;
        this.specials = [];
        this.spectext = '';
        this.message = 'Welcome to Thai Orchid.  Our app allows you to order easily and receive special offers from us.';
    }
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        var that = this;
        var w = window.localStorage.getItem('userTag');
        if (!w)
            w = '0';
        this.me = parseInt(w);
        var m = window.localStorage.getItem('myname');
        if (!m)
            m = '';
        this.myname = m;
        var s = window.localStorage.getItem('spectext');
        if (!s)
            s = '';
        this.spectext = s;
        var url = 'getcats.php';
        this.connect.getList(url).subscribe(function (data) {
            that.mytext = '';
            that.zone.run(function () {
                that.mcats = data.mcats;
                that.message = data.message;
                that.gocart(0, 0);
            });
        }, function (err) {
            that.mytext = '';
            _this.connect.logError(err);
        });
    };
    HomePage.prototype.login = function () {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
    };
    HomePage.prototype.delitem = function (x) {
        var f = window.localStorage.getItem('cart').split('~');
        var sz = f.length;
        var nw = '';
        for (var e = 0; e < sz; e++)
            nw = nw + (e == x ? '' : (nw.length ? '~' : '') + f[e]);
        window.localStorage.setItem('cart', nw);
        this.gocart(0, 1);
    };
    HomePage.prototype.delspec = function (x) {
        var y = x + 10000;
        this.gocart(y, 1);
    };
    HomePage.prototype.gocart = function (a, b) {
        var _this = this;
        var that = this;
        var w = window.localStorage.getItem('userTag');
        if (!w)
            w = '0';
        var url = 'gocart.php?me=' + w + '&cart=' + window.localStorage.getItem('cart') + '&spectext=' + this.spectext + '&newspec=' + a;
        this.connect.getList(url).subscribe(function (data) {
            that.zone.run(function () {
                that.total = data.total;
                that.items = data.items;
                that.specials = data.specials;
                that.spectext = data.spectext;
                window.localStorage.setItem('spectext', that.spectext);
                if (b)
                    that.menumode = 1;
            });
        }, function (err) {
            that.mytext = '';
            _this.connect.logError(err);
        });
    };
    HomePage.prototype.checkout = function () {
        window.localStorage.setItem('spectext', this.spectext);
        if (!this.me)
            this.login();
        else
            this.nav.push(__WEBPACK_IMPORTED_MODULE_5__checkout_checkout__["a" /* CheckoutPage */], { total: this.total });
    };
    HomePage.prototype.gospecials = function () {
        var _this = this;
        var that = this;
        var w = window.localStorage.getItem('userTag');
        if (!w)
            w = '0';
        this.me = parseInt(w);
        var m = window.localStorage.getItem('myname');
        if (!m)
            m = '';
        this.myname = m;
        var url = 'gospec.php?me=' + w + '&cart=' + window.localStorage.getItem('cart') + '&spectext=' + this.spectext;
        this.connect.getList(url).subscribe(function (data) {
            that.zone.run(function () {
                that.specials = data.specials;
                that.menumode = 2;
            });
        }, function (err) {
            _this.connect.logError(err);
        });
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
    HomePage.prototype.showItem = function (data) {
        this.nav.push(__WEBPACK_IMPORTED_MODULE_3__oneitem_oneitem__["a" /* OneitemPage */], { item: data, buttonmode: 'ADD TO ORDER' });
    };
    HomePage.prototype.showCat = function (data) {
        var _this = this;
        this.catname = data.name.toUpperCase();
        var that = this;
        var url = 'getitems.php?id=' + data.id;
        this.connect.getList(url).subscribe(function (data) {
            that.mytext = '';
            that.zone.run(function () {
                that.mitems = data.mitems;
                that.mode = 1;
            });
        }, function (err) {
            _this.connect.logError(err);
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/var/www/html/ionic/thai/src/pages/home/home.html"*/'<ion-header no-border no-shadow>\n	<ion-navbar align-title="center" class="backgroundTransparent">\n		<button ion-button menuToggle color="dark"><ion-icon name="menu"></ion-icon></button>\n		<ion-title>THAI ORCHID</ion-title>\n	</ion-navbar>\n</ion-header>\n<ion-menu id="mainmenu" [content]="myMenum" style="overflow:hidden" [persistent]=true >\n	<ion-content class="menucontainer">\n		<ion-item-group class="paddingMenu">\n			<button ion-item (click)="doScan()" class="list-item menuitems" menuClose>\n			   Order History\n			</button>\n			<button ion-item (click)="showAccount()" class="list-item menuitems" menuClose>\n			   Specials\n			</button>\n			<button ion-item (click)="orderHistory()" class="list-item menuitems" menuClose>\n			   My Profile\n			</button>\n			<button ion-item (click)="tandc()" class="list-item menuitems" menuClose>\n			   Terms & Conditions\n			</button>\n			<button ion-item (click)="concern()" class="list-item menuitems" menuClose>\n			   Feedback\n			</button>\n	\n			<button ion-item (click)="signOutAlert()" class="list-item menuitems" menuClose>\n			   Sign Out\n			</button>\n			\n		</ion-item-group>\n	</ion-content>\n</ion-menu>\n\n<ion-content #myMenum text-center>\n\n<ion-grid>\n <ion-row text-center>\n  <ion-col col-12>\n    <img src="./assets/img/background.jpg" style="width:100%">\n  </ion-col>\n </ion-row>\n</ion-grid>\n<div *ngIf="menumode==0">\n<ion-grid>\n<ion-row>\n<ion-col col-1>\n</ion-col>\n<ion-col col-10>\n<ion-item no-lines text-wrap text-center>\n<p [innerHTML]="message"></p>\n</ion-item>\n</ion-col>\n<ion-col col-1>\n</ion-col>\n</ion-row>\n</ion-grid>\n\n    <ion-list class="noBottomMargin" *ngIf="mode==0">\n     <ion-item class="height80 borderBottom" no-lines  style="background-color:#1DD15B; color:white; font-size:1.2em">\n       <ion-row>\n       <ion-col col-12 style="text-align:center">\n       <div style="text-align:center">\n	 MENU\n       </div>\n       </ion-col>\n       </ion-row>\n     </ion-item>\n\n     <ion-item class="height80 borderBottom" no-lines  *ngFor="let m of mcats">\n       <div (click)="showCat(m);">\n       <ion-row>\n       <ion-col col-1>\n       </ion-col>\n       <ion-col col-11>\n       <div>\n	{{ m.name }} \n       </div>\n       </ion-col>\n       </ion-row>\n       </div>\n     </ion-item>\n    </ion-list>\n\n    <ion-list class="noBottomMargin" *ngIf="mode==1">\n     <ion-item class="height80 borderBottom" no-lines  style="background-color:#1DD15B; color:white; font-size:1.0em">\n      <div (click)="mode=0;"> \n       <ion-row>\n       <ion-col col-1>\n         <ion-icon name="arrow-back"></ion-icon>\n       </ion-col>\n       <ion-col col-10 style="text-align:center">\n       <div style="text-align:center">\n	 {{ catname }}\n       </div>\n       </ion-col>\n       <ion-col col-1>\n       </ion-col>\n       </ion-row>\n       </div>\n     </ion-item>\n\n     <ion-item class="borderBottom" no-lines  *ngFor="let mi of mitems">\n       <div (click)="showItem(mi.id);">\n       <ion-row>\n       <ion-col col-10 text-wrap>\n       <div>\n	{{ mi.name }} \n       </div>\n       <p [innerHTML]="mi.description" style="font-size:0.8em" text-wrap></p>  \n       </ion-col>\n       <ion-col col-2 style="text-align:right">\n         <p [innerHTML]="mi.price"></p>\n       </ion-col>\n       </ion-row>\n       </div>\n     </ion-item>\n\n    </ion-list>\n</div>\n<div *ngIf="menumode==1">\n <ion-list no-padding>\n   <ion-list-header>\n     <p>Your Order</p>\n   </ion-list-header>\n   <ion-item>\n    <p small>Swipe left on an item to make changes</p>\n   </ion-item>\n   <ion-item-sliding *ngFor="let i of items; let x = index">\n     <ion-item>\n     <ion-row>\n       <ion-col col-9 text-wrap>\n         <p [innerHTML]="i.text"> </p>\n       </ion-col>\n       <ion-col col-3 text-right>\n         {{ i.amount }}\n       </ion-col>\n     </ion-row>\n     </ion-item>\n     <ion-item-options>\n       <button ion-button color="secondary" (click)="edtitem(x)"><ion-icon name="brush"></ion-icon>Edit</button>\n       <button ion-button color="danger" (click)="delitem(x)"><ion-icon name="close"></ion-icon>Delete</button>\n     </ion-item-options>\n  </ion-item-sliding>\n\n   <ion-item-sliding *ngFor="let s of specials; let ss = index">\n     <ion-item style="background-color:#FFFFBB">\n     <ion-row>\n       <ion-col col-9 text-wrap>\n         <p [innerHTML]="s.name"> </p>\n       </ion-col>\n       <ion-col col-3 text-right>\n         {{ s.amount }}\n       </ion-col>\n     </ion-row>\n     </ion-item>\n     <ion-item-options>\n       <button ion-button color="danger" (click)="delspec(ss)"><ion-icon name="close"></ion-icon>Delete</button>\n     </ion-item-options>\n  </ion-item-sliding>\n\n   <ion-item>\n   <ion-row>\n    <ion-col col-9>\n      <p><b>TOTAL</b></p>\n    </ion-col>\n    <ion-col col-3 text-right>\n     <b>{{ total }}</b>\n    </ion-col>\n   </ion-row>\n  </ion-item>\n </ion-list>\n  <ion-item *ngIf="items.length" style="margin-top:25px" no-padding no-lines>\n   <button ion-button full color="secondary" (click)="checkout()" style="padding-top:25px; padding-bottom:25px">Finish Order</button>\n  </ion-item>\n\n</div>\n\n<div *ngIf="menumode==2">\n <div *ngIf="me==0">\n  <ion-row>\n   <ion-col col-1></ion-col>\n   <ion-col col-10>\n   <p text-left>We offer loyalty rewards for users of this App</p>\n   <p text-left>To earn extra prizes, log in or create a free account below</p>\n   <button ion-button (click)="login()">Log In</button>\n   <p text-left>Allow notifications and check back here regularly to find out about our new offers</p>\n   <p text-left>Please click on any reward to apply it to your order</p>\n   </ion-col>\n   <ion-col col-1></ion-col>\n  </ion-row>\n </div>\n <div *ngIf="me>0">\n  <ion-row>\n   <ion-col col-1></ion-col>\n   <ion-col col-10>\n   <p text-left>Hi {{ myname }},</p>\n   <p text-left>Please click on any reward to apply it to your order</p>\n   </ion-col>\n   <ion-col col-1></ion-col>\n  </ion-row>\n </div>\n <ion-card *ngFor="let s of specials" style="background-color:#F6FFF6">\n   <ion-card-header text-wrap>\n       {{ s.title }}\n   </ion-card-header>\n   <ion-card-content text-wrap>\n       {{ s.notes }}\n       <hr>\n       {{ s.statuscode }} &nbsp;\n<button ion-button *ngIf="s.status==0" (click)="gocart(s.id,1)" color="secondary">Apply</button>\n\n   </ion-card-content>\n </ion-card>\n  \n</div>\n</ion-content>\n\n<ion-footer style="background-color:#E6E6E6; padding-top:8px; padding-bottom:8px">\n<ion-grid no-padding>\n<ion-row text-center>\n <ion-col col-4 (click)="menumode=0;">\n <ion-icon name="map"> </ion-icon>\n </ion-col>\n <ion-col col-4 (click)="gocart(0,1);">\n <ion-icon name="list"> </ion-icon>\n </ion-col>\n\n <ion-col col-4 (click)="gospecials();" >\n <ion-icon name="star"> </ion-icon>\n </ion-col>\n\n</ion-row>\n<ion-row text-center style="min-height:30px !important">\n\n <ion-col col-4 (click)="menumode=0;">\n Menu\n </ion-col>\n\n <ion-col col-4 (click)="gocart(0,1);">\n My Order\n<ion-badge color="secondary" *ngIf="items.length">{{ items.length }}</ion-badge>\n </ion-col>\n\n <ion-col col-4 (click)="gospecials();" >\n Rewards\n </ion-col>\n</ion-row>\n\n</ion-grid>\n</ion-footer>\n'/*ion-inline-end:"/var/www/html/ionic/thai/src/pages/home/home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["M" /* NgZone */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_register__ = __webpack_require__(202);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginPage = /** @class */ (function () {
    function LoginPage(loadingCtrl, alertCtrl, navCtrl, toastCtrl, connect, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.connect = connect;
        this.navParams = navParams;
        this.mode = 0;
        this.newmode = '0';
        this.newmode = '0';
        this.mode = 0;
        this.form = {
            email: '',
            password: ''
        };
        this.reg = {
            id: '',
            firstname: '',
            surname: '',
            phone: '',
            postcode: ''
        };
    }
    LoginPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 2000,
            position: 'top'
        });
        toast.present();
    };
    LoginPage.prototype.ionViewDidEnter = function () {
        if (window.localStorage.getItem('userTag'))
            this.navCtrl.pop();
    };
    LoginPage.prototype.login = function () {
        var msg = '';
        if (this.form.password.length < 4)
            msg = 'Password Too Short';
        var a1 = this.form.email.indexOf('@');
        if (a1 > 0) {
            var m = this.form.email.substr(a1);
            if (m.indexOf('.') <= 0)
                msg = 'Invalid Email Address';
        }
        else
            msg = 'Invalid Email Address';
        if (msg.length)
            this.presentToast(msg);
        else
            this.dologin();
    };
    LoginPage.prototype.dologin = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        var that = this;
        this.connect.getYum('userlogin.php?params=' + encodeURI(this.form.email + '^' + this.form.password)).subscribe(function (data) {
            loading.dismiss();
            // console.log(data);
            if (data.success > '0') {
                if ((data.firstname.length > 0) && (data.surname.length > 0)) {
                    window.localStorage.setItem('userTag', data.userTag);
                    window.localStorage.setItem('myname', data.firstname);
                    that.navCtrl.pop();
                }
                else {
                    that.reg.id = data.userTag;
                    that.newmode = '1';
                    that.reg.email = data.email;
                    that.reg.firstname = data.firstname;
                    that.reg.surname = data.surname;
                    that.reg.phone = data.phone;
                    that.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__register_register__["a" /* RegisterPage */], { reg: that.reg });
                    window.localStorage.setItem('myname', '');
                }
            }
            else {
                that.error = data.error;
            }
        }, function (err) { return _this.connect.logError(err); });
    };
    LoginPage.prototype.forgot = function () {
        var _this = this;
        var em = this.form.email;
        var that = this;
        if (!em.length)
            that.presentToast('Please Enter Email Address First');
        else {
            var loading_1 = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading_1.present();
            this.connect.getList('zs_forgotpass.php?email=' + encodeURI(this.form.email)).subscribe(function (data) {
                loading_1.dismiss();
                that.doComplete();
            }, function (err) { return _this.connect.logError(err); });
        }
    };
    LoginPage.prototype.doComplete = function () {
        var _this = this;
        var that = this;
        var alert = this.alertCtrl.create({
            title: 'Forgot Password',
            subTitle: 'Please check your email for instructions',
            buttons: [
                {
                    text: 'Okay',
                    role: 'cancel',
                    handler: function () {
                        _this.navCtrl.pop();
                    }
                }
            ]
        });
        alert.present();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/var/www/html/ionic/thai/src/pages/login/login.html"*/'<ion-header no-border no-shadow>\n	<ion-navbar align-title="center">\n		<ion-title>THAI ORCHID</ion-title>\n	</ion-navbar>\n</ion-header>\n\n\n<ion-content no-padding text-center>\n<div style="text-align:center; color:white; background-color:#8EC63F; padding:6px; font-size:1.4em !important; margin-bottom: 0px !important">LOG-IN / REGISTER</div>\n\n<ion-grid no-padding text-center *ngIf="mode==0">\n<ion-row style="margin-top:20px"><ion-col col-12 text-center>Account details powered by</ion-col></ion-row>\n<ion-row style="margin:0px; padding:0px !important"><ion-col col-12 text-center><img src="./assets/img/yumbrella.png"></ion-col></ion-row>\n<ion-row style="margin-top:12px"><ion-col col-1></ion-col><ion-col col-10 text-center><i>deliciously safe and simple payment system for food and beverages</i></ion-col><ion-col col-1></ion-col></ion-row>\n<ion-row style="margin-top:25px"><ion-col col-6 text-center>Have an Account?</ion-col><ion-col col-6 text-center>New to Yumbrella?</ion-col></ion-row>\n<ion-row><ion-col col-6 text-center><button ion-button color="secondary" (click)="mode=1">Log-In</button></ion-col><ion-col col-6 text-center><button ion-button color="secondary" (click)="mode=2">Join Us</button></ion-col></ion-row>\n<ion-row style="margin-top:25px"><ion-col col-12 text-center><a (click)="about()">About Yumbrella</a></ion-col></ion-row>\n<ion-row><ion-col col-12 text-center><a (click)="where()">Where Can I Use It?</a></ion-col></ion-row>\n<ion-row><ion-col col-12 text-center><a (click)="privacy()">Privacy Policy</a></ion-col></ion-row>\n</ion-grid>\n<ion-grid *ngIf="mode==1">\n		<form (ngSubmit)="login()" #loginForm="ngForm" class="maxWidth300">\n			<ion-row>\n				<ion-col>\n					<ion-list>\n						<ion-item>\n							<ion-label color="primary" floating>Email</ion-label>\n							<ion-input type="email" [(ngModel)]="form.email" name="email"  required></ion-input>\n						</ion-item>\n						<ion-item>\n							<ion-label color="primary" floating>Password</ion-label>\n							<ion-input type="password"[(ngModel)]="form.password" name="password" required></ion-input>\n						</ion-item>\n					</ion-list>\n				</ion-col>\n			</ion-row>\n			<ion-row>\n<ion-col col-1>\n</ion-col>\n				<ion-col col-10>\n					<button ion-button full [disabled]="!loginForm.form.valid" class="button200">Log In</button>\n				</ion-col>\n<ion-col col-1>\n</ion-col>\n			</ion-row>\n			<ion-row>\n				<ion-col padding class="error" *ngIf="error">\n					<p>{{error}}</p>\n				</ion-col>\n			</ion-row>\n		</form>\n		\n		<ion-row padding-top>\n			<ion-col text-center>\n<i>Forgot Password?</i><br>\nEnter email address above and click <span style="color:white; background-color:dodgerblue; padding:2px" (click)="forgot()">HERE</span>\n			</ion-col>\n		</ion-row>\n </ion-grid>\n		<div class="spacer height80"></div>\n</ion-content>\n'/*ion-inline-end:"/var/www/html/ionic/thai/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_connect__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RegisterPage = /** @class */ (function () {
    function RegisterPage(loadingCtrl, navCtrl, toastCtrl, connect, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.connect = connect;
        this.navParams = navParams;
        this.reg = this.navParams.get('reg');
    }
    RegisterPage.prototype.presentToast = function (text) {
        var toast = this.toastCtrl.create({
            message: text,
            duration: 2000,
            position: 'top'
        });
        toast.present();
    };
    RegisterPage.prototype.ionViewDidLoad = function () {
        //    console.log('ionViewDidLoad EmailLoginPage');
    };
    RegisterPage.prototype.doRegister = function () {
        var msg = '';
        if ((this.reg.firstname.length < 1) || (this.reg.surname.length < 1))
            msg = 'Please enter your name';
        if (msg.length)
            this.presentToast(msg);
        else {
            var that_1 = this;
            var loading_1 = this.loadingCtrl.create({
                content: 'Please wait...'
            });
            loading_1.present();
            var url = 'userregister.php?reg=' + JSON.stringify(this.reg);
            // console.log(url);
            window.localStorage.setItem('myname', this.reg.firstname);
            this.connect.getList(url).subscribe(function (data) {
                loading_1.dismiss();
                if (data.success) {
                    // console.log(data);
                    window.localStorage.setItem('userTag', that_1.reg.id);
                    that_1.navCtrl.pop();
                }
            }, function (err) {
                loading_1.dismiss();
                that_1.connect.logError(err);
            });
        }
    };
    RegisterPage.prototype.goBack = function () {
        this.navCtrl.pop();
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"/var/www/html/ionic/thai/src/pages/register/register.html"*/'<ion-header>\n	<ion-navbar align-title="center"  style="background-color:white">\n		<ion-title style="background-color:white">New User Details</ion-title>\n	</ion-navbar>\n</ion-header>\n\n<ion-content text-center>\n <ion-grid>\n <ion-row>\n   <ion-col>\n<p>Please fill out the details below to establish your account.</p>\n </ion-col>\n</ion-row>\n			<ion-row>\n				<ion-col>\n					<ion-list>\n						<ion-item>\n							<ion-label color="primary" floating>Register with Email</ion-label>\n							<ion-input type="email" [(ngModel)]="reg.email" disabled></ion-input>\n						</ion-item>\n						<ion-item>\n							<ion-label color="primary" floating>First Name</ion-label>\n							<ion-input type="text"[(ngModel)]="reg.firstname" required></ion-input>\n						</ion-item>\n						<ion-item>\n							<ion-label color="primary" floating>Surname</ion-label>\n							<ion-input type="text"[(ngModel)]="reg.surname" required></ion-input>\n						</ion-item>\n\n					</ion-list>\n				</ion-col>\n			</ion-row>\n </ion-grid>  \n</ion-content>\n<ion-footer>\n<button ion-button full color="secondary" (click)="doRegister()">Save</button>\n</ion-footer>\n'/*ion-inline-end:"/var/www/html/ionic/thai/src/pages/register/register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_connect__["a" /* Connect */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(226);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 226:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_oneitem_oneitem__ = __webpack_require__(103);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_register_register__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_checkout_checkout__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_enter_credit_card_enter_credit_card__ = __webpack_require__(102);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__providers_connect__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__angular_http__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__ionic_native_stripe__ = __webpack_require__(157);
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
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_checkout_checkout__["a" /* CheckoutPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_enter_credit_card_enter_credit_card__["a" /* EnterCreditCardPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_oneitem_oneitem__["a" /* OneitemPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_13__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/checkout/checkout.module#CheckoutPageModule', name: 'CheckoutPage', segment: 'checkout', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/enter-credit-card/enter-credit-card.module#EnterCreditCardPageModule', name: 'EnterCreditCardPage', segment: 'enter-credit-card', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/oneitem/oneitem.module#OneitemPageModule', name: 'OneitemPage', segment: 'oneitem', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/edititem/edititem.module#EdititemPageModule', name: 'EdititemPage', segment: 'edititem', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_enter_credit_card_enter_credit_card__["a" /* EnterCreditCardPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_checkout_checkout__["a" /* CheckoutPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_oneitem_oneitem__["a" /* OneitemPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_14__ionic_native_stripe__["a" /* Stripe */],
                __WEBPACK_IMPORTED_MODULE_12__providers_connect__["a" /* Connect */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(200);
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
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Connect; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(156);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(251);
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
        this.server_url = 'http://actcasual.com.au/';
        this.server_yurl = 'http://yumbrella.online/';
    }
    Connect.prototype.PostQuery = function (object, parameter) {
        return this.http.get(this.server_url + object + parameter).map(function (res) { return res.json(); });
    };
    Connect.prototype.getList = function (object) {
        return this.http.get(this.server_url + object).map(function (res) { return res.json(); });
    };
    Connect.prototype.getYum = function (object) {
        return this.http.get(this.server_yurl + object).map(function (res) { return res.json(); });
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

/***/ })

},[203]);
//# sourceMappingURL=main.js.map