<script lang="ts">
import { FormControl } from "@banquette/form";
import { Component, Computed, Ref, Expose } from "@banquette/vue-typescript";
import { ButtonComponent } from "@banquette/vue-ui/button";
import { DialogComponent } from "@banquette/vue-ui/dialog";
import { FormTextComponent } from "@banquette/vue-ui/form/text";
import ValidateNotEmptyComponent from "@banquette/vue-ui/form/validator/not-empty-validator.component.vue";
import TaskComponent from "./task.component.vue";
import { TaskInterface } from "./task.interface";

@Component({
    name: 'todo',
    components: [TaskComponent, FormTextComponent, ValidateNotEmptyComponent, ButtonComponent, DialogComponent]
})
export default class TodoComponent {
    // The FormControl that holds the description of the new task.
    @Expose() public newTaskControl = new FormControl();

    // @Ref() is used instead of @Expose() so we don't expose the raw array of tasks to the template.
    @Ref() private tasks: TaskInterface[] = [];

    // These computed will update as the list of tasks changes.
    @Computed() public get tasksCount(): number {
        return this.tasks.length;
    }

    @Computed() public get uncompletedTasks(): TaskInterface[] {
        return this.tasks.filter((i) => !i.done);
    }

    @Computed() public get completedTasks(): TaskInterface[] {
        return this.tasks.filter((i) => i.done);
    }

    @Expose() public addTask = (() => {
        let maxId = 0; // Used to uniquely identify each task in the v-for
        return () => {
            if (this.newTaskControl.validate()) {
                this.tasks.push({id: ++maxId, description: String(this.newTaskControl.value), done: false});
                this.newTaskControl.reset();
            }
        }
    })();

    @Expose() public onDelete(task: TaskInterface): void {
        this.tasks = this.tasks.filter((i) => i.id !== task.id);
    }
}
</script>

<template>
    <bt-form-text :control="newTaskControl">
        Task's description
        <bt-validate-not-empty>A value is required.</bt-validate-not-empty>
        <template #after-raw>
            <bt-button @click="addTask()">Add</bt-button>
        </template>
    </bt-form-text>
    <div class="todo-list">
        <div class="title">Uncompleted tasks ({{ uncompletedTasks.length }})</div>
        <task v-for="task in uncompletedTasks" :entity="task" :key="task.id"></task>

        <div class="title">Completed tasks ({{ completedTasks.length }})</div>
        <task v-for="task in completedTasks" :entity="task" :key="task.id" @delete="onDelete"></task>
    </div>
</template>

<style scoped>
.todo-list {
    background: #fff;
    border-radius: var(--bt-border-radius-base);
    box-shadow: 4px 6px 12px rgb(0 0 0 / 8%);
    margin-top: 1rem;
    border: 1px solid #ededed;
    overflow: hidden;
}

.title {
    font-size: 1.1em;
    padding: 1rem;
    font-weight: 500;
    background: #f1f1f1;
}
</style>
