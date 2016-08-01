//var Map = {
//    init: function () {
//    }
//};

var normalm = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
    maxZoom: 18,
    minZoom: 3,
    attribution: '高德地图',
});
var imgm = L.tileLayer.chinaProvider('GaoDe.Satellite.Map', {
    maxZoom: 18,
    minZoom: 3,
    attribution: '高德地图',
});
var imga = L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', {
    maxZoom: 18,
    minZoom: 3,
    attribution: '高德地图',
});

var normal = L.layerGroup([normalm]),
    image = L.layerGroup([imgm, imga]);

var baseLayers = {
    "地图": normal,
    "影像": image,
}

//我的位置
//九润大厦  (22.53705, 114.01933)
//test22.72988783978288, 114.22054052352907
var centerLatlng = [0, 0];

//我的自定义图标
var myIcon = L.icon({
    iconUrl: 'http://webmap0.map.bdimg.com/image/api/blank.gif',
    iconRetinaUrl: 'http://webmap0.map.bdimg.com/image/api/blank.gif',
    iconSize: [12, 12],
    className: 'myIcon'
});

var map = L.map("map", {
    center: centerLatlng,
    zoom: 2,
    layers: [normal],
    //zoomControl: false,
    minZoom: 2,
    maxBounds: [[-90, -180], [90, 180]],
    //attributionControl: false
});

map.findAccuratePosition({
    maxWait: 15000, // defaults to 10000
    desiredAccuracy: 30 // defaults to 20
});

//设置我的位置
updateMyPosion(centerLatlng);

//设置层
L.control.layers(baseLayers, null).addTo(map);

//设置缩放控件
L.control.zoom({
    zoomInTitle: '放大',
    zoomOutTitle: '缩小',
    position: 'bottomright'
}).addTo(map);

//设置标记
L.control.attribution({
    position: 'bottomleft'
}).addTo(map);

//添加我的位置标记
var myPosion;
var myPosionCircle;
/*
设置我的位置
*/
function updateMyPosion(mylocaltion) {
    if (!!myPosion) {
        map.removeLayer(myPosion);
        map.removeLayer(myPosionCircle);
    }
    myPosion = L.marker(mylocaltion,
    {
        icon: myIcon
    }).addTo(map);
    //marker.bindPopup("<b>九润大厦</b><br/>深圳市易图资讯股份有限公司");
    //添加我的位置范围
    mylocaltion = L.circle(mylocaltion, 80, {
        color: '#3385ff',
        fillColor: '#3385ff',
        fillOpacity: 0.1,
        weight: 1,
        clickable: false
    }).addTo(map);
}

function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        weight: 2,
        opacity: 0.8,
        color: 'yellow',
        fillColor: 'yellow',
        fillOpacity: 0.1
    });
    if (!L.Browser.ie && !L.Browser.opera) {
        layer.bringToFront();
    }
}

function resetHighlight(e) {
    if (geojson !== undefined) {
        geojson.resetStyle(e.target)
    }
    //if (outline !== undefined) {
    //    outline.resetStyle(e.target);
    //}
}

//设置东海花园
var geojson;
$.ajax({
    url: '/json/estate.json',
    dataType: 'json',
    success: function (data) {
        setGeoJson(data);
    }
});

//设置中国城市
$.ajax({
    url: '/json/china_simplify.json',
    dataType: 'json',
    success: function (data) {
        setGeoJson(data);
    }
});

//设置geoJson
function setGeoJson(data) {
    //设置数据
    geojson = L.geoJson(data, {
        style: function (feature) {
            return {
                color: feature.properties.color,
            };
        },
        onEachFeature: function (feature, layer) {
            //layer.bindPopup(feature.properties.description);
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: function (e) {
                    layer.bindPopup(feature.properties.description);
                }
            });
        }
    }).addTo(map);
}


//定位中
function onAccuratePositionProgress(e) {
    $('#iploc').find('.titleComm').addClass('hide');
    $('#iploc').find('.loading-button').removeClass('hide');
    console.log(e.accuracy);
    console.log(e.latlng);
}

//定位成功
function onAccuratePositionFound(e) {
    $('#iploc').find('.titleComm').addClass('hide');
    //设置地图中心点
    map.setView(e.latlng);
    map.setZoom(16);
    console.log(e.accuracy);
    console.log(e.latlng);
}

//定位失败
function onAccuratePositionError(e) {
    $('#iploc').find('.titleComm').addClass('hide');
    $('#iploc').find('.titleFailed').removeClass('hide');
    console.log(e.message)
}

//目前没有申请到key
//var geolocation;
//mapObj = new AMap.Map('iCenter');
//mapObj.plugin('AMap.Geolocation', function () {
//    geolocation = new AMap.Geolocation({
//        enableHighAccuracy: true,//是否使用高精度定位，默认:true
//        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
//        maximumAge: 0,           //定位结果缓存0毫秒，默认：0
//        convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
//        showButton: true,        //显示定位按钮，默认：true
//        buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
//        buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
//        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
//        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
//        panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
//        zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
//    });
//    mapObj.addControl(geolocation);
//    AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
//    AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
//});

function bind() {
    //定位提示
    $('#iploc').on('onmouseover', function () {
        console.log('onmouseover');
        $(this).find('div').addClass('hide');
        $(this).find('.title').removeClass('hide');
    }).on('click', function () {
        map.findAccuratePosition({
            maxWait: 15000, // defaults to 10000
            desiredAccuracy: 30 // defaults to 20
        });
    });

    map.on('accuratepositionprogress', onAccuratePositionProgress);
    map.on('accuratepositionfound', onAccuratePositionFound);
    map.on('accuratepositionerror', onAccuratePositionError);

    //添加地图点击事件
    map.on('click', function (e) {
        //console.log(e.latlng);
        L.popup()
            .setLatLng(e.latlng)
            .setContent("当前点坐标" + e.latlng.toString())
            .openOn(map);
    });
    //console.log(map.locate());
}

bind();