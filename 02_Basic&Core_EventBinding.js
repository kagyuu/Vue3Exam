const app = Vue.createApp({
    data() {
        return {
            message1: 'OUTPUT',
            message2: 'OUTPUT'
        };
    },
    methods : {
        showAlert(event) {
            console.log(event);
            alert("alert");
        },
        onKeydown(event, paragraphNo) {
            switch(paragraphNo) {
                case 1:
                    this.message1 = event.srcElement.value;
                    break;
                case 2:
                    this.message2 = event.srcElement.value;
                    break;
            }
        }
    }    
});

app.mount('#assignment')