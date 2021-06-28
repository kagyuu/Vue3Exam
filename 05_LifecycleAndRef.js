const app = Vue.createApp({
    data() {
        return {
            message : '',
            logs : new Array()
        };
    },
    methods : {
        btnClicked(event) {
            this.message = "Clciked";
            console.dir(event.target);
            console.dir(this.$refs.spnMessage);
        }
    },
    computed : {
    },
    watch: {
    },
    beforeCreate() {
        console.log("before create");

        // To access this would be an error because app object would not initialized in this life-cycle.
        // this.logs.push("beforeMount");
    },
    created() {
        console.log("created");
        this.logs.push("created");
    },
    beforeMount() {
        console.log("before mount");
        this.logs.push("beforeMount");
    },
    mounted() {
        console.log("mounted");
        this.logs.push("mounted");
    },
    beforeUpdate() {
        console.log("before update");
    },
    updated() {
        console.log("updated");
    }

});

app.mount('#app');