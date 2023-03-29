function podkresl(i) {
    if (i < 0 || i > 5) {
      return;
    }
    let przyciski = document.querySelectorAll('.nav-link');
    przyciski[i].classList.add('text-primary')
  }

//Vue 3
  Vue.component("todolist", {
    template: `<div class="mx-auto canvas">
                  <h1 class="title is-1">My ToDo List with Vue.js</h1>
                  <div class="userInput">
                      <input class="input" type="text" v-model="newTask" placeholder="Add a ToDo" @keyup.enter="addTask()">
                      <button class="button is-primary" @click="addTask()" :disabled="newTask.length < 3"><i class="fa fa-plus"></i>&nbsp;Add</button>
                  </div>
                  <p class="emptyList" v-show="tasks.length == 0">No ToDo's in your list</p>
                  <div class="clearButtons" v-if="tasks.length > 0">
                      <button class="button is-outlined is-danger clear" :disabled="completedTasks == 0" @click="displayModalClearCompleted()"><i class="fa fa-check"></i>&nbsp;Clear Completed</button>
                      <button class="button is-danger clear" @click="displayModalClearAll()"><i class="fa fa-trash"></i>&nbsp;Clear All</button>
                  </div>
                  <ul v-show="incompleteTasks.length > 0"> 
                      <todo v-for="(task, index) in incompleteTasks" :task="task" :key="index" @complete="completeTask(task)" @remove="removeTask(index)"></todo>
                  </ul>
                  <ul v-show="completedTasks.length > 0">
                      <h4 class="title is-4">Complete</h4>
                      <todo v-for="(task, index) in completedTasks" :task="task" :key="index" @complete="completeTask(task)" @remove="removeTask(index)"></todo>
                  </ul>
                  <modal v-if="showModalClearCompleted" @close="showModalClearCompleted=false">
                      <template slot="header">
                          Warning
                      </template>
                      You're about to delete all the completed ToDo's in the list
                      <template slot="footer">
                          <button class="button is-danger" @click="clearCompleted(),showModalClearCompleted=false">Confirm</button>
                          <button class="button" @click="showModalClearCompleted=false">Cancel</button>
                      </template>
                  </modal>
                  <modal v-if="showModalClearAll" @close="showModalClearAll=false">
                      <template slot="header">
                          Warning
                      </template>
                      You're about to delete all the ToDo's in the list
                      <template slot="footer">
                          <button class="button is-danger" @click="clearList(),showModalClearAll=false">Confirm</button>
                          <button class="button" @click="showModalClearAll=false">Cancel</button>
                      </template>
                  </modal>
              </div>`,
    data() {
      return {
        newTask: "",
        tasks: [],
        showModalClearAll: false,
        showModalClearCompleted: false
      };
    },
    methods: {
      completeTask(task) {
        task.complete = !task.complete;
        this.tasks.sort((a, b) => a.date - b.date);
      },
      removeTask(index) {
        this.tasks.splice(index, 1);
      },
      addTask() {
        if (this.newTask != "") {
          this.tasks.push({
            title: this.newTask,
            complete: false,
            date: new Date()
          });
          this.newTask = "";
          this.tasks.sort((a, b) => a.date - b.date);
        }
      },
      clearList() {
        this.tasks = [];
      },
      clearCompleted() {
        for (let i = this.tasks.length - 1; i >= 0; --i) {
          if (this.tasks[i].complete) {
            this.tasks.splice(i, 1);
          }
        }
      },
      displayModalClearAll() {
        this.showModalClearAll = true;
      },
      displayModalClearCompleted() {
        this.showModalClearCompleted = true;
      }
    },
    computed: {
      incompleteTasks() {
        return this.tasks.filter(task => !task.complete);
      },
      completedTasks() {
        return this.tasks.filter(task => task.complete);
      }
    }
  });
  
  Vue.component("todo", {
    props: ["task"],
    template: `
          <li class="task_item" :class="{completed: task.complete}">
              <div class="task_item_title" @click="$emit('complete')">{{task.title}}<span class="date">{{task.date | formatDate}}</span></div>
              <div class="delete" @click="$emit('remove')">&times;</div>
          </li>
        `,
    filters: {
      formatDate(value) {
        return value.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric"
        });
      }
    }
  });
  
  Vue.component("modal", {
    template: `
    <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title"><slot name="header"></slot></p>
      </header>
      <section class="modal-card-body">
          <slot></slot>
      </section>
      <footer class="modal-card-foot">
      <slot name="footer"></slot>
      </footer>
    </div>
  </div>
      `
  });
  
  let App = new Vue({
    data() {
      return {
        showModal: false
      };
    },
    el: "#app"
  });
  