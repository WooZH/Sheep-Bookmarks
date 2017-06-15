var vm = new Vue({
    el: 'body',
    data: {
        bookMarks: {},
        search: '',
        numbers: []
    },
    computed: {},
    methods: {
        getBookmarks: function () {
            that = this
            var bookmarkTreeNodes = chrome.bookmarks.getTree(
                function (bookmarkTreeNodes) {
                    that.bookMarks = bookmarkTreeNodes[0].children;
                    console.log('bookmarkTreeNodes:');
                    console.log(that.bookMarks);
                });
        },
        openUrl: function (currentUrl) {
            chrome.tabs.create({url: currentUrl, selected: false});
        },
        filterMarks: function () {
            console.log(this.search)
        },
        remove: function (id) {
            that = this
            chrome.bookmarks.remove(String(id))
            that.getBookmarks()
        },
        open: function(index){
            that = this;
            if(index > this.numbers.length){
                var count = index - this.numbers.length
                for(var j = 0; j < count; j++){
                    this.numbers.push(true);
                }
            }
            else{
                this.numbers.$set(index, !this.numbers[index]);

            }
        }
    },
    ready: function () {
        this.getBookmarks()
    }
})
