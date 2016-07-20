//var Map = {
//    init: function () {
//    }
//};


var normalm = L.tileLayer.chinaProvider('GaoDe.Normal.Map', {
    maxZoom: 18,
    minZoom: 5,
    attribution: '高德地图',
});
var imgm = L.tileLayer.chinaProvider('GaoDe.Satellite.Map', {
    maxZoom: 18,
    minZoom: 5,
    attribution: '高德地图',
});
var imga = L.tileLayer.chinaProvider('GaoDe.Satellite.Annotion', {
    maxZoom: 18,
    minZoom: 5,
    attribution: '高德地图',
});

var normal = L.layerGroup([normalm]),
    image = L.layerGroup([imgm, imga]);

var baseLayers = {
    "地图": normal,
    "影像": image,
}

//我的位置
var mylocaltion = [22.72988783978288, 114.22054052352907];

//我的自定义图标
var myIcon = L.icon({
    iconUrl: 'http://webmap0.map.bdimg.com/image/api/blank.gif',
    iconRetinaUrl: 'http://webmap0.map.bdimg.com/image/api/blank.gif',
    iconSize: [12, 12],
    className: 'myIcon'
});

var map = L.map("map", {
    center: mylocaltion,
    zoom: 16,
    layers: [normal],
    zoomControl: false,
    attributionControl: false
});

map.findAccuratePosition({
    maxWait: 15000, // defaults to 10000
    desiredAccuracy: 30 // defaults to 20
});

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

//添加标记
var marker = L.marker(mylocaltion,
    {
        icon: myIcon
    }).addTo(map);
marker.bindPopup("<b>九润大厦</b><br/>深圳市易图资讯股份有限公司");

//添加我的位置范围
var circle = L.circle(mylocaltion, 80, {
    color: '#3385ff',
    fillColor: '#3385ff',
    fillOpacity: 0.1,
    weight: 1,
    clickable: false
}).addTo(map);

//数据（写死）
var data = {
    "type": "FeatureCollection",
    "features": [
      {
          "type": "Feature",
          "geometry": {
              "type": "Polygon",
              "coordinates": [[
                [114.02088, 22.53877], [114.02102, 22.53881], [114.02112, 22.5388],
                [114.02157, 22.53884], [114.02237, 22.53897],
                [114.02253, 22.53892], [114.02277, 22.53781],
                [114.02273, 22.53767], [114.02267, 22.53756],
                [114.02118, 22.5373], [114.02098, 22.53742],
                [114.02096, 22.53767], [114.02091, 22.53785],
                [114.02087, 22.53804], [114.02081, 22.53822],
                [114.02074, 22.53854], [114.02088, 22.53877]
              ]]
          },
          "properties": {
              "name": "东海花园",
              "color": "red",
              "description": "东海花园",
              "resetStyle": ""
          }
      },
      {
          "type": "Feature",
          "properties": {
              "Id": 0,
              "name": "熙龙湾",
              "enName": "xilongwan",
              "minZoom": 3,
              "maxZoom": 7,
              "imgWidth": 17263,
              "imgHeight": 13190
          },
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [113.88735015, 22.54817294],
                      [113.88857288, 22.54841337],
                      [113.88958339, 22.54811443],
                      [113.89059706, 22.5476244],
                      [113.88970218, 22.54611041],
                      [113.88708882, 22.54721482],
                      [113.88735015, 22.54817294]
                  ]
              ]
          }
      }, {
          "type": "Feature",
          "properties": {
              "Id": 1,
              "name": "招商依山郡",
              "enName": "yishanjun",
              "minZoom": 3,
              "maxZoom": 7,
              "imgWidth": 19867,
              "imgHeight": 14034
          },
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [114.21805375, 22.73093753],
                      [114.220364, 22.73147023],
                      [114.2207633, 22.73155573],
                      [114.22320189, 22.73207528],
                      [114.22325894, 22.7320687],
                      [114.22330885, 22.73198978],
                      [114.22338015, 22.73180564],
                      [114.2235085, 22.72881986],
                      [114.22339442, 22.72860941],
                      [114.22319476, 22.72835949],
                      [114.21959392, 22.72772155],
                      [114.21896644, 22.72762948],
                      [114.21868123, 22.7276229],
                      [114.21839601, 22.72757029],
                      [114.21819636, 22.72766236],
                      [114.21811079, 22.72782678],
                      [114.21805375, 22.73093753]
                  ]
              ]
          }
      }, {
          "type": "Feature",
          "properties": {
              "Id": 0,
              "name": "君悦龙庭",
              "enName": "junyuelongting",
              "minZoom": 3,
              "maxZoom": 7,
              "imgWidth": 14034,
              "imgHeight": 19867
          },
          "geometry": {
              "type": "Polygon",
              "coordinates": [
                  [
                      [114.22174498, 22.7279214],
                      [114.22224306, 22.72800853],
                      [114.22268104, 22.7280719],
                      [114.22286138, 22.72804021],
                      [114.22317054, 22.7281115],
                      [114.22335946, 22.72812734],
                      [114.22342817, 22.72803229],
                      [114.22346252, 22.72778674],
                      [114.22347969, 22.72453915],
                      [114.22250928, 22.72454707],
                      [114.22186521, 22.7244837],
                      [114.22181368, 22.72606791],
                      [114.22174498, 22.7279214]
                  ]
              ]
          }
      }
    ]
};

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

//设置数据
var geojson = L.geoJson(data, {
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