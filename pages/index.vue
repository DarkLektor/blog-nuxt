<template>
  <div class="posts container py-4 d-flex flex-column justify-content-start align-items-start">
    <h1 class="mb-4">Posts</h1>
    <select v-model="sortDirection" @change="applyFilters">
      <option value="asc">По возрастанию</option>
      <option value="desc">По убыванию</option>
    </select>

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
          v-if="totalCount > limit"
          :page="page"
          @update:page="onPageChange($event)"
          :total-count="totalCount"
          :limit="limit"
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
  fetchPosts,
  page,
  totalCount,
  limit
} = usePosts(showToast as (message: string) => void);

onMounted(() => fetchPosts(
    queries.value.page ? Number(queries.value.page) : undefined,
    queries.value.limit ? Number(queries.value.limit) : undefined)
);

const route = useRoute();
const router = useRouter();
const queries = computed(() => route.query);

watch(queries, ({page, limit}) => {
  fetchPosts(
      page ? Number(page) : undefined,
      limit ? Number(limit) : undefined
  )
});

const onPageChange = ({page, limit}: { page: number, limit: number }) => {
  router.replace({query: {page, limit}});
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
