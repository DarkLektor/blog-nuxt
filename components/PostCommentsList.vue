<template>
  <div class="pb-4">
    <template v-if="comments?.length">
      <div
          v-for="comment in comments" :key="comment.id"
          class="card border-dark mb-3"
      >
        <div class="card-header">
          <a :href="`mailto:${comment.email}`" class="link-dark">
            {{ comment.email }}
          </a>
        </div>
        <div class="card-body text-dark">
          <h5 class="card-title">{{ comment.name }}</h5>
          <p class="card-text">{{
              comment.body
            }}
          </p>
        </div>
      </div>
    </template>

    <div v-else>No comments</div>

    <div v-if="loading" class="d-flex justify-content-center align-items-center w-100">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div ref="observerElement"></div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";

const observerElement = ref<HTMLElement | null>(null);
const {comments, loading} = useComments(4, observerElement);
</script>

<style scoped>

</style>
