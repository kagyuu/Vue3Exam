# About this

* This is the lecture note of "Vue - The Complete Guide (w/ Router, Vuex, Composition API)" on Udemy.

# Course Point

## 01 About Vue.js

* Target of this cource: Vue.js 3.
* https://v3.vuejs.org/
* https://v3.ja.vuejs.org
* Vue.js is frontend framework which is running in web browsers.
* Framework is library plus a rule set.
* Vue.js is reactive.
* Alternative Frameworks

    |Framework|Componet Based UI|Routing (Biz logic)|Typescript|Popular|note|
    | ------- | -------- | -------- | -------- | -------- | -------- |
    |Angular  | ✓ | ✓            | mandatory| ✓✓✓ | Can be over kill for smaller project.| 
    |React.js | ✓ | community pkg | optional | ✓✓   | Efficient, but difficult to understand.| |
    |Vue.js   | ✓ | ✓            | optional | ✓     | Easy to understand.|

* These modern javascirt frameworks are similar.
* So, switching is not too hard.

## 02_Basic&Core.html

## 02-1 [DataBinding](02_Basic&Core_DataBinding.html)

* How to bind DOM element with JS variables and event handers.
  * JS
    ```
    const app = Vue.createApp({
        data() {
            return {
                name: 'YOUR NAME',
                age: 'YOUR AGE',
                randNumber: Math.random(),
                imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/
                txtInName : '',
                txtInAge : ''
            };
        },
        methods : {
            submit() { .. event handling logic .. },
            reset() { .. event handling logic .. }
        }
    });

    app.mount('#assignment'); // bind app object with <section> Dom Element
    ```
  * HTML (DOM)
    ```
    <section id="assignment">
        <h2>{{ name }}</h2>
        <p>{{ age }}</p>
        <p>{{ (typeof age === 'number') ? age + 5 : 'YOUR AGE + 5' }}</p>
        <p>RND = {{ randNumber }}</p>
        <div>
          <img v-bind:src="imgUrl" />
        </div>
        NAME : <input type="text" v-model="txtInName" v-bind:placeholder="name"/>
        AGE : <input type="text" v-model="txtInAge" v-bind:placeholder="age"/>
        <br/><br/>
        <button v-on:click="submit">SUBMIT</button>
        &nbsp; <button v-on:click="reset">RESET</button>
      </section>
    ``` 
  * app.data.name ⇒ {{ name }}
  * app.data.imgUrl ⇒ `<img v-bind:src="imgUrl" />` (v-bind is one-way)
  * app.data.txtInName ⇔ `<input type="text" v-model="txtInName" />` (v-model is two way)
  * `<button v-on:click="submit">SUBMIT</button>` ⇒ app.methods.submit(){ // handle click event // };
  * In event handler, this object means app.data, NOT handler itself.

* We can write javascript code in HTML. (But not recommend because it makes the HTML complex.)
  * `<p>{{ (typeof age === 'number') ? age + 5 : 'YOUR AGE + 5' }}</p>`
  * `<button v-on:click="count++">COUNT UP</button>`
  * `<button v-on:click="if (count > 0) {count--}">COUNT DOWN</button>`

* We can ban to update DOM elements with the 'v-once' attribute.
    ```
    <p v-once>{{ name }}<p>
    ```
* Vue.js escape html tags when it render dom from app.data js object. If we want to not escape data, we can use the 'v-html' attribute. Only div and span can have this attribute. (But not recommend becase of avoiding XSS(Cross Site Scripting).)
    ```
    <div v-html="html_message"></div>
    <span v-html="html_message"></span>
    ```

## 02-2 [EventBinding](02_Basic&Core_EventBinding.html)

* Event handlers can take argumentes.
* If argument is not defined in a HTML, the event object will be set as the first argument implicity.
    ```
    <button v-on:click="showAlert">Show Alert</button>

    showAlert(event) {
        alert("alert");
    },
    ```
* If argument is defined in a HTML, the first arugment is it.
    ```
    <input type="text" v-on:keydown="onKeydown(1)"/>

    onKeydown(paragraphNo) {
        switch (paragraphNo) {
        ...
        }
    }
    ```
* If you want to get the event object and your parameter in the event hander method, use $event special object in a HTML.
    ```
    <input type="text" v-on:keydown="onKeydown($event, 1)"/>

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
    ```

* The v-on attribute can have modifires.

    |modifire|example| note |  
    | ------- | -------- | -------- |
    |stop   |```<a v-on:click.stop="doThis"></a>```|Stop event bubble. Only "doThis()" is called.|
    |prevent|```<form v-on:submit.prevent="doThis"></form>```|Prevent default. Don't call HTTP POST.|
    |capture|```<div v-on:click.capture="doThis">...(inner element)...</div>```|Even if the event occured inner element, "doThis()" will be called at first.|
    |self   |```<div v-on:click.self="doThis">...(inner element)...</div>```|Only if the event occured self element, "dotThis()" will be called.| 
    |v-on.once    ||The event fires once. From Second onward, ignored.|
    |v-on.passive ||Predeclare don't use "preventDefault()". Performance Option.| 

    * cf. vanilla JS EventTarget.addEventListener() options
        https://developer.mozilla.org/ja/docs/Web/API/EventTarget/addEventListener
    * These event modifires are use as chain.
      * ex) v-on:click.self.once="doThis"
      * But you can't use "v-on:?.prevent.passive". It's contradicted.

* The v-on:keyup can have modifires.

    |modifire|note|
    | ------- | -------- |
    |v-on:keyup.enter="doThis"| The "doThis()" is called only if pressed key was enter-key. |
    |v-on:keyup.tab="doThis"||
    |v-on:keyup.delete="doThis"||
    |v-on:keyup.esc="doThis"||
    |v-on:keyup.space="doThis"||
    |v-on:keyup.up="doThis"||
    |v-on:keyup.down="doThis"||
    |v-on:keyup.left="doThis"||
    |v-on:keyup.right="doThis"||
    |v-on:keyup.ctrl="doThis"||
    |v-on:keyup.alt="doThis"||
    |v-on:keyup.shift="doThis"||
    |v-on:keyup.meta="doThis"||
    |v-on:keyup.112="doThis"| The "doThis()" is called only if pressed key was Key code 112(F1). ※ Not Recommend.|

* The v-on:click can have modifires.

    |modifire|note|
    | ------- | -------- |
    |v-on:click.left="doThis"| The "doThis()" is called only if pressed left button of the mouse|
    |v-on:click.right="doThis"||
    |v-on:click.middle="doThis"||

* .exact modifire represents signle key/mouse press 

    |modifire|No key was pressed|Only Ctrl was pressed|Ctrl+Alt were pressed|
    | ------- | -------- | -------- | -------- |
    |```<button v-on:click.ctrl="onClick">A</button>```|not fire event|fire event|fire event|
    |```<button v-on:click.ctrl.exact="onClick">A</button>```|not fire event|fire event|not fire event|
    |```<button v-on:click.exact="onClick">A</button>```|fire event|not fire event|not fire event|

## 02-3 [EventTiming](02_Basic&Core_EventTiming.html)

    `
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
            // <p>Hello {{ fullName }} San!</p>
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
    `

| app     | timing   | use case |
| ------- | -------- | -------- |
|app.data | when referenced DOM element changed |
|app.method | when v-on event |
|app.computed | when referenced app.data.* changed | combile individual data properties to one data property automatically|
|app.watch | when referenced app.data.* changed | do something like ajax call or clear something when an individual property changed.|

* [ANTIPATTERN]

    Don't call mehods from a HTML like this : `<p> HELLO {method()}</p>`
    This method() is called even when a data property that has no relation with this chaned.
    In this case, we have to use app.computed insted of app.method. 

## 02-4 Synonyms of v-on/v-bind

    `
    <section id="assignment">
      <h2>Event Timing</h2>
      First : <input type="text" v-model="firstName"/>
      Second : <input type="text" v-model="secondName"/>
      <p>Hello {{ fullName }} San!</p>
      <hr />
      <!-- <button v-on:click="send">Send Message</button> -->
      <button @click="send">Send Message</button>
      <!-- <input type="text" v-bind:value="message" disabled="true" size="80"></input> -->
      <input type="text" :value="message" disabled="true" size="80"></input>
    </section>
    `    

| long format | synonym |
| ----------- | ------- |
| v-on:click  | @click  |
| v-bind:value | :value |
| v-model      | (no synonym) |

## 02-5 Style Binindg

* We can bind style and style-class on the HTML to the javascript object.
* Vue.js entends style definition. We can define style as JS Object or JS Array.
  * style on JS Object : {style1 : true/false, style2 : true/false, ...}
  ```
    <p :class="{user1:'user1'===input2
      , user2:'user2'===input2
      , visible: showParagraph
      , hidden: !showParagraph}">aaa</p>
  ```
  * style on JS Array
  ```
    <p :class="[user1, 'visible']">aaa</p>
  ```
* It's convinent to use app.compute for define style-class because we don't have to manage events explicity. The app.compute automatically change style-class when relative variable changed.

```
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
                // class-name : switch(t/f), class-name : switch(t/f), ...
                user1: "user1" === this.input1,
                user2: "user2" === this.input1
            }; // This is bound to ":class" attribute on the HTML template.
        }
    },
    watch: {
    }
}); 
``````
## 03 Loop and IfElse

````
    <section id="assignment">
      <h2>Assignment</h2>
      <!-- 1) Add code to manage a list of tasks in a Vue app -->
      <!-- When clicking "Add Task" a new task with the entered text should be added -->
      <input type="text" v-model="task">
      <button @click="addTask">Add Task</button>

      <p>There are {{ tasks.length }} tasks.</p>

      <ul v-show="showTasks">
        <!-- 2) Output the list of tasks here -->
        <li v-for="(item, idx) in tasks" :key="item.id">
          {{idx}} - {{item.name}} - {{item.id}}
          <button @click="deleteTask(idx);">Delete</button>
        </li>
      </ul>
      
      <!-- 3) When the below button is pressed, the list should be shown or hidden -->
      <!-- BONUS: Also update the button caption -->
      <div v-if="showTasks">
        <button @click="toggleTasklist(false);">Hide List</button>
      </div>
      <div v-else>
        <button @click="toggleTasklist(true);">Show List</button>
      </div>
    </section>
````
* &lt;v-for="(item, idx) in tasks" :key="item.id"&gt;`
  * tasks is Array() in Javascript.
  * idx is omittable.
  * ":key" is recomennded. If there is no ":key", Vue.js rebuild whole DOM structure when tasks was changed. If ":key" specified, Vue.js will delete or add only DOMs that is relate with changed rows of tasks.
  * "v-for" also handle key-value object, {key1:val1, key2:val2, ... }. like v-for="(key, val) in object".
* v-if, v-else-if, v-else
    ```
    <div v-if="condition1">
    </div>
    <div v-else-if="condition2">
    </div>
    <div v-else>
    </div>
    ```
* &lt;ul v-show="showTasks"&gt;
  * v-show is similar with v-if
  * v-show will add or remove style "display:none"
  * Oppositly, v-if will manipluate DOMs.
  * v-show is faster than v-if.

## 05 Lifecycle

* We can write page initializing process on created(), such as an ajax access.
* The lifecycle is one of key concepts of vue's component structure.
`
```
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
```
## 05 How to access a raw DOM on vue's js logic.

* HTML
```
<span ref="spnMessage">{{ message }}</span>
```
* JS
```
console.dir(this.$refs.spnMessage);
```
* this.$refs.{{ name }}  is the raw HTML DOM Object.

* note: The event handling method also be able to get the raw evnet object and the event soruce.
The event.target is a DOM of &lt;button&gt;, for example.
```
    methods : {
        btnClicked(event) {
            this.message = "Clciked";
            console.dir(event.target);
            console.dir(this.$refs.spnMessage);
        }
    },
```
## 06 Component

* HTML
    ```
    <section id="app">
        <input v-model="message"/>
        <button @click="btnClicked">Clear</button>

        <ten-key :title="componentTitle" @update-keypad="onUpdateKeypad"></ten-key>
    </section>
    ```
    * The &lt;ten-key&gt; is my component.
    * Data Communication between the parent component and the child component.
        * Parent to Child : v-bind:title (eq. :title)
        * Child to Parent : custome event v-on:update-keypad (eq. @update-keypad)
* JS
    ```
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
    ```
    * The component is a child object of app. 
        ```
        const app = Vue.createApp({});
        app.component('ten-key',{});
        app.mount('#app');
        ```
    * How do the child component get a data form the parent?
        ```
        app.component('ten-key',{
            props: ['title'],
            ...
        }
        ``` 
        The variable title can be used as data().
    * How do the child send a data to the parent?
        ```
        this.$emit('update-keypad', no);
        ```
        * the 'update-keypad' is a custome event name.
        * the second argument is a data.
        * the parent can treat the custome event 'update-keypad' as vanila DOM event.
    * How do the child detect the data of the parent. -> Use 'watch' property of the component.
        ```
        watch: {
            title(newValue, oldValue) {
                console.log("title was changed");
            }
        }
        ```
## 07 Vue CLI
* https://cli.vuejs.org/
* install
  1. install node.js
        ```
        $ sudo apt install nodejs npm
        $ node -v
        v10.24.0
        ```
  1. Oh! It's too old. Uninstall them.
        ```
        $ sudo apt purge -y nodejs npm
        $ sudo apt autoremove
        ```
  1. Install node.js again. cf. https://github.com/nodesource/distributions/blob/master/README.md#deb
        ```
        $ sudo -s
        # curl -fsSL https://deb.nodesource.com/setup_12.x | bash -
        # apt-get install -y nodejs
        # exit
        $  node -v
        v14.17.2
        ```
  1. install vue cli
        ```
        $ sudo npm install -g @vue/cli
        $ vue --version
        @vue/cli 4.5.13
        ```