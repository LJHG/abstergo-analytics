import React, { useState, useEffect } from 'react'
import PageHeader from '../../component/pageheader'
import { Skeleton } from 'antd'
import echarts from 'echarts';
// import 'echarts/map/js/china';
import geoJson from 'echarts/map/json/china.json';
import { cityCord, cityArray } from '../../city';
import locale from "antd/es/date-picker/locale/zh_CN";

const routes = [
    {
        path: '/',
        breadcrumbName: '首页',
    },
    {
        breadcrumbName: '新冠疫情专题',
        menu: [{
            path: '/corona/price',
            title: '机票价格变化'
        }]
    },
    {
        breadcrumbName: '航班数量变化',
    },
];

const convertData = (data) => {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = cityCord[data[i].city];
        if (geoCoord) {
            res.push({
                name: data[i].city,
                value: [geoCoord.log, geoCoord.lat, Math.floor(Math.random()*20)+1],
                type: 'node'
            });
        }
    }
    return res;
};

var days = [
    "1月20", "1月21", "1月22", "1月23", "1月24", "1月25", "1月26", "1月27", "1月28", "1月29", "1月30", "1月31", "2月1", "2月2", "2月3", "2月4", "2月5", "2月6", "2月7", "2月8", "2月9", "2月10", "2月11", "2月12", "2月13", "2月14", "2月15", "2月16", "2月17", "2月18", "2月19", "2月20", "2月21", "2月22", "2月23", "2月24", "2月25", "2月26", "2月27", "2月28", "2月29", "3月1", "3月2", "3月3", "3月4", "3月5", "3月6", "3月7", "3月8", "3月9", "3月10", "3月11", "3月12", "3月13", "3月14", "3月15", "3月16", "3月17", "3月18", "3月19", "3月20", "3月21", "3月22", "3月23", "3月24", "3月25", "3月26", "3月27", "3月28", "3月29", "3月30", "3月31", "4月1", "4月2",
];

var province = [
    '湖北', '广东', '浙江', '湖南', '河南', '安徽', '重庆', '山东', '江西', '四川', '江苏', '北京', '福建', '上海', '广西', '河北', '陕西', '云南', '海南', '黑龙江', '辽宁', '山西', '天津', '甘肃', '内蒙古', '新疆', '宁夏', '吉林', '贵州', '青海', '西藏', '澳门', '香港', '台湾'
];

var data = [
    [270, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [375, 26, 5, 1, 1, 0, 5, 1, 2, 2, 0, 10, 0, 6, 0, 0, 0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [444, 32, 10, 4, 5, 1, 9, 6, 3, 5, 1, 14, 1, 16, 2, 1, 4, 0, 5, 1, 2, 1, 4, 0, 0, 0, 1, 1, 3, 0, 0, 1, 1, 1],
    [549, 53, 43, 24, 9, 15, 27, 9, 7, 15, 9, 22, 4, 20, 13, 2, 5, 2, 8, 4, 4, 1, 5, 2, 1, 2, 2, 3, 3, 0, 0, 2, 2, 1],
    [729, 78, 62, 43, 32, 39, 57, 21, 18, 28, 18, 36, 10, 33, 23, 8, 15, 5, 17, 9, 12, 6, 8, 4, 2, 3, 3, 4, 4, 0, 0, 2, 5, 3],
    [1052, 98, 104, 69, 83, 60, 75, 39, 36, 44, 31, 41, 18, 40, 33, 13, 22, 11, 22, 15, 16, 9, 10, 7, 7, 4, 4, 4, 5, 1, 0, 2, 5, 3],
    [1423, 146, 128, 100, 128, 70, 110, 63, 48, 69, 47, 68, 35, 53, 46, 18, 35, 19, 31, 21, 22, 13, 14, 14, 11, 5, 7, 6, 7, 4, 0, 5, 8, 4],
    [2714, 188, 173, 143, 168, 106, 132, 63, 72, 90, 70, 80, 59, 66, 51, 33, 46, 44, 40, 30, 27, 20, 23, 19, 13, 10, 11, 8, 9, 6, 0, 7, 8, 5],
    [3554, 241, 296, 221, 206, 152, 147, 121, 109, 108, 99, 91, 80, 80, 58, 48, 56, 51, 43, 37, 34, 27, 24, 24, 16, 13, 12, 9, 9, 6, 0, 7, 8, 8],
    [4586, 311, 428, 277, 206, 200, 165, 145, 162, 142, 129, 114, 101, 101, 78, 65, 63, 70, 46, 43, 41, 35, 27, 26, 18, 14, 17, 14, 12, 6, 1, 7, 10, 8],
    [5806, 393, 537, 332, 352, 237, 206, 178, 240, 177, 168, 132, 120, 128, 87, 82, 87, 80, 49, 59, 45, 39, 31, 29, 20, 17, 21, 14, 15, 8, 1, 7, 12, 9],
    [7153, 520, 599, 389, 422, 297, 238, 202, 286, 207, 202, 156, 144, 153, 100, 96, 101, 91, 57, 80, 60, 47, 32, 35, 23, 18, 26, 17, 29, 9, 1, 7, 13, 10],
    [9074, 604, 661, 463, 493, 340, 262, 225, 333, 231, 236, 183, 159, 177, 111, 104, 116, 99, 63, 95, 64, 56, 41, 40, 27, 21, 28, 23, 38, 9, 1, 7, 14, 10],
    [11177, 683, 724, 521, 566, 408, 300, 246, 391, 254, 271, 212, 179, 193, 127, 113, 128, 109, 70, 118, 70, 66, 48, 51, 34, 24, 31, 31, 46, 13, 1, 8, 15, 10],
    [13522, 797, 829, 593, 675, 480, 337, 270, 476, 282, 308, 228, 194, 208, 139, 126, 142, 117, 79, 155, 74, 74, 60, 55, 35, 29, 34, 42, 56, 15, 1, 8, 15, 10],
    [16678, 870, 895, 661, 764, 530, 366, 298, 548, 301, 341, 253, 205, 233, 150, 135, 165, 122, 89, 190, 81, 81, 67, 57, 42, 32, 34, 54, 64, 17, 1, 10, 18, 11],
    [19665, 944, 954, 711, 851, 591, 389, 343, 600, 321, 373, 274, 215, 254, 168, 157, 173, 128, 100, 227, 89, 90, 69, 62, 46, 36, 40, 59, 69, 18, 1, 10, 21, 11],
    [22112, 1018, 1006, 772, 914, 665, 411, 379, 661, 344, 408, 297, 224, 269, 172, 171, 184, 135, 111, 277, 95, 96, 79, 67, 50, 39, 43, 65, 77, 18, 1, 10, 24, 16],
    [24953, 1075, 1048, 803, 980, 733, 426, 407, 698, 363, 439, 315, 239, 281, 183, 195, 184, 138, 122, 281, 99, 104, 81, 71, 52, 42, 44, 69, 89, 18, 1, 10, 26, 16],
    [27013, 1120, 1075, 838, 1033, 779, 446, 435, 739, 386, 468, 326, 250, 292, 195, 206, 195, 140, 128, 307, 106, 115, 88, 79, 54, 45, 45, 78, 96, 18, 1, 10, 26, 17],
    [29631, 1151, 1092, 879, 1073, 830, 468, 459, 772, 405, 492, 337, 261, 295, 210, 218, 208, 141, 136, 331, 108, 119, 91, 83, 58, 49, 49, 80, 109, 18, 1, 10, 36, 18],
    [31728, 1177, 1117, 912, 1105, 860, 486, 486, 804, 417, 515, 342, 267, 302, 215, 239, 213, 149, 142, 360, 108, 122, 95, 86, 58, 55, 53, 81, 118, 18, 1, 10, 42, 18],

    [33366, 1219, 1131, 946, 1135, 888, 505, 497, 844, 436, 543, 352, 272, 306, 222, 251, 219, 154, 145, 378, 116, 124, 106, 86, 60, 59, 58, 83, 131, 18, 1, 10, 49, 18],
    [47163, 1241, 1145, 968, 1169, 910, 518, 506, 872, 451, 570, 366, 279, 313, 222, 265, 225, 155, 157, 395, 116, 126, 112, 87, 61, 63, 64, 84, 135, 18, 1, 10, 50, 18],
    [51986, 1261, 1155, 988, 1184, 934, 529, 519, 900, 463, 593, 372, 281, 318, 226, 283, 229, 162, 157, 418, 116, 126, 119, 90, 65, 65, 67, 86, 140, 18, 1, 10, 53, 18],
    [54406, 1294, 1162, 1001, 1212, 950, 537, 530, 913, 470, 604, 375, 285, 326, 235, 291, 230, 168, 162, 425, 119, 127, 120, 90, 68, 70, 70, 88, 143, 18, 1, 10, 56, 18],
    [56249, 1316, 1167, 1004, 1231, 962, 544, 537, 925, 481, 617, 380, 287, 328, 237, 300, 232, 169, 162, 445, 120, 128, 122, 90, 70, 71, 70, 89, 144, 18, 1, 10, 56, 18],
    [58182, 1322, 1171, 1006, 1246, 973, 551, 541, 930, 495, 626, 381, 290, 331, 238, 301, 236, 171, 162, 457, 121, 129, 124, 90, 72, 75, 70, 89, 146, 18, 1, 10, 57, 20],
    [59989, 1328, 1172, 1007, 1257, 982, 553, 543, 933, 508, 629, 387, 292, 333, 242, 302, 240, 172, 163, 464, 121, 130, 125, 91, 73, 76, 70, 89, 146, 18, 1, 10, 60, 22],
    [61682, 1331, 1173, 1008, 1261, 986, 555, 544, 933, 514, 631, 393, 293, 333, 244, 306, 240, 172, 163, 470, 121, 131, 128, 91, 75, 76, 71, 90, 146, 18, 1, 10, 62, 22],
    [62457, 1332, 1175, 1010, 1265, 987, 560, 546, 934, 520, 631, 395, 293, 333, 245, 307, 242, 172, 168, 476, 121, 131, 130, 91, 75, 76, 71, 91, 146, 18, 1, 10, 65, 24],
    [63088, 1333, 1215, 1011, 1267, 988, 567, 748, 934, 525, 631, 396, 293, 334, 246, 308, 245, 174, 168, 479, 121, 132, 131, 91, 75, 76, 71, 91, 146, 18, 1, 10, 68, 24],
    [63454, 1339, 1217, 1013, 1270, 989, 572, 750, 934, 526, 631, 399, 293, 334, 249, 309, 245, 174, 168, 479, 121, 132, 133, 91, 75, 76, 71, 91, 146, 18, 1, 10, 68, 26],

    [63889, 1342, 1217, 1016, 1271, 989, 573, 754, 934, 526, 631, 399, 293, 335, 249, 311, 245, 174, 168, 480, 121, 132, 135, 91, 75, 76, 71, 91, 146, 18, 1, 10, 69, 26],
    [64287, 1345, 1217, 1016, 1271, 989, 575, 755, 934, 527, 631, 399, 293, 335, 251, 311, 245, 174, 168, 480, 121, 132, 135, 91, 75, 76, 71, 93, 146, 18, 1, 10, 74, 28],
    [64786, 1347, 1217, 1016, 1271, 989, 576, 755, 934, 529, 631, 400, 294, 335, 252, 311, 245, 174, 168, 480, 121, 133, 135, 91, 75, 76, 71, 93, 146, 18, 1, 10, 81, 30],
    [65187, 1347, 1217, 1016, 1271, 989, 576, 756, 934, 531, 631, 400, 294, 336, 252, 312, 245, 174, 168, 480, 121, 133, 135, 91, 75, 76, 71, 93, 146, 18, 1, 10, 85, 31],
    [65596, 1347, 1217, 1017, 1272, 989, 576, 756, 934, 534, 631, 410, 296, 337, 252, 317, 245, 174, 168, 480, 121, 133, 135, 91, 75, 76, 72, 93, 146, 18, 1, 10, 91, 32],
    [65914, 1348, 1217, 1017, 1272, 990, 576, 756, 935, 538, 631, 410, 296, 337, 252, 318, 245, 174, 168, 480, 121, 133, 136, 91, 75, 76, 72, 93, 146, 18, 1, 10, 93, 32],
    [66337, 1349, 1217, 1018, 1272, 990, 576, 756, 935, 538, 631, 411, 296, 337, 252, 318, 245, 174, 168, 480, 121, 133, 136, 91, 75, 76, 73, 93, 146, 18, 1, 10, 94, 34],
    [66907, 1349, 1217, 1018, 1272, 990, 576, 756, 935, 538, 631, 413, 296, 337, 252, 318, 245, 174, 168, 480, 122, 133, 136, 91, 75, 76, 73, 93, 146, 18, 1, 10, 95, 39],
    [67103, 1350, 1218, 1018, 1272, 990, 576, 758, 935, 538, 631, 414, 296, 337, 252, 318, 245, 174, 168, 480, 122, 133, 136, 91, 75, 76, 74, 93, 146, 18, 1, 10, 98, 40],
    [67217, 1350, 1225, 1018, 1272, 990, 576, 758, 935, 538, 631, 414, 296, 338, 252, 318, 245, 174, 168, 480, 125, 133, 136, 91, 75, 76, 74, 93, 146, 18, 1, 10, 100, 41],
    [67332, 1350, 1225, 1018, 1272, 990, 576, 758, 935, 538, 631, 417, 296, 338, 252, 318, 245, 174, 168, 480, 125, 133, 136, 91, 75, 76, 75, 93, 146, 18, 1, 10, 100, 42],
    [67466, 1350, 1227, 1018, 1272, 990, 576, 758, 935, 539, 631, 418, 296, 338, 252, 318, 245, 174, 168, 481, 125, 133, 136, 91, 75, 76, 75, 93, 146, 18, 1, 10, 104, 42],
    [67592, 1351, 1227, 1018, 1272, 990, 576, 758, 935, 539, 631, 422, 296, 339, 252, 318, 245, 174, 168, 481, 125, 133, 136, 102, 75, 76, 75, 93, 146, 18, 1, 10, 104, 44],
    [67666, 1352, 1227, 1018, 1272, 990, 576, 758, 935, 539, 631, 426, 296, 342, 252, 318, 245, 174, 168, 481, 125, 133, 136, 119, 75, 76, 75, 93, 146, 18, 1, 10, 107, 45],
    [67707, 1352, 1227, 1018, 1272, 990, 576, 758, 935, 539, 631, 428, 296, 342, 252, 318, 245, 174, 168, 481, 125, 133, 136, 120, 75, 76, 75, 93, 146, 18, 1, 10, 109, 45],
    [67743, 1352, 1227, 1018, 1272, 990, 576, 758, 935, 539, 631, 428, 296, 342, 252, 318, 245, 174, 168, 481, 125, 133, 136, 124, 75, 76, 75, 93, 146, 18, 1, 10, 114, 45],
    [67760, 1353, 1227, 1018, 1272, 990, 576, 758, 935, 539, 631, 429, 296, 342, 252, 318, 245, 174, 168, 481, 125, 133, 136, 124, 75, 76, 75, 93, 146, 18, 1, 10, 115, 45],
    [67773, 1353, 1227, 1018, 1272, 990, 576, 759, 935, 539, 631, 435, 296, 344, 252, 318, 245, 174, 168, 482, 125, 133, 136, 125, 75, 76, 75, 93, 146, 18, 1, 10, 120, 47],
    [67781, 1356, 1227, 1018, 1273, 990, 576, 760, 935, 539, 631, 435, 296, 344, 252, 318, 245, 174, 168, 482, 125, 133, 136, 127, 75, 76, 75, 93, 146, 18, 1, 10, 129, 48],
    [67786, 1356, 1227, 1018, 1273, 990, 576, 760, 935, 539, 631, 436, 296, 346, 252, 318, 245, 174, 168, 482, 125, 133, 136, 127, 75, 76, 75, 93, 146, 18, 1, 10, 131, 49],
    [67790, 1356, 1227, 1018, 1273, 990, 576, 760, 935, 539, 631, 437, 296, 350, 252, 318, 245, 174, 168, 482, 125, 133, 136, 129, 75, 76, 75, 93, 146, 18, 1, 10, 137, 50],

    [67794, 1357, 1231, 1018, 1273, 990, 576, 760, 935, 539, 631, 442, 296, 353, 252, 318, 245, 174, 168, 482, 125, 133, 136, 132, 75, 76, 75, 93, 146, 18, 1, 10, 141, 53],
    [67798, 1361, 1231, 1018, 1273, 990, 576, 760, 935, 539, 631, 446, 296, 355, 252, 318, 245, 175, 168, 482, 125, 133, 136, 133, 75, 76, 75, 93, 146, 18, 1, 10, 148, 59],
    [67799, 1364, 1232, 1018, 1273, 990, 576, 761, 935, 539, 631, 455, 296, 358, 253, 318, 246, 176, 168, 482, 125, 133, 136, 133, 75, 76, 75, 93, 146, 18, 1, 11, 157, 67],
    [67800, 1369, 1232, 1018, 1273, 990, 576, 761, 935, 540, 631, 458, 296, 361, 253, 318, 246, 176, 168, 482, 125, 133, 136, 133, 75, 76, 75, 93, 146, 18, 1, 13, 167, 77],
    [67800, 1378, 1233, 1018, 1273, 990, 576, 761, 935, 540, 631, 479, 296, 363, 253, 318, 246, 176, 168, 483, 125, 133, 136, 133, 75, 76, 75, 93, 146, 18, 1, 15, 192, 100],
    [67800, 1392, 1234, 1018, 1273, 990, 576, 762, 935, 541, 631, 485, 299, 371, 254, 318, 247, 176, 168, 484, 126, 133, 137, 134, 75, 76, 75, 93, 146, 18, 1, 17, 208, 108],
    [67800, 1399, 1236, 1018, 1273, 990, 576, 764, 935, 542, 631, 499, 303, 380, 254, 318, 248, 176, 168, 484, 126, 133, 137, 134, 75, 76, 75, 93, 146, 18, 1, 17, 256, 135],
    [67800, 1407, 1237, 1018, 1273, 990, 576, 765, 936, 543, 633, 512, 307, 394, 254, 319, 248, 176, 168, 484, 126, 133, 137, 134, 75, 76, 75, 93, 146, 18, 1, 18, 273, 153],
    [67800, 1413, 1238, 1018, 1274, 990, 577, 767, 936, 543, 633, 522, 313, 404, 254, 319, 248, 176, 168, 484, 127, 133, 137, 136, 75, 76, 75, 93, 146, 18, 1, 21, 317, 169],
    [67801, 1428, 1240, 1018, 1274, 990, 578, 768, 936, 545, 636, 554, 318, 414, 254, 319, 249, 176, 168, 484, 127, 134, 141, 136, 75, 76, 75, 93, 146, 18, 1, 25, 356, 195],
    [67801, 1433, 1241, 1018, 1274, 990, 578, 769, 936, 547, 638, 559, 322, 433, 254, 319, 250, 176, 168, 484, 127, 134, 145, 136, 77, 76, 75, 94, 146, 18, 1, 26, 386, 216],
    [67801, 1444, 1243, 1018, 1275, 990, 578, 769, 936, 547, 640, 565, 328, 451, 254, 319, 253, 178, 168, 484, 127, 135, 147, 136, 89, 76, 75, 95, 146, 18, 1, 30, 410, 235],
    [67801, 1456, 1247, 1018, 1275, 990, 578, 771, 936, 548, 641, 569, 331, 468, 254, 319, 253, 180, 168, 484, 128, 135, 152, 136, 92, 76, 75, 95, 146, 18, 1, 33, 453, 252],
    [67801, 1467, 1251, 1018, 1275, 990, 578, 772, 936, 548, 641, 572, 337, 485, 254, 319, 253, 180, 168, 484, 131, 135, 156, 136, 94, 76, 75, 97, 146, 18, 1, 34, 518, 267],
    [67801, 1475, 1254, 1018, 1276, 990, 579, 772, 937, 550, 644, 576, 338, 492, 254, 319, 253, 180, 168, 484, 134, 136, 163, 136, 95, 76, 75, 98, 147, 18, 1, 37, 582, 283],
    [67801, 1484, 1255, 1018, 1276, 990, 579, 773, 937, 550, 645, 577, 340, 498, 254, 321, 253, 180, 168, 484, 136, 136, 166, 138, 97, 76, 75, 98, 147, 18, 1, 38, 641, 298],
    [67801, 1490, 1257, 1018, 1276, 990, 579, 774, 937, 550, 646, 580, 343, 509, 254, 321, 253, 181, 168, 484, 139, 136, 174, 138, 107, 76, 75, 98, 147, 18, 1, 39, 682, 306],
    [67801, 1490, 1257, 1018, 1276, 990, 579, 774, 937, 550, 646, 580, 343, 509, 254, 321, 253, 181, 168, 484, 139, 136, 174, 138, 107, 76, 75, 98, 147, 18, 1, 39, 682, 306],
    [67802, 1507, 1258, 1019, 1276, 990, 579, 775, 937, 554, 647, 582, 345, 522, 254, 325, 255, 183, 168, 488, 140, 137, 176, 138, 117, 76, 75, 98, 147, 18, 1, 41, 765, 329],
    [67802, 1508, 1258, 1019, 1276, 990, 579, 775, 937, 554, 647, 582, 345, 522, 254, 325, 255, 183, 168, 488, 140, 137, 177, 138, 117, 76, 75, 98, 147, 18, 1, 41, 802, 339]
];

var option = {
    baseOption: {
        timeline: {
            // 时间轴类型time
            axisType: 'category',
            // realtime: false,
            loop: true,
            autoPlay: false,
            // 时间轴自动播放时间间隔
            playInterval: 1000,
            symbolSize: 12,
            left: '15%',
            right: '15%',
            bottom: '0%',
            width: '70%',
            // 控制样式（播放按钮）
            controlStyle: {
                show:false
            },
            lineStyle:{
                show:true,
                color:"#c23531",
                width:2,
                type:"solid",
            },
            // 设置不显示
            itemStyle:{
                opacity:0
            },
            emphasis:{
                // hover效果
                itemStyle:{
                    borderWidth:5,
                    color:'#c23531',
                    borderColor:'rgba(194,53,49, 0.5)'
                }
            },
            data: days,
            tooltip: {
                show:false
            },
        },
        tooltip: {
            show: true
        },
        visualMap: {
            type: 'piecewise',
            pieces: [{
                    min: 1002,
                    color: '#b71c1c'
                },
                {
                    min: 501,
                    max: 1001,
                    color: '#d32f2f'
                },
                {
                    min: 251,
                    max: 500,
                    color: '#e53935'
                },
                {
                    min: 101,
                    max: 250,
                    color: '#e57373'
                },
                {
                    min: 11,
                    max: 100,
                    color: '#ef9a9a'
                },
                {
                    min: 1,
                    max: 10,
                    color: '#ffcdd2'
                },
                {
                    value: 0,
                    color: '#ffebee'
                }
            ],
            orient: 'vertical',
            itemWidth: 25,
            itemHeight: 15,
            showLabel: true,
            // 对应的seris
            seriesIndex: [0],

            textStyle: {
                color: '#333'
            },
            // bottom: '10%',
            // left: "0%",
        },
        // grid组件，用于绘制条形图
        grid: {
            right: '0%',
            top: '20%',
            bottom: '10%',
            width: '20%'
        },
        xAxis: {
            min: 0,
            max: 4000,
            show: false
        },
        yAxis: [{
            inverse: true,
            offset: '2',
            'type': 'category',
            data: '',
            nameTextStyle: {
                color: '#fff'
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                //rotate:45,
                textStyle: {
                    fontSize: 14,
                    color: '#000000',
                },
                interval: 0
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: '#333'
                },
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: '#333'
                }
            },
        }],
        geo: {
            map: 'china',
            right: '35%',
            left: '5%',
            top:'10%',
            bottom:'10%',
            silent:true
        },
        series: [{
                name: 'mapSer',
                type: 'map',
                map: 'china',
                roam: false,
                geoIndex: 0,
                label: {
                    show: false,
                },
            },
            {
                'name': '',
                'type': 'bar',
                zlevel: 2,
                barWidth: '40%',
                label: {
                    normal: {
                        show: true,
                        fontSize: 14,
                        position: 'right',
                        formatter: '{c}'
                    }
                },
            }
        ],

    },
    animationDurationUpdate: 1000,
    animationEasingUpdate: 'quinticInOut',
    options: []
};

class ScatterMap extends React.Component {
    componentDidMount() {
        this.initalECharts();
    }

    componentWillUpdate() {
        if (this.myChart) {
            this.myChart.resize('auto', 'auto')
        }
    }

    initalECharts() {
        echarts.registerMap('china', geoJson);
        this.myChart = echarts.init(document.getElementById('mainMap'));
        for (var n = 0; n < days.length; n++) {
            var res = [];
            for (var j = 0; j < data[n].length; j++) {
                res.push({
                    name: province[j],
                    value: data[n][j]
                });
            }
            res.sort(function(a, b) {
                return b.value - a.value;
            }).slice(0, 6);
        
            res.sort(function(a, b) {
                return a.value - b.value;
            });
            var res1 = [];
            var res2 = [];
            for (var t = 0; t < 10; t++) {
                res1[t] = res[res.length - 1 - t].name;
                res2[t] = res[res.length - 1 - t].value;
            }
            console.log(res)
            console.log(res1);
            console.log(res2);
            console.log(province);
            option.options.push({
                title: [{
                        text: days[n] + "日 感染人数与航班数量",
                        textStyle: {
                            color: '#2D3E53',
                            fontSize: 28
                        },
                        left: 20,
                        top: 20,
                    },{
                        show: true,
                        text: '感染人数排行',
                        textStyle: {
                            color: '#2D3E53',
                            fontSize: 18
                        },
                        right: '10%',
                        top: '15%'
                    }
                ],
                yAxis: {
                    data: res1,
                },
                series: [
                {
                    type: 'map',
                    data: res
                }, {
                    type: 'bar',
                    data: res2,
                    itemStyle: {
                        normal: {
                            color: function(params) {
                                // build a color map as your need.
                                var colorList = [{
                                        colorStops: [{
                                            offset: 0,
                                            color: '#FF0000' // 0% 处的颜色
                                        }, {
                                            offset: 1,
                                            color: '#990000' // 100% 处的颜色
                                        }]
                                    },
                                    {
                                        colorStops: [{
                                            offset: 0,
                                            color: '#00C0FA' // 0% 处的颜色
                                        }, {
                                            offset: 1,
                                            color: '#2F95FA' // 100% 处的颜色
                                        }]
                                    }
                                ];
                                if (params.dataIndex < 3) {
                                    return colorList[0]
                                } else {
                                    return colorList[1]
                                }
                            },
                        }
                    },
                },{
                    name: '航班起降数',
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data:convertData(cityArray),
                    cursor:'pointer',
                    symbolSize:(value,params)=>{
                        // 保证最小大小为5
                        return 10+value[2]
                    },
                    itemStyle:{
                        color:'rgba(220,20,60,1)',
                        borderColor:"#fff",
                        borderWidth:2
                    },
                    tooltip:{
                        formatter:(params)=>{
                            // console.log(params)
                            return `${params.data.name} <br/> 航班数量: ${params.value[2]}`
                        }
                    }
                }]
            });
        }
        this.myChart.setOption(option)
    }

    render() {
        return (
            <div id="mainMap" style={{ width: '70vw', height: '70vh',margin:'auto' }} ></div>
        );
    }
}

const CoronaLineNumber = () => {
    // const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [chartName, setChartName] = useState("")
    useEffect(() => {
        
    }, [])

    // const onFormSubmit = (queryData) => {
    //     console.log(queryData)
    //     setLoading(true)
    //     setTimeout(()=>{
    //         setLoading(false)
    //         setChartName(`${queryData.month} 各市航班起降数量`)
    //     },1000)
    // }

    return (
        <div className="ab-page-header-wrapper">
            <PageHeader title="航班数量变化" routes={routes} />
            <div className="ab-container">
                <div className="ab-content-container">
                    <Skeleton loading={loading} active>
                        <div className="ab-chart-title">{chartName}</div>
                        <ScatterMap/>
                    </Skeleton>
                </div>
            </div>
        </div>
    );
}

export default CoronaLineNumber;

