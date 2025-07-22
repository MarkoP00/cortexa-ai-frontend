<template>
  <section class="mt-8">
    <Spinner
      v-if="loading"
      class="mb-4" />

    <form
      @submit.prevent="createAccount"
      class="space-y-4 fade-slide-in">
      <h2 class="text-2xl font-semibold text-center mb-4 pb-1 relative">
        Sign up
        <span
          class="absolute bottom-0 left-0 right-0 mx-auto w-16 h-0.5 bg-blue-400 rounded-full"></span>
      </h2>

      <input
        type="text"
        v-model="name.value"
        :class="[
          'w-full p-3 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 ',
          name.invalid
            ? 'border border-red-400 focus:ring-red-400 shadow-lg shadow-red-400/20'
            : 'bg-gray-700 focus:ring-blue-500',
        ]"
        @blur="name.invalid = false"
        placeholder="Enter your name" />

      <input
        type="text"
        v-model="email.value"
        :class="[
          'w-full p-3 text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 ',
          email.invalid
            ? 'border border-red-400 focus:ring-red-400 shadow-lg shadow-red-400/20'
            : 'bg-gray-700 focus:ring-blue-500',
        ]"
        @blur="email.invalid = false"
        placeholder="Enter your email" />

      <button
        type="submit"
        class="w-full p-3 bg-blue-600 rounded-md font-medium hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        :disabled="loading">
        {{ loading ? "Creating..." : "Create Account" }}
      </button>

      <div class="text-center mt-4">
        <button
          type="button"
          class="text-sm text-blue-400 cursor-pointer hover:underline hover:text-blue-300"
          @click="handleEmit">
          Already have an account?
        </button>
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref } from "vue";
import Spinner from "./Spinner.vue";
import callToast from "../services/callToast.js";
import checkEmail from "../services/checkEmail";
import axios from "axios";
import { useUserStore } from "../stores/user.js";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const loading = ref(false);
const router = useRouter();

const emit = defineEmits(["toggle-forms"]);

const name = ref({
  value: "",
  invalid: false,
});

const email = ref({
  value: "",
  invalid: false,
});

async function createAccount() {
  name.value.invalid = false;
  email.value.invalid = false;

  const nameValue = name.value.value.trim();
  const emailValue = email.value.value.trim();

  if (!nameValue || nameValue.length < 3) {
    name.value.invalid = true;
    callToast("Name is required. Please enter your name.", "warning");
    return;
  }
  if (!checkEmail(emailValue)) {
    email.value.invalid = true;
    callToast("Invalid email. Please enter valid email address.", "warning");
    return;
  }

  loading.value = true;

  const convertedEmail = emailValue.replace(/[^a-zA-Z0-9_-]/g, "_");

  try {
    // Check if email is already in use / has registered user
    const checkUser = await axios.post(
      `${import.meta.env.VITE_API_URL}/check-user`,
      {
        userId: convertedEmail,
      }
    );

    const isExisting = checkUser.data.existingUser;

    if (isExisting.length > 0) {
      callToast("Email already in use.", "warning");
      loading.value = false;
      return;
    }

    // Register user
    const registerRes = await axios.post(
      `${import.meta.env.VITE_API_URL}/register-user`,
      {
        name: nameValue,
        email: emailValue,
      }
    );

    callToast("User successfully registered! Logging in...", "success");

    const userData = registerRes.data;

    userStore.setUser({
      userId: userData.userId,
      name: userData.name,
      email: userData.email,
    });

    setTimeout(() => {
      loading.value = false;
      router.push("/chat");
    }, 2000);
  } catch (error) {
    console.log("An error occured while creating account: ", error);
    callToast("An error occured while creating account..."), "error";
    loading.value = false;
  }
}

function handleEmit() {
  emit("toggle-forms");
}
</script>
