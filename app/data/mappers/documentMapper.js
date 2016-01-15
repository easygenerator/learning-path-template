define(['constants', 'data/models/document'], function (constants, Document) {
    "use strict";

    return {
        map: map
    };

    function map(title, link) {
        var document = new Document(title, link);

        return $.getJSON(document.link + constants.document.contentDataUrl).then(function (documentData) {
            document.id = documentData.id;
            document.type = documentData.documentType;
            document.createdOn = new Date(documentData.createdOn);
            
            return $.get(document.link + constants.document.contentUrl).then(function (content) {
                document.embedCode = content;
                return document;
            });
            
        });
    }
});