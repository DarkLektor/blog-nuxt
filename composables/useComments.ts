import {onMounted, onUnmounted, ref, watch} from 'vue';
import type {CommentType} from '~/types/comment.type';
import {useDebounce} from '~/composables/useDebounce';
import {useRoute} from "vue-router";

export function useComments(limit = 4, observerElement: Ref<HTMLElement | null>) {
    const comments = ref<CommentType[]>([]);
    const page = ref(1);
    const loading = ref(false);
    const allCommentsLoaded = ref(false);
    const searchQuery = ref('');
    const route = useRoute();
    const {debounce} = useDebounce();
    const config = useRuntimeConfig();
    const baseUrl = config.public.baseUrl;

    watch(() => route.query.q, (newQuery) => {
        searchQuery.value = newQuery?.trim() || '';
        page.value = 1;
        comments.value = [];
        allCommentsLoaded.value = false;
        debounce(loadComments, 300);
    }, {immediate: true});

    async function loadComments() {
        if (allCommentsLoaded.value) return;
        loading.value = true;
        const queryParams = new URLSearchParams({
            postId: route.params.id.toString(),
            _start: (page.value * limit - limit).toString(),
            _limit: limit.toString(),
            q: searchQuery.value,
        }).toString();

        try {
            const response = await fetch<CommentType[]>(`${baseUrl}/comments?${queryParams}`);
            const data = await response.json()
            if (data?.length < limit) {
                allCommentsLoaded.value = true;
            }

            comments.value = [...comments.value, ...data];
            page.value++;
        } catch (error) {
            console.error(error);
            loading.value = false;
            return;
        }

        loading.value = false;
    }

    let observer: IntersectionObserver;
    onMounted(() => {
        observer = new IntersectionObserver((entries) => {
            if (entries.some(entry => entry.isIntersecting) && !allCommentsLoaded.value) {
                loadComments();
            }
        }, {rootMargin: '100px'});
        if (observerElement.value) {
            observer.observe(observerElement.value);
        }
    });

    onUnmounted(() => {
        observer.disconnect();
    });

    return {comments, loading, loadComments};
}
