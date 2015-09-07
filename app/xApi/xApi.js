define(['templateSettings', 'data/dataContext', 'eventManager'], function (templateSettings, dataContext, eventManager) {

    var actor = null;
    var activity = null;
    var subscriptions = [];

    var xApi = {
        startReporting: startReporting,
        stopReporting: stopReporting
    }

    return xApi;

    function startReporting(name, email) {
        // configure xapi wrapper to use specified lrs.
        var lrsConfiguration = {
            endpoint: templateSettings.xApi.lrs.uri,
            user: templateSettings.xApi.lrs.credentials.username,
            password: templateSettings.xApi.lrs.credentials.password
        };

        ADL.XAPIWrapper.changeConfig(lrsConfiguration);

        // initialize actor for current learner. Will be used for all statements.
        actor = new ADL.XAPIStatement.Agent('mailto:' + email, name);

        // initialize activity for current learnerer path. Will be used for all statements.
        activity = new ADL.XAPIStatement.Activity(document.URL.replace(/#.*$/, ""), dataContext.learningPath.title);

        // subscribe for learner path events
        subscriptions.push(eventManager.subscribeForEvent(eventManager.events.learningPathStarted).then(onLearningPathStarted));
        subscriptions.push(eventManager.subscribeForEvent(eventManager.events.learningPathFinished).then(onLearningPathFinished));
    }

    function stopReporting() {
        _.each(subscriptions, function (subscription) {
            if (!_.isNullOrUndefined(subscription && subscription.off)) {
                subscription.off();
            }
        });
    }

    function onLearningPathStarted() {
        var startedVerb = new ADL.XAPIStatement.Verb("http://adlnet.gov/expapi/verbs/launched", "started");
        var startedStatement = new ADL.XAPIStatement(actor, startedVerb, activity);
        sendStatementIfAllowed(startedStatement);
    }

    function onLearningPathFinished() {
        var finishedVerb = new ADL.XAPIStatement.Verb("http://adlnet.gov/expapi/verbs/exited", "stopped");
        var finishedStatement = new ADL.XAPIStatement(actor, finishedVerb, activity);
        sendStatementIfAllowed(finishedStatement);
    }

    function sendStatementIfAllowed(statement) {
        if (_.contains(templateSettings.xApi.allowedVerbs, statement.verb.display["en-US"])) {
            ADL.XAPIWrapper.sendStatement(statement);
        }
    }

});