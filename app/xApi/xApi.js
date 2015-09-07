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
        subscriptions.push(eventManager.subscribeForEvent(eventManager.events.learningPathFinished).then(onLearningPathFifnished));
    }

    function stopReporting() {
        _.each(subscriptions, function (subscription) {
            if (!_.isNullOrUndefined(subscription && subscription.off)) {
                subscription.off();
            }
        });
    }

    function onLearningPathStarted() {
        
    }

    function onLearningPathFifnished() {
        
    }
});