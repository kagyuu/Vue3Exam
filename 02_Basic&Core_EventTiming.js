const app = Vue.createApp({
    data() {
        return {
            firstName: '',
            secondName: '',
            count: 0,
            message: '',
        };
    },
    methods : {
        send() {
            this.count += 1;
            this.message = "ACCUMELATED MESSAGE TO " + this.fullName + "(" + this.count + ").";
        }
    },
    computed : {
        fullName() {
            return this.firstName + ' ' + this.secondName;
        }
    },
    watch: {
        count(newValue, oldValue) {
            if (newValue > 9) {
                this.count = 0;
                this.message = "SEND MESSAGE TO " + this.fullName + ".";
            }
        }
    }
});

app.mount('#assignment')