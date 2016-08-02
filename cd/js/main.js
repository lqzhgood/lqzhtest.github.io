var _copy = "<li><div class='{{cls}}'> <span>{{st_pos}}</span> <img src='' alt=''> </div><div class='cd-cont'><div class='cont-top'><p class='st_na'>{{st_na}}</p></div><div class='cont-main'><p class='st_ph'><a href='tel:{{st_ph}}}'>{{st_ph}}}</a></p><p class='st_ad'>{{st_ad}}</p></div><div class='cont-btm clearfix'><p class='st_ot'>9AM~12PM</p><a class='st_map' target='_blank' href='http://3gimg.qq.com/lightmap/v1/marker/?marker=coord:{{st_lat}},{{st_lng}};title:{{st_na}};addr:{{st_ad}}&key=TKUBZ-D24AF-GJ4JY-JDVM2-IBYKK-KEBCU&referer=tengxun&ch=uri-api&ADTAG=uri-api.other'>查看地图</a></div></div></li>";
var myPos = {
    lat: 39.905
    , lng: 116.456
};
$(function () {
    navigator.geolocation.getCurrentPosition(success, null);

    function getDom() {
    //            $.getJSON("http://42.96.199.97:8011/api/stores/query", function (stores) {
    //                myStores = JSON.parse(stores);
    //                console.log(myStores);
    //            });
    //获取位置
        $.ajax({
            url: "./test.js"
            , async: true
            , cache: true
            , dataType: "script"
            , success: function (data) {
                //处理数组排序 输出排序好的 stList[]
                var posArr = [];
                var stores = md.stores;
                for (var i = 0; i < stores.length; i++) {
                    console.log(myPos);
                    var wz = getDistance(myPos.lat, myPos.lng, stores[i].Latitude, stores[i].Longitude);
                    stores[i].pos = wz;
                    if (wz - 1000 < 0) {
                        stores[i].poss = wz + " M";
                        stores[i].cls = "cd-pic car";
                    }
                    else if (wz > 10000) {
                        stores[i].poss = (wz / 1000).toFixed(2) + " KM";
                        stores[i].cls = "cd-pic air";
                    }
                    else {
                        stores[i].poss = (wz / 1000).toFixed(2) + " KM";
                        stores[i].cls = "cd-pic tra";
                    }
                    posArr.push(wz);
                }
                posArr.sort(function (a, b) {
                    return a - b;
                });
                var stList = [];
                for (var i = 0; i < posArr.length; i++) {
                    for (var j = 0; j < posArr.length; j++) {
                        if (posArr[i] == stores[j].pos) {
                            stList.push(stores[j]);
                            break;
                        }
                    }
                }
                //输出HTML结构
                var _dom = "";
                for (var i = 0; i < stList.length; i++) {
                    _dom += _copy.replace(/\{{st_pos}}/g, stList[i].poss).replace(/\{{st_na}}/g, stList[i].Name).replace(/\{{st_ph}}/g, stList[i].Phone).replace(/\{{st_ad}}/g, stList[i].Address).replace(/\{{st_lat}}/g, stList[i].Latitude).replace(/\{{st_lng}}/g, stList[i].Longitude).replace(/\{{cls}}/g, stList[i].cls);
                }
                $("#store").html(_dom);
            }
            , error: function () {
                console.log("err");
            }
        });
    }
    //    $.get('./test.js').done(function (data) {
    //    
    //    }); //get-over
    //定位地址--未找到采用天安门   
    //                lat: 39.908864
    //            , lng: 116.397443
    //定位获取位置
    function success(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        if (latitude == null || longitude == null) {
            myPos = {
                lat: 39.905
                , lng: 116.456
            }
        }
        else {
            myPos = {
                lat: latitude
                , lng: longitude
            }
        }
        getDom();
    };
    //计算位置
    function getDistance(lat1, lng1, lat2, lng2) {
        var dis = 0;
        var radLat1 = toRadians(lat1);
        var radLat2 = toRadians(lat2);
        var deltaLat = radLat1 - radLat2;
        var deltaLng = toRadians(lng1) - toRadians(lng2);
        var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
        return parseInt(dis * 6378137);

        function toRadians(d) {
            return d * Math.PI / 180;
        }
    }
});