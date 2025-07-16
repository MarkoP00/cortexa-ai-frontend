<template>
  <div class="fixed bottom-0 right-0 w-full flex justify-center xl:p-2 sm:p-0">
    <div
      class="p-4 bg-gray-800 flex justify-center items-center w-full max-w-3xl rounded-lg">
      <input
        type="text"
        class="flex-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none"
        v-model="message"
        placeholder="Send a message"
        @keyup.enter="sendMessage" />

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

const emit = defineEmits(["send"]);

const sendMessage = () => {
  if (!message.value.trim()) return;
  emit("send", message.value);
  message.value = "";
};
</script>
