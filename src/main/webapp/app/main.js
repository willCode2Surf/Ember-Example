EME.Photo = DS.Model.extend({
    primaryKey: 'id',
    id: DS.attr('string'),
    photoTitle: DS.attr('string'),
    photoUrl: DS.attr('string')
});

EME.PhotoListController = Em.ArrayProxy.create({
    content: [],
    selected: null,
    timerId: null,

    startSlideshow: function() {
        this.nextPhoto();
        this.set('timerId', setInterval("EME.PhotoListController.nextPhoto()", 4000));
    },

    stopSlideshow: function() {
        clearInterval(this.get('timerId'));
        this.set('timerId', null);
    },

    nextPhoto: function() {
        if (!this.get('selected')) {
            this.set('selected', this.get('content').get('firstObject'));
        } else {
            var selectedIndex = this.findSelectedItemIndex();

            if (selectedIndex >= (this.get('content').get('length') - 1)) {
                selectedIndex = 0;
            } else {
                selectedIndex++;
            }

            this.set('selected', this.get('content').objectAt(selectedIndex));
        }
    },

    prevPhoto: function() {
        if (!this.get('selected')) {
            this.set('selected', this.get('content').get('lastObject'));
        } else {
            var selectedIndex = this.findSelectedItemIndex();

            if (selectedIndex <= 0) {
                selectedIndex = this.get('content').get('length') - 1;
            } else {
                selectedIndex--;
            }

            this.set('selected', this.get('content').objectAt(selectedIndex));
        }

    },

    findSelectedItemIndex: function() {
        var content = this.get('content');

        for (index = 0; index < content.get('length'); index++) {
            if (this.get('selected') === content.objectAt(index)) {
                return index;
            }
        }

        return 0;
    }
});

EME.SelectedPhotoController = Em.Object.create({
    contentBinding: 'EME.PhotoListController.selected'
});

EME.ThumbnailPhotoView = Em.View.extend({
    click: function(evt) {
        EME.PhotoListController.set('selected', this.get('content'));
    },

    classNameBindings: "isSelected",

    isSelected: function() {
        console.log(EME.PhotoListController.get('selected') == this.get('content'));
        return EME.PhotoListController.get('selected') == this.get('content');
    }.property('EME.PhotoListController.selected')
});

EME.SelectedPhotoView = Em.View.extend({

});
