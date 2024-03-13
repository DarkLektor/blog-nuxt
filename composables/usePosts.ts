import type {PostType} from "~/types/post.type";

export function usePosts(showToast: (err: string) => void) {
    const searchQuery = ref('');
    const sortBy = ref('title');
    const sortDirection = ref('asc');

    const posts = ref<PostType[]>([]);
    const loading = ref(false);
    const error = ref(null);
    const page = ref(1);
    const limit = ref(12);
    const totalCount = ref(0);

    async function fetchPosts(
        pageArg: number | undefined = 1,
        limitArg: number | undefined = 12,
        search: string = '',
        sort: string = 'title',
        direction: string = 'asc'
    ) {
        const config = useRuntimeConfig();
        loading.value = true;
        page.value = pageArg;
        limit.value = limitArg;

        const queryParams = new URLSearchParams({
            _page: pageArg.toString(),
            _limit: limitArg.toString(),
            _sort: sort,
            _order: direction,
            title_like: search
        }).toString();

        try {
            const response = await fetch(`${config.public.baseUrl}posts?${queryParams}`)
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

    return {posts, loading, error, fetchPosts, page, totalCount, limit};
}
