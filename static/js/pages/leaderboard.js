new Vue({
    el: "#leaderboard",
    delimiters: ["<%", "%>"],
    data() {
        return {
            boards : {},
            mode : 'std',
            mods : 'vn',
            sort : 'pp',
            load : false,
            no_player : false, // soon
        }
    },
    created() { 
        var vm = this;
        vm.mode = mode
        vm.mods = mods
        vm.sort = sort
        vm.LoadLeaderboard(sort, mode, mods)
    },
    methods: {
        LoadLeaderboard(sort, mode, mods) {
            var vm = this;
            if (window.event){
                window.event.preventDefault();
            }
            vm.load = true;
            vm.mode = mode;
            vm.mods = mods;
            vm.sort = sort;
            window.history.replaceState('', document.title, "/leaderboard/" + vm.mode + "/" + vm.sort + "/" + vm.mods);
            vm.$axios.get(window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/api/get_leaderboard", { params: { 
                mode: mode, 
                sort: sort, 
                mods: mods,
            }})
            .then(function(response){
                vm.boards = response.data;
                vm.load = false;
            });
        }, 
        scoreFormat(score){ 
            var addCommas = this.addCommas;
            if (score > 1000 * 1000){
                if(score > 1000 * 1000 * 1000)
                    return addCommas((score / 1000000000).toFixed(2))+" billion";
                return addCommas((score / 1000000).toFixed(2))+" million";
            }
            return addCommas(score);
        },    
        addCommas(nStr) {
            nStr += '';
            var x = nStr.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        },   
    },
    computed: {
    }
});