<template>
  <div class="fixed bottom-0 right-0 w-full flex justify-center xl:p-2 sm:p-0">
    <div
      class="p-4 bg-gray-800 flex justify-center items-center w-full max-w-3xl rounded-lg">
      <textarea
        id="chat-input"
        ref="textareaRef"
        class="flex-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none resize-none overflow-y-auto transition-all duration-200"
        v-model="message"
        placeholder="Send a message"
        rows="1"
        @input="autoResize"
        @keyup.enter="sendMessage"></textarea>

      <button
        @click="sendMessage"
        :class="[
          'ml-2 px-4 py-2 rounded-lg transition-all duration-200',
          message.length > 0
            ? 'bg-blue-600 hover:bg-blue-500 cursor-pointer'
            : 'bg-gray-400 ',
        ]"
        :disabled="message.length === 0">
        {{ message.length > 0 ? "Send" : "Type" }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const message = ref("");
const textareaRef = ref<HTMLTextAreaElement | null>(null);

const emit = defineEmits(["send"]);

const sendMessage = () => {
  if (!message.value.trim()) return;
  emit("send", message.value);
  message.value = "";

  // Reset height of textarea
  if (textareaRef.value) {
    textareaRef.value.style.height = "auto";
  }
};

const autoResize = (e: any) => {
  const el = e.target;
  el.style.height = "auto";
  const maxHeight = 3 * 24;
  el.style.height = Math.min(el.scrollHeight, maxHeight) + "px";
};
</script>
