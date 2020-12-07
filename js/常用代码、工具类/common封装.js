/*
 * Ajax请求封装
 * ysAjax.post
 * ysAjax.ajax
 * 
 * 
 */
//


var api = 'http://183.61.61.25:8080/';
//
// var api = 'http://120.77.170.209:8080/';

sessionStorage.setItem("schoolFkCode", sessionStorage.getItem('schFkCode')); //学校ID

//获取用户的code和name
var userName = sessionStorage.getItem("userName");
var userFkCode = sessionStorage.getItem("userFkCode");
var ysAjax = $.extend({}, {
    api: 'http://183.61.61.25:8080',
    ajax: function (url, data, dataType, callback) {
        $.ajax({
            type: "post",
            url: api + url,
            data: JSON.stringify(data),
            contentType: 'application/json',
            dataType: dataType,
            success: function (results) {
                callback(results)
                // console.log(results);
            }
        });
    },
    postUpload: function (url, data, callback) {
        $.ajax({
            url: api + url,
            type: 'POST',
            data: data,
            contentType: false,
            processData: false,
            success: function (res) {
                callback(res)
            },
            error: function (data) {
                callback(data.status);
            }
        });
    },
    post: function (url, data, dataType, callback) {
        $.ajax({
            type: "post",
            url: api + url + "?" + data,
            contentType: 'application/json',
            dataType: dataType,
            success: function (results) {
                callback(results)
                // console.log(results);
            }
        });
    },
    get: function (url, data, dataType, callback) {
        $.ajax({
            type: 'get',
            url: api + url + "?" + data,
            dataType: dataType,
            success: function (res) {
                callback(res)
            }
        })
    },
    get2: function (url, data, dataType, callback) {
        $.ajax({
            type: 'get',
            url: api + url,
            data: data,
            // data: JSON.stringify(data),
            dataType: dataType,
            success: function (res) {
                callback(res)
            }
        })
    },
    get3: function (url, dataType, callback) {
        $.ajax({
            type: 'get',
            url: api + url,
            // data: JSON.stringify(data),
            dataType: dataType,
            success: function (res) {
                callback(res)
            }
        })
    },
    //get请求本地art-template模板
    getTemplate: function (url, callback) {
        $.ajax({
            type: "get",
            url: url,
            success: function (res) {
                callback(res)
            }
        });
    },
    patch: function (url, data, dataType, callback) {
        $.ajax({
            type: "DELETE",
            url: api + url + "?" + data,
            contentType: 'application/json',
            dataType: dataType,
            success: function (results) {
                callback(results)
                // console.log(results);
            }
        });
    },
    common: function (type, url, dataType, callback) {
        $.ajax({
            type: type,
            url: api + url,
            // data: JSON.stringify(data),
            dataType: dataType,
            success: function (res) {
                callback(res)
            }
        })
    },
    initTable: function (ele, url, data, callback, columns) {
        $(ele).bootstrapTable('destroy');
        $(ele).bootstrapTable('refresh');
        $(ele).bootstrapTable({
            method: 'POST',
            dataType: 'json',
            contentType: "application/json",
            cache: false, //是否缓存
            striped: true, //是否显示行间隔色
            sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
            url: api + url, //服务器地址
            pagination: true,
            queryParams: queryParams, // 请求条件
            silent: true,
            pageNumber: 1, //初始化加载第一页，默认第一页
            pageSize: 10, //单页记录数
            pageList: [10, 20, 50], //可供选择的每页的行数（*）
            uniqueId: "id", //每一行的唯一标识，一般为主键列
            sortable: false,
            formatNoMatches: function () { //没有匹配的结果  
                return '无符合条件的记录';
            },
            columns: columns,
            locale: 'zh-CN', //中文支持,
            responseHandler: function (res) {
                var results = callback(res);
                if (res.data) {
                    if ($(ele).parents().is('.modal') == true) {
                        $('.modal').on('shown.bs.modal', function () {
                            return {
                                "rows": results,
                                "total": (res.data.totalCount == undefined ? res.data.page.totalCount : res.data.totalCount)
                            };
                        })
                    }
                    return {
                        "rows": results,
                        "total": (res.data.totalCount == undefined ? res.data.page.totalCount : res.data.totalCount)
                    };
                } else {
                    return {
                        "rows": [],
                        "total": 0
                    };
                }
                $(ele).bootstrapTable('refresh'); //刷新表格  
            }
        });


        function queryParams(params) {
            var datas = {
                pageNo: this.pageNumber,
                pageSize: this.pageSize
            }
            var params = Object.assign(datas, data);
            return JSON.stringify(params);
        }
    },
    initTableBig: function (ele, url, data, callback, height) {
        $(ele).bootstrapTable('refresh'); //刷新表格
        // $(ele).bootstrapTable('destroy');
        $(ele).bootstrapTable({
            method: 'POST',
            dataType: 'json',
            contentType: "application/json",
            cache: false, //是否缓存
            striped: true, //是否显示行间隔色
            sidePagination: "server", //分页方式：client客户端分页，server服务端分页（*）
            url: api + url, //服务器地址
            pagination: true,
            queryParams: queryParams, // 请求条件
            silent: true,
            pageNumber: 1, //初始化加载第一页，默认第一页
            pageSize: 100, //单页记录数
            pageList: [100, 200, 500, 1000], //可供选择的每页的行数（*）
            uniqueId: "id", //每一行的唯一标识，一般为主键列
            sortable: false,
            height: height,
            locale: 'zh-CN', //中文支持,
            responseHandler: function (res) {
                var results = callback(res);
                if (res) {
                    if ($(ele).parents().is('.modal') == true) {
                        $('.modal').on('shown.bs.modal', function () {
                            return {
                                "rows": results,
                                "total": res.data.totalCount
                            };
                        })
                    }
                    return {
                        "rows": results,
                        "total": res.data.totalCount
                    };

                } else {
                    return {
                        "rows": [],
                        "total": 0
                    };
                }
            }
        });


        function queryParams(params) {
            var datas = {
                pageNo: this.pageNumber,
                pageSize: this.pageSize
            }
            var params = Object.assign(datas, data);
            return JSON.stringify(params);
        }
    },
    formSubmit: function (FormID, url, callback) {
        $(FormID).on('submit', function () {
            var data = new FormData($(FormID)[0])
            console.log(data)
            $.ajax({
                url: api + url,
                type: 'POST',
                data: data,
                contentType: false,
                processData: false,
                success: function (res) {
                    if (res.code == "OK") {
                        callback(res)
                    }
                    console.log(res);
                },
                error: function (data) {
                    console.log(data.status);
                }
            });
            return false;
        });
    },
    initlayDate: function (ele, themeColor, TriggerType, showBottom, type, format) {
        lay(ele).each(function () {
            laydate.render({
                elem: this,
                theme: themeColor,
                type: type,
                format: format,
                trigger: TriggerType,
                showBottom: showBottom
            });
        });
    }
});
var UtilFun = $.extend({}, {
    confimLog: function (content, title, callBack) {
        layer.confirm(content, {
            title: title,
            btn: ['确定', '取消'], //按钮
            move: false,
            area: ['520px', '260px'],
            btnAlign: 'c'
        }, function () {
            callBack();
        });
    },
    successMsg: function (content) {
        layer.msg(content, {
            icon: 1,
            move: false,
            shade: 0.3,
            time: 1000
        });
    },
    FailureMsg: function (content) {
        layer.msg(content, {
            icon: 2,
            move: false,
            shade: 0.3,
            time: 1000
        });
    }
})

// 格式化之间
// 年-月-日 hh:mm:ss
Date.prototype.yymmddhhmmss = function (str) {
    return this.getFullYear() + str + (this.getMonth() + 1) + str + this.getDate() + " " + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
};
Date.prototype.yymmddhhmm = function (str) {
    return this.getFullYear() + str + ((this.getMonth() + 1).toString().length <= 1 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1)) + str + (this.getDate().toString().length <= 1 ? "0" + this.getDate() : this.getDate()) + " " + (this.getHours().toString().length <= 1 ? "0" + this.getHours() : this.getHours()) + ":" + (this.getMinutes().toString().length <= 1 ? "0" + this.getMinutes() : this.getMinutes())
};
Date.prototype.NEWDate = function (str) {
    return this.getFullYear() + String(str[0]) + (this.getMonth() + 1) + String(str[1]) + this.getDate() + String(str[2])
};

// 年-月-日
Date.prototype.yymmdd = function (str) {
    return this.getFullYear() + str + ((this.getMonth() + 1).toString().length <= 1 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1)) + str + (this.getDate().toString().length <= 1 ? "0" + this.getDate() : this.getDate());
};
Date.prototype.yy = function () {
    return this.getFullYear()
};

// 给数组增加一个删除特定元素的方法
/**
 *
 * @param val  需要删除的元素；
 */
Array.prototype.removeByValue = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
}

//数组去重
Array.prototype.unique1 = function () {
    var res = [this[0]];
    for (var i = 1; i < this.length; i++) {
        var repeat = false;
        for (var j = 0; j < res.length; j++) {
            if (this[i] == res[j]) {
                repeat = true;
                break;
            }
        }
        if (!repeat) {
            res.push(this[i]);
        }
    }
    return res;
}

//求两个数组的差集
Array.prototype.diff = function (arr) {
    return this.filter(function (i) {
        return arr.indexOf(i) < 0;
    });
}

// 弹窗提示
function autoSuccessBox(str, num, time, callBack) {
    layer.msg(str, {
        icon: num,
        time: time //2秒关闭（如果不配置，默认是3秒）
    }, callBack)
}

function infoBox(titStr, contentStr, btnArr, callBack) {
    layer.open({
        title: titStr,
        content: contentStr,
        btn: btnArr,
        yes: function (index, layero) {
            callBack()
            layer.close(index)
        }
    })
}
$(function () {
    $('.topNav').on('click', 'li', function () {
        switch ($(this).find('a').text()) {
            case '基础设置':
                location.href = '../../html/baseInfo/baseInfo-basePage.html';
                break;
            case '协同办公':
                location.href = '../../html/collaborativeOffice/collaborativeOffice-page.html';
                break;
            case '校务管理':
                location.href = '../../html/school_management/school_managementPage.html';
                break;
            case '教务管理':
                location.href = '../../html/EducationalManagement/EducationalManagementPage.html'
                break;
            case '教师发展':
                location.href = '../../html/teacher_development/teacher_developmentPage.html';
                break;
            case '学生成长':
                location.href = '../../html/students_growth/students_growthPage.html';
                break;
            case '后勤管理':
                location.href = '../../html/logistics_management/logistics_managementPage.html';
                break;
            case '数据统计':
                location.href = '../../html/dataStatistics/dataStatisticsPage.html';
                break;
        }
    })
    if (typeof $().bootstrapSwitch != 'undefined' && $().bootstrapSwitch instanceof Function) {
        $('.dropdown-menu').find('.head-list').append('<li><a href="javascript:void(0);"><i class="ys-pli-mail icon-lg icon-fw"></i>DEMO:&nbsp;<input type="checkbox" name="my-checkbox"></a></li>');
        var stat = sessionStorage.getItem('states');
        if (stat == null) {
            sessionStorage.setItem('states', false);
        }
        stat = sessionStorage.getItem('states');
        if (stat == "true") {
            stat = Boolean(stat);
            $($('.topNav').find('li')[4]).css('display', 'block');
            $($('.topNav').find('li')[6]).css('display', 'block');
            $('.App_container').find('.front').find('.media-heading').not('.comingSoon').each(function (i, e) {
                $(e).parent().parent().parent().css('visibility', 'visible');
            })
        } else {
            stat = !Boolean(stat);
            $($('.topNav').find('li')[4]).css('display', 'none');
            $($('.topNav').find('li')[6]).css('display', 'none');
            ysAjax.get('view/global/select', '节点名称=' + $('.topNav').find('li.active').find('a').text(), 'json', function (res) {
                console.log(res)
                switch ($('.topNav').find('li.active').find('a').text()) {
                    case '基础设置':
                        var arr = [];
                        if (res.data.length > 1) {
                            for (var i = 0; i < res.data.length; i++) {
                                arr = res.data[0].thirdNodes.concat(res.data[2].thirdNodes);
                                arr = arr.concat(res.data[1].thirdNodes);
                            }
                        } else {
                            arr = res.data[0].thirdNodes
                        }
                        var arr12 = arr[12];
                        arr[12] = arr[15];
                        arr[15] = arr12;
                        var arr13 = arr[13];
                        arr[13] = arr[14];
                        arr[14] = arr13;
                        $('.App_container').find('.front').find('.media-heading').not('.comingSoon').each(function (i, e) {
                            console.log(arr[i])
                            if (arr[i].thirdNode == $(e).text() && arr[i].status == 1) {
                                $(e).parent().parent().parent().css('visibility', 'visible');
                            } else {
                                $(e).parent().parent().parent().css('display', 'none');
                            }
                        })
                        break;
                    case '协同办公':
                        oneArr = res.data[0].thirdNodes.splice(5, 1);
                        twoArr = res.data[0].thirdNodes.splice(4, 1);
                        threeArr = res.data[0].thirdNodes.splice(2, 1)

                        // console.log(res.data[0].thirdNodes)
                        res.data[0].thirdNodes.splice(1, 0, oneArr[0]);
                        res.data[0].thirdNodes.splice(2, 0, twoArr[0]);
                        res.data[0].thirdNodes.splice(3, 0, threeArr[0]);
                        var arr = [];
                        if (res.data.length > 1) {
                            for (var i = 0; i < res.data.length; i++) {
                                arr = res.data[0].thirdNodes.concat(res.data[1].thirdNodes);
                                console.log(arr)
                            }
                        } else {
                            arr = res.data[0].thirdNodes;
                        }
                        $('.App_container').find('.front').find('.media-heading').not('.comingSoon').each(function (i, e) {
                            if (arr[i].thirdNode == $(e).text() && arr[i].status == 1) {
                                $(e).parent().parent().parent().css('visibility', 'visible');
                            } else {
                                $(e).parent().parent().parent().css('visibility', 'hidden');
                            }
                        })
                        break;
                    case '校务管理':
                        oneArr = res.data[0].thirdNodes.splice(4, 1);
                        console.log(oneArr)
                        // twoArr = res.data[0].thirdNodes.splice(4, 1);
                        // threeArr = res.data[0].thirdNodes.splice(2, 1)
                        console.log(res.data[0].thirdNodes)
                        res.data[0].thirdNodes.splice(2, 0, oneArr[0]);
                        var arr = [];
                        if (res.data.length > 1) {
                            for (var i = 0; i < res.data.length; i++) {
                                arr = res.data[0].thirdNodes.concat(res.data[1].thirdNodes);
                            }
                        } else {
                            arr = res.data[0].thirdNodes
                        }
                        $('.App_container').find('.front').find('.media-heading').not('.comingSoon').each(function (i, e) {
                            if (arr[i].thirdNode == $(e).text() && arr[i].status == 1) {
                                $(e).parent().parent().parent().css('visibility', 'visible');
                            } else {
                                $(e).parent().parent().parent().css('visibility', 'hidden');
                            }
                        })
                        break;
                    case '教务管理':
                        var arr = [];
                        if (res.data.length > 1) {
                            for (var i = 0; i < res.data.length; i++) {
                                arr = res.data[0].thirdNodes.concat(res.data[1].thirdNodes);
                            }
                        } else {
                            arr = res.data[0].thirdNodes
                        }
                        $('.App_container').find('.front').find('.media-heading').not('.comingSoon').each(function (i, e) {
                            if (arr[i].thirdNode == $(e).text() && arr[i].status == 1) {
                                $(e).parent().parent().parent().css('visibility', 'visible');
                            } else {
                                $(e).parent().parent().parent().css('visibility', 'hidden');
                            }
                        })
                        break;
                    case '教师发展':
                        var arr = [];
                        if (res.data.length > 1) {
                            for (var i = 0; i < res.data.length; i++) {
                                arr = res.data[0].thirdNodes.concat(res.data[1].thirdNodes);
                            }
                        } else {
                            arr = res.data[0].thirdNodes
                        }
                        $('.App_container').find('.front').find('.media-heading').not('.comingSoon').each(function (i, e) {
                            console.log(arr)
                            if (arr[i].thirdNode == $(e).text() && arr[i].status == 1) {
                                $(e).parent().parent().parent().css('visibility', 'visible');
                            } else {
                                $(e).parent().parent().parent().css('visibility', 'hidden');
                            }
                        })
                        break;
                    case '学生成长':
                        var arr = [];
                        if (res.data.length > 1) {
                            for (var i = 0; i < res.data.length; i++) {
                                arr = res.data[0].thirdNodes.concat(res.data[1].thirdNodes);
                            }
                        } else {
                            arr = res.data[0].thirdNodes
                        }
                        $('.App_container').find('.front').find('.media-heading').not('.comingSoon').each(function (i, e) {
                            if (arr[i].thirdNode == $(e).text() && arr[i].status == 1) {
                                $(e).parent().parent().parent().css('visibility', 'visible');
                            } else {
                                $(e).parent().parent().parent().css('visibility', 'hidden');
                            }
                        })
                        break;
                    case '后勤管理':
                        var arr = [];
                        if (res.data.length > 1) {
                            for (var i = 0; i < res.data.length; i++) {
                                arr = res.data[0].thirdNodes.concat(res.data[1].thirdNodes);
                            }
                        } else {
                            arr = res.data[0].thirdNodes
                        }
                        $('.App_container').find('.front').find('.media-heading').not('.comingSoon').each(function (i, e) {
                            console.log(arr)
                            if (arr[i].thirdNode == $(e).text() && arr[i].status == 1) {
                                $(e).parent().parent().parent().css('visibility', 'visible');
                            } else {
                                $(e).parent().parent().parent().css('visibility', 'hidden');
                            }
                        })
                        break;
                    case '数据统计':
                        // var arr = [];
                        // if (res.data.length > 1) {
                        //     for (var i = 0; i < res.data.length; i++) {
                        //         arr = res.data[0].thirdNodes.concat(res.data[1].thirdNodes);
                        //     }
                        // } else {
                        //     arr = res.data[0].thirdNodes
                        // }
                        // $('.App_container').find('.front').find('.media-heading').not('.comingSoon').each(function (i, e) {
                        //     console.log(arr)
                        //     if (arr[i].thirdNode == $(e).text() && arr[i].status == 1) {
                        //         $(e).parent().parent().parent().css('visibility', 'visible');
                        //     } else {
                        //         $(e).parent().parent().parent().css('visibility', 'hidden');
                        //     }
                        // })
                        break;
                }

            })

        }
        $("[name='my-checkbox']").bootstrapSwitch({
            state: stat,
            size: 'mini',
            onColor: "primary",
            offColor: "warning",
            onSwitchChange: function (event, state) {
                sessionStorage.setItem('states', state);
                if (state == true) {
                    $($('.topNav').find('li')[4]).css('display', 'block');
                    $($('.topNav').find('li')[6]).css('display', 'block');
                    $('.App_container').find('.front').find('.media-heading').not('.comingSoon').each(function (i, e) {
                        $(e).parent().parent().parent().css('visibility', 'visible');
                    })
                } else {
                    $($('.topNav').find('li')[4]).css('display', 'none');
                    $($('.topNav').find('li')[6]).css('display', 'none');
                    ysAjax.get('view/global/select', '节点名称=' + $('.topNav').find('li.active').find('a').text(), 'json', function (res) {
                        console.log(res)
                        switch ($('.topNav').find('li.active').find('a').text()) {
                            case '基础设置':
                                var arr = [];
                                if (res.data.length > 1) {
                                    for (var i = 0; i < res.data.length; i++) {
                                        // arr = res.data[0].thirdNodes.concat(res.data[1].thirdNodes);
                                        arr = res.data[0].thirdNodes.concat(res.data[2].thirdNodes);
                                        arr = arr.concat(res.data[1].thirdNodes);
                                    }
                                } else {
                                    arr = res.data[0].thirdNodes
                                }
                                var arr12 = arr[12];
                                arr[12] = arr[15];
                                arr[15] = arr12;
                                var arr13 = arr[13];
                                arr[13] = arr[14];
                                arr[14] = arr13;
                                console.log(arr)
                                $('.App_container').find('.front').find('.media-heading').not('.comingSoon').each(function (i, e) {
                                    if (arr[i].thirdNode == $(e).text() && arr[i].status == 1) {
                                        $(e).parent().parent().parent().css('visibility', 'visible');
                                    } else {
                                        $(e).parent().parent().parent().css('display', 'none');
                                    }
                                })
                                break;
                            case '协同办公':
                                oneArr = res.data[0].thirdNodes.splice(5, 1);
                                twoArr = res.data[0].thirdNodes.splice(4, 1);
                                threeArr = res.data[0].thirdNodes.splice(2, 1)
                                console.log(res.data[0].thirdNodes)
                                res.data[0].thirdNodes.splice(1, 0, oneArr[0]);
                                res.data[0].thirdNodes.splice(2, 0, twoArr[0]);
                                res.data[0].thirdNodes.splice(3, 0, threeArr[0]);
                                var arr = [];
                                if (res.data.length > 1) {
                                    for (var i = 0; i < res.data.length; i++) {
                                        arr = res.data[0].thirdNodes.concat(res.data[1].thirdNodes);

                                    }
                                } else {
                                    arr = res.data[0].thirdNodes;
                                }
                                $('.App_container').find('.front').find('.media-heading').not('.comingSoon').each(function (i, e) {
                                    // console.log(arr)
                                    if (arr[i].thirdNode == $(e).text() && arr[i].status == 1) {
                                        $(e).parent().parent().parent().css('visibility', 'visible');

                                    } else {
                                        $(e).parent().parent().parent().css('visibility', 'hidden');
                                    }
                                })
                                break;
                            case '校务管理':
                                var arr = [];
                                if (res.data.length > 1) {
                                    for (var i = 0; i < res.data.length; i++) {
                                        arr = res.data[0].thirdNodes.concat(res.data[1].thirdNodes);
                                    }
                                } else {
                                    arr = res.data[0].thirdNodes
                                }
                                $('.App_container').find('.front').find('.media-heading').not('.comingSoon').each(function (i, e) {
                                    console.log(arr)
                                    if (arr[i].thirdNode == $(e).text() && arr[i].status == 1) {
                                        $(e).parent().parent().parent().css('visibility', 'visible');
                                    } else {
                                        $(e).parent().parent().parent().css('visibility', 'hidden');
                                    }
                                })
                                break;
                            case '教务管理':
                                var arr = [];
                                if (res.data.length > 1) {
                                    for (var i = 0; i < res.data.length; i++) {
                                        arr = res.data[0].thirdNodes.concat(res.data[1].thirdNodes);
                                    }
                                } else {
                                    arr = res.data[0].thirdNodes
                                }
                                $('.App_container').find('.front').find('.media-heading').not('.comingSoon').each(function (i, e) {
                                    console.log(arr)
                                    if (arr[i].thirdNode == $(e).text() && arr[i].status == 1) {
                                        $(e).parent().parent().parent().css('visibility', 'visible');
                                    } else {
                                        $(e).parent().parent().parent().css('visibility', 'hidden');
                                    }
                                })
                                break;
                            case '教师发展':
                                var arr = [];
                                if (res.data.length > 1) {
                                    for (var i = 0; i < res.data.length; i++) {
                                        arr = res.data[0].thirdNodes.concat(res.data[1].thirdNodes);
                                    }
                                } else {
                                    arr = res.data[0].thirdNodes
                                }
                                $('.App_container').find('.front').find('.media-heading').not('.comingSoon').each(function (i, e) {
                                    console.log(arr)
                                    if (arr[i].thirdNode == $(e).text() && arr[i].status == 1) {
                                        $(e).parent().parent().parent().css('visibility', 'visible');
                                    } else {
                                        $(e).parent().parent().parent().css('visibility', 'hidden');
                                    }
                                })
                                break;
                            case '学生成长':
                                var arr = [];
                                if (res.data.length > 1) {
                                    for (var i = 0; i < res.data.length; i++) {
                                        arr = res.data[0].thirdNodes.concat(res.data[1].thirdNodes);
                                    }
                                } else {
                                    arr = res.data[0].thirdNodes
                                }
                                $('.App_container').find('.front').find('.media-heading').not('.comingSoon').each(function (i, e) {
                                    console.log(arr)
                                    if (arr[i].thirdNode == $(e).text() && arr[i].status == 1) {
                                        $(e).parent().parent().parent().css('visibility', 'visible');
                                    } else {
                                        $(e).parent().parent().parent().css('visibility', 'hidden');
                                    }
                                })
                                break;
                            case '后勤管理':
                                var arr = [];
                                if (res.data.length > 1) {
                                    for (var i = 0; i < res.data.length; i++) {
                                        arr = res.data[0].thirdNodes.concat(res.data[1].thirdNodes);
                                    }
                                } else {
                                    arr = res.data[0].thirdNodes
                                }
                                $('.App_container').find('.front').find('.media-heading').not('.comingSoon').each(function (i, e) {
                                    console.log(arr)
                                    if (arr[i].thirdNode == $(e).text() && arr[i].status == 1) {
                                        $(e).parent().parent().parent().css('visibility', 'visible');
                                    } else {
                                        $(e).parent().parent().parent().css('visibility', 'hidden');
                                    }
                                })
                                break;
                            case '数据统计':
                                // var arr = [];
                                // if (res.data.length > 1) {
                                //     for (var i = 0; i < res.data.length; i++) {
                                //         arr = res.data[0].thirdNodes.concat(res.data[1].thirdNodes);
                                //     }
                                // } else {
                                //     arr = res.data[0].thirdNodes
                                // }
                                // $('.App_container').find('.front').find('.media-heading').not('.comingSoon').each(function (i, e) {
                                //     console.log(arr)
                                //     if (arr[i].thirdNode == $(e).text() && arr[i].status == 1) {
                                //         $(e).parent().parent().parent().css('visibility', 'visible');
                                //     } else {
                                //         $(e).parent().parent().parent().css('visibility', 'hidden');
                                //     }
                                // })
                                break;
                        }

                    })




                }
            }
        });
    } else {
        console.log('hello world!');
    }


})