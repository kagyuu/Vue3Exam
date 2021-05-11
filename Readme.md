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
