<template>
  <div class="signup">
    <h1> Bienvenue !</h1>
      <img alt="Vue logo" src="../assets/logo.png">
    <AccueilSignup/>
  </div>
</template>

<script>
// @ is an alias to /src
import AccueilSignup from '@/components/AccueilSignup.vue';

export default {
  name: 'Signup',
  components: {
    AccueilSignup
  }
}
</script>