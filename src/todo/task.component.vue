<script lang="ts">
import { Component, Prop, Vue } from "@banquette/vue-typescript";
import { PopoverDirective } from "@banquette/vue-ui/popover";
import { FormCheckboxComponent } from "@banquette/vue-ui/form/checkbox";
import { ButtonComponent } from "@banquette/vue-ui/button";
import { TaskInterface } from "./task.interface";

@Component({
    name: 'task',
    components: [FormCheckboxComponent, ButtonComponent],
    directives: [PopoverDirective],
    emits: ['delete']
})
export default class TaskComponent extends Vue {
    @Prop({type: Object, required: true}) public entity!: TaskInterface;
}
</script>

<template>
    <div class="task" :class="{completed: entity.done}">
        <span>{{ entity.description }}</span>
        <bt-form-checkbox v-model="entity.done" v-if="!entity.done" v-bt-popover="{content: 'Mark as completed', placement: 'right'}"></bt-form-checkbox>
        <bt-button variant="sm link danger" v-else v-bt-popover="{content: 'Delete', placement: 'right'}" @click="$emit('delete', entity)">X</bt-button>
    </div>
</template>

<style scoped>
.task {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
}

.task:hover {
    background: #fafafa;
}

.task.completed span {
    text-decoration: line-through;
}
</style>
