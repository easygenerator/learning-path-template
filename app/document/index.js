define(['dialogs/document/index'], function (documentDialog) {
    "use strict";

    function DocumentViewModel(document) {
        var that = this;
        
        this.id = document.id;
        this.title = document.title;
        this.type = document.type;
        this.embedCode = document.embedCode;
        this.open = function() {
            documentDialog.show(that.title, that.embedCode, that.type);
        }
    };

    return DocumentViewModel;
});