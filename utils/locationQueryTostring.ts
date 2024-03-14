import type {LocationQueryValue} from "vue-router";

export function toStringValue(value: string | LocationQueryValue[] | LocationQueryValue | undefined): string {
    if (Array.isArray(value)) {
        return value[0] || '';
    }
    return value || '';
}
