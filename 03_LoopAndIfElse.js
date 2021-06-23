const app = Vue.createApp({
    data() {
        return {
            task: '',
            tasks: new Array(),
            showTasks: true,
        };
    },
    methods : {
        addTask() {
            this.tasks.push({
                id : (new Date()).getTime(),
                name : this.task
            });
            this.task = '';
        },
        toggleTasklist(flag) {
            this.showTasks = flag;
        },
        deleteTask(idx) {
            this.tasks.splice(idx,1);
        }
    },
    computed : {
    },
    watch: {
    }
});

app.mount('#assignment');