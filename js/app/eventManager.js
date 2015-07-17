define([], function () {
    var $body = $("body");

    return {
        on: on,
        trigger: trigger
    };

    function on(eventName, handler) {
        $body.on(eventName, handler);
    }

    function trigger(eventName, value) {
        var event = jQuery.Event(eventName);
        event.value = value;
        $body.trigger(event);
    }
});