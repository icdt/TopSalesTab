app.factory('OrderDetailsFactory', ['$q','$http', 'UrlHelper','ProductsFactory', function ($q, $http, UrlHelper,ProductsFactory) {
    
    return{
        // checklist, select選項
        allLocationOptions: [{}, {}, {}],
                        
        // crud
        getAll: function () {
            var url = UrlHelper.prepareUrl('api/OrdDetailtHists');
            return $http.get(url);
        },
        getOrderDetails: function (ppObj) {
            var url = UrlHelper.prepareUrl('api/OrdDetailtHists?ds=' + ppObj.DATE_SALE + '&vs=' + ppObj.VOU_SALE);
            
            var defered = $q.defer();
            
            $http.get(url).success(function(orderDetails){
                
                var ii = 0;
                angular.forEach(orderDetails, function (detail) {

                    ProductsFactory.getOneByProductId(detail.PROD_ID).success(function (productInfo) {

                        detail.productDetail = productInfo;
                        ii++;
                        
                        // 因為是非同步，當跑到最後一個時再resolve
                        if (ii == orderDetails.length) {
                            defered.resolve(orderDetails);
                        }

                    }).error(function (err) {
                        defered.reject(err);
                    });

                });
                //for (var i = 0; i < orderDetails.length; i++) {
                    
                //    ProductsFactory.getOneByProductId(orderDetails[i].PROD_ID).success(function (productInfo) {
                        
                //        orderDetails[i].productDetail = productInfo;

                //        // 因為是非同步，當跑到最後一個時再resolve
                //        if (i == orderDetails.length -1) {
                //            defered.resolve(orderDetails);
                //        }

                //    }).error(function (err) {
                //        defered.reject(err);
                //    });
                //}

            }).error(function(err){
                defered.reject(err);
            });



            return defered.promise;
        },



        preparePostObj: function (master, ppObj) {

            var aa = {
                DATE_SALE: master.DATE_SALE,
                VOU_SALE: master.VOU_SALE,
                TIME_SALE: '',
                PROD_ID: ppObj.PROD_ID,
                PACK_ID: '',
                PACK_QTY: '',
                UNIT_PRICE: ppObj.SALE_PRICE,
                PRICE_TYPE: '',
                ORD_QTYI: '',
                ORD_QTYF: '',
                QTYI: ppObj.QTYI,
                QTYF: ppObj.QTYF,
                GIO_ID: '',
                G_QTYI: '',
                G_QTYF: '',
                GDEPT_ID: '',
                G_UTAX: '',
                G_AMT: '',
                RIO_ID: '',
                R_QTYI: '',
                R_QTYF: '',
                RDEPT_ID: '',
                R_UTAX: '',
                R_AMT: '',
                UTAX: '',
                TAX: '',
                AMT: '',
                H_AMT: '',
                SUBS_MARK: '',
                PREPROD_ID: '',
                PHOTO: ppObj.PHOTO,
                PROD_NAME: ppObj.PROD_NAME,
                DLAST_QTYI: ppObj.DLAST_QTYI,
                OUNIT_ID: ppObj.OUNIT_ID,
                BASE_IDname: ppObj.BASE_IDname,
                IPACK_QTY: ppObj.IPACK_QTY,

            };




            return aa;
        }
    };

}]);