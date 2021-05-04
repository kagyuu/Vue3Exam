// --------------------------------------------------------
// 1. Create an App Object
// --------------------------------------------------------
const app = Vue.createApp({
    // ----------------------------------------------------
    // 1-1. app.data returns objects that will be bound with DOM.
    // ----------------------------------------------------
    data() {
        return {
            // be bound with {{ name }} on the HTML.
            name: 'YOUR NAME',
            // be bound with {{ age }} and {{ age + 5 }} on the HTML.
            age: 'YOUR AGE',
            // be bound with {{ randNumber }} on the HTML.
            randNumber: Math.random(),
            // be bound with '<img v-bind:src="imgUrl" />'.
            // * v-bind is one-way binding
            // * WORKS     : data.imgUrl → '<img v-bind:src="imgUrl" />'
            // * NOT WORKS : '<img v-bind:src="imgUrl" />' → data.imgUrl
            imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/OSIRIS_Mars_true_color.jpg/375px-OSIRIS_Mars_true_color.jpg',
            // be bound with '<input type="text" v-model="txtInName"/>'.
            // * v-model is two-way binding
            // * WORKS     : data.txtInName → '<input type="text" v-model="txtInName"/>'
            // * ALSO WORKS: '<input type="text" v-model="txtInName"/>' → data.txtInName
            txtInName : '',
            txtInAge : ''
        };
    },
    // ----------------------------------------------------
    // 1-2. app.method is event handlers.
    // ----------------------------------------------------
    methods : {
        // ------------------------------------------------
        // 1-2-1. The event handler of '<button v-on:click="submit">SUBMIT</button>'
        // [IMPORTANT] this means app.data object.
        submit() {
            const intInAge = parseInt(this.txtInAge);
            if (isNaN(intInAge)) {
                alert(sprintf('Age \'%s\' is not number!!!', this.txtInAge));
                return;
            }

            this.name = this.txtInName;
            this.age = intInAge;
            this.randNumber = Math.random();
        },
        // 1-2-2. The event handler of '<button v-on:click="reset">RESET</button>'
        // [IMPORTANT] this means app.data object.
        reset() {
            this.name = 'YOUR NAME';
            this.age = 'YOUR AGE';
            this.txtInName = '';
            this.txtInAge = '';
        }
    }
});

// --------------------------------------------------------
// 2. Bind the App Object to DOM
// --------------------------------------------------------
app.mount('#assignment');