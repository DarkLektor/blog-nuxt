export function useDebounce() {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    function debounce(callback: Function, delay: number = 300) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            callback();
        }, delay);
    }

    return {debounce};
}
