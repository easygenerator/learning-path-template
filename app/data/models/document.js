define(['data/models/entity'], function (Entity) {
    "use strict";

    function Document (title, link) {
        Entity.call(this, title, link, false);
        
        this.title = title;
        this.link = link;
        this.type = null;
        this.embedCode = '';
    };

    return Document;
});