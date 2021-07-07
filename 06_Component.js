const app = Vue.createApp({
    data() {
        return {
            message : '',
            componentTitle : '10KEY PAD'
        };
    },
    methods : {
        btnClicked(event) {
            this.message = "";
            this.componentTitle = "10KEY PAD";
        },
        onUpdateKeypad(keyno) {
            switch (keyno) {
                case -1:
                    this.message += ".";
                    break;
                case -2:
                    this.message = this.message.slice(0, -1);
                    break;
                default:
                    this.message += keyno;
                    break;
            }
            this.componentTitle = "INPUT AMOUNT";
        }
    }
});

app.component('ten-key',{
    props: ['title'],
    template : `
    <table class="ten-key">
    <caption>{{ title }}</caption>
    <tr>
        <td><button @click="keypad(7)">7</button></td>
        <td><button @click="keypad(8)">8</button></td>
        <td><button @click="keypad(9)">9</button></td>
    </tr>
    <tr>
        <td><button @click="keypad(4)">4</button></td>
        <td><button @click="keypad(5)">5</button></td>
        <td><button @click="keypad(6)">6</button></td>
    </tr>
    <tr>
        <td><button @click="keypad(1)">1</button></td>
        <td><button @click="keypad(2)">2</button></td>
        <td><button @click="keypad(3)">3</button></td>
    </tr>
    <tr>
        <td><button @click="keypad(0)">0</button></td>
        <td><button @click="keypad(-1)">.</button></td>
        <td><button @click="keypad(-2)">DEL</button></td>
    </tr>
    </table>
    `,
    data() {
        return {
        };
    },
    methods : {
        keypad(no) {
            // occur custom event 'update-keypad'
            this.$emit('update-keypad', no);
            // We can access 'title' in the props
            // like as data properties.
            console.log(this.title);
        }
    },
    watch: {
        title(newValue, oldValue) {
            console.log("title was changed");
        }
    }
});

app.mount('#app');