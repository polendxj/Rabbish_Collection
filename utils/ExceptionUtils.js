/**
 * Created by Administrator on 2016/11/2.
 */
var CatchUncaughtException = function (func, resp) {
    try {
        func()
    } catch (e) {
        if (resp) {
            resp.send({message: '出现未知错误....'})
        }
        logger.error(e.stack)
    }
}

var CatchNot200Exception = function (res, data, resp) {
    if (res.status == 200) {
        console.log(res.url + ',' + res.status + ',' + res.statusText + ',data:' + data)
        if (res.url.indexOf('loginForm') >= 0) {
            return {message: '会话过期，请重新登录...'}
        } else {
            return res.json();
        }

    } else {
        logger.error(res.url + ',' + res.status + ',' + res.statusText + ',data:' + data)
        return false;
    }
}

var CatchNotFalseException = function (json, resp, callback) {
    if (!json) {
        resp.send({message: '出现未知错误....'})
    } else if (callback) {
        callback(json)
    } else {
        resp.send(json)
    }
}

var ObjArrSort =function (name) {
    return function (o, p) {
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            a = o[name];
            b = p[name];
            if (a === b) {
                return 0;
            }
            if (typeof a === typeof b) {
                return a < b ? -1 : 1;
            }
            return typeof a < typeof b ? -1 : 1;
        }
        else {
            throw ("error");
        }

    }

}

module.exports.uncaughtException = CatchUncaughtException
module.exports.not200Exception = CatchNot200Exception
module.exports.notFalseException = CatchNotFalseException
module.exports.ObjArrSort = ObjArrSort