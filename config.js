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

httpEndpoint.userDetails = {
    "getUsers"     : {"action": "get"},
    "detailUser"   : {"action": "detail"},
    "DeleteUser"   : {"action": "delete"},
    "updateUser"   : {"action": "update"},
    "addUser"      : {"action": "new"},
}

httpEndpoint.portfolio = {
    "getPortfolios"     : {"action": "get"},
    "detailPortfolio"   : {"action": "detail"},
    "DeletePortfolio"   : {"action": "delete"},
    "updatePortfolio"   : {"action": "update"},
    "addPortfolio"      : {"action": "new"},
}

exports.httpEndpoint = httpEndpoint;