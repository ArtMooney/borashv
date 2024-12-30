<script setup>
import Button from "../../elements/Button.vue";
import Input from "../../elements/Input.vue";
</script>

<template>
  <div class="input-container w-form">
    <form
      @submit.prevent="resetPasswordForm"
      class="login-form"
      data-name="reset-password"
    >
      <div id="w-node-fdb51ec0-2112-7bc5-fc06-a6656f9a439c-d10df2f5">
        Reset password
      </div>
      <input
        v-model="loginEmail"
        type="email"
        class="cms-input w-input"
        maxlength="256"
        name="email"
        placeholder="Enter email address"
        autofocus
      /><input
        type="submit"
        value="Send password reset link"
        data-wait="Please wait..."
        id="w-node-_8862a37a-1930-f237-f612-0f358c05ed9a-d10df2f5"
        class="cms-button login w-button"
      />
      <a
        @click="loginSwitch"
        id="w-node-_5138d100-ab89-8d07-e386-535cf97da3f1-d10df2f5"
        class="text-s pointer"
        >Know your password?</a
      >
    </form>
    <div class="success-message w-form-done">
      An email has been sent to your registered email address with a link to
      reset your password.
    </div>
    <div class="error-message text-s w-form-fail">
      Oops! Something went wrong when sending the reset link.
    </div>
  </div>
</template>

<script>
export default {
  name: "NewPasswordPanel",
};
</script>
