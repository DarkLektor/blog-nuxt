<template>
  <div class="container pt-4">
    <div v-if="pending" class="d-flex justify-content-center align-items-center w-100">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else-if="error">Ошибка: {{ error.message }}</div>
    <div v-else>
      <h1>{{ post?.title }}</h1>
      <p>{{ post?.body }}</p>
      <PostCommentsList />
    </div>
  </div>
</template>

<script setup lang="ts">

import {useRoute} from 'vue-router';
import {useFetch} from '#app';
import type {PostType} from "~/types/post.type";

const config = useRuntimeConfig();
const route = useRoute();
const baseUrl = config.public.baseUrl;

const {data: post, pending, error} = useFetch<PostType>(`${baseUrl}posts/${route.params.id}`);

</script>

<style scoped>

</style>
