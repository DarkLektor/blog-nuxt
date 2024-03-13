<template>
  <div class="posts container py-4 d-flex flex-column justify-content-start align-items-start">
    <div class="d-flex justify-content-between align-items-center mb-4 w-100">
      <h1>Posts</h1>

      <select v-model="filters.sortDirection" class="form-select w-auto">
        <option value="asc">Sort by ascending</option>
        <option value="desc">Sort by descending</option>
      </select></div>

    <div v-if="error">{{ error }}</div>

    <div v-else-if="loading" class="d-flex justify-content-center align-items-center w-100">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <template v-else-if="posts?.length">
      <div class="posts-list">
        <Post
            v-for="post in posts"
            :key="post.id + post.title"
            :post="post"

        />
      </div>
      <UiPagination
          :page="filters.page"
          @updatePageAndLimit="onPageChange($event)"
          :total-count="totalCount"
          :limit="filters.limit"
      />
    </template>

    <div v-else>No posts</div>
  </div>
</template>

<script setup lang="ts">
const {showToast} = useNuxtApp();

const {
  posts,
  loading,
  error,
  totalCount,
  filters
} = usePosts(showToast as (message: string) => void);


const onPageChange = ({page, limit}: { page: number, limit: number }) => {
  filters.page = page;
  filters.limit = limit;
}
</script>

<style scoped lang="scss">
.posts-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 20px;
  margin-bottom: 20px;
}
</style>
