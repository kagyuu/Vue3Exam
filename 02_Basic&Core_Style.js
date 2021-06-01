const app = Vue.createApp({
    data() {
        return {
            input1: 'user',
            input2: 'user',
            showParagraph: true
        };
    },
    methods : {
        btnClick(event) {
            this.showParagraph = !this.showParagraph;
        }
    },
    computed : {
        message1class() {
            return {
                user1: "user1" === this.input1,
                user2: "user2" === this.input1
            };
        }
    },
    watch: {
    }
});

app.mount('#assignment')