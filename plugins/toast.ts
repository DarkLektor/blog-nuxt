import {Toast} from "bootstrap";

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.provide('showToast', (message: string) => {
        const toastEl = document?.createElement('div');
        toastEl.classList.add('toast', 'show', 'align-items-center', 'text-white', 'bg-primary', 'border-0', 'mb-2', 'fade');
        toastEl.role = 'alert';
        toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body">${message}</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;

        document?.body?.appendChild(toastEl);

        const toast = new Toast(toastEl, {
            autohide: true,
            delay: 5000
        });
        toast.show();
    });
});
