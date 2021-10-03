const httpEndpoint = {};

httpEndpoint.news = {
    "getNews"      : {"action": "get"},
    "detailNews"   : {"action": "detail"},
    "deleteNews"   : {"action": "delete"},
    "updateNews"   : {"action": "update"},
    "addNews"      : {"action": "new"},
}

httpEndpoint.siteSettings = {
    "getSettings"     : {"action": "get"},
    "detailSetting"   : {"action": "detail"},
    "DeleteSetting"   : {"action": "delete"},
    "updateSetting"   : {"action": "update"},
    "addSetting"      : {"action": "new"},
}

exports.httpEndpoint = httpEndpoint;