<script lang="ts">
import { Component } from "@banquette/vue-typescript";
import TodoComponent from "./todo/todo.component.vue";

@Component({
    components: [TodoComponent]
})
export default class App {

}
</script>

<template>
    <div class="container">
        <h1>What do you want to do today?</h1>
        <todo></todo>
    </div>
</template>

<style>
.container {
    max-width: 750px;
    margin: 2rem auto;
    padding: 0 2rem;
}
</style>
