ko.bindingHandlers.dropDown = {
    init: function (element) {
        var $element = $(element),
            expandedClass = 'expanded',
            disabledClass = 'disabled',
            $html = $('html');

        $element.on('click', function () {
            if ($element.hasClass(expandedClass) || $element.hasClass(disabledClass)) {
                return;
            } else {
                $element.addClass(expandedClass);

                _.defer(function () {
                    $html.on('click', hide);
                });
            }
        });

        function hide() {
            $element.removeClass(expandedClass);
            $html.off('click', hide);
        };

    }
}
