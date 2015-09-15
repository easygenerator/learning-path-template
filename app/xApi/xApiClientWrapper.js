define([], function () {

    function sendStatement(statement) {
        var defer = Q.defer();
        ADL.XAPIWrapper.sendStatement(statement, function (response, returnedStatement) {
            if (response.status >= 200 && response.status <= 204) {
                defer.resolve(returnedStatement);
            }
            defer.reject(response, returnedStatement);
        });
        return defer.promise;
    }

    return {
        sendStatement: sendStatement
    }

});