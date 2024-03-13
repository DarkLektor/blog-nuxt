<template>
  <div class="card">
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ props.post.title }}</h5>
      <p class="card-text">
        {{ props.post.body }}
      </p>
      <nuxt-link :to="`/post/${props.post.id}`" class="card-link mt-auto ms-auto">
        Go to post
      </nuxt-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {PostType} from "~/types/post.type";

const props = defineProps<{ post: PostType }>()
</script>

<style scoped lang="scss">
</style>
