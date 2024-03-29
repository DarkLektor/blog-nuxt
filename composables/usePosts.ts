import type {PostType} from "~/types/post.type";
import {useDebounce} from "~/composables/useDebounce";
import {toStringValue} from "~/utils/locationQueryTostring";


export function usePosts(showToast: (err: string) => void) {
    const {debounce} = useDebounce();
    const route = useRoute();
    const router = useRouter();
    const config = useRuntimeConfig();
    const baseUrl = config.public.baseUrl;

    const posts = ref<PostType[]>([]);
    const loading = ref(false);
    const error = ref(null);
    const totalCount = ref(0);

    const filters = reactive({
        q: '',
        sortBy: 'title',
        sortDirection: 'asc',
        page: 1,
        limit: 12,
    });

    watch(() => route.query, (newQuery) => {
        filters.q = toStringValue(newQuery.q) || ''
        filters.limit = Number(newQuery.limit) || 12;
        filters.sortBy = toStringValue(newQuery.sortBy) || 'title';
        filters.sortDirection = toStringValue(newQuery.sortDirection) || 'asc';
        filters.page = Number(newQuery.page) || 1;

        debounce(() => fetchPosts(), 300);
    }, {immediate: true});

    watch(filters, (newFilters, oldFilters) => {
        const query = {
            ...Object.entries(newFilters).reduce((acc, [key, value]) => {
                if (value) acc[key] = value;
                return acc;
            }, {} as Record<string, string | number>),

            page: newFilters.q !== oldFilters?.q ? 1 : newFilters.page
        }

        router.replace({query});
    }, {deep: true});


    async function fetchPosts() {
        loading.value = true;

        const queryParams = new URLSearchParams({
            _sort: filters.sortBy,
            _order: filters.sortDirection,
            _page: filters.page.toString(),
            _limit: filters.limit.toString(),
            q: filters.q
        }).toString();

        try {
            const response = await fetch(`${baseUrl}posts?${queryParams}`)
            totalCount.value = +(response.headers.get('X-Total-Count') || 0);
            posts.value = await response.json();
        } catch (err: Error | any) {
            error.value = err?.message;
            console.log(err?.message)
            if (process.client) {
                showToast(err?.message);
            }

        } finally {
            loading.value = false;
        }
    }

    return {posts, loading, error, fetchPosts, totalCount, filters};
}
