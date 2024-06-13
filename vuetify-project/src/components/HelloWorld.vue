<template>
  <v-container class="fill gradient">
    <v-snackbar v-model="snackbar" location="top" :timeout="5000" :color="snackbarColor">
      {{ snackbarInfo }}
    </v-snackbar>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="mx-auto glossy" style="padding: 50px;" v-if="registered">
          <v-card-text class="d-flex flex-column justify-center align-center">
            <span>Kliknij w celu weryfikacji konta, link ważny przez godzinę!</span>
            <v-btn color="primary" @click="openNewWindow()">Weryfikacja</v-btn>
            <v-btn color="primary" @click="registered = false" class="mt-4">Back to Login</v-btn>
          </v-card-text>
        </v-card>
        <transition v-if="!registered">
          <v-card class="mx-auto glossy" max-width="500" :class="{ 'short': isLoginForm, 'tall': !isLoginForm }"
            style="padding: 5px;">
            <v-card-title class="text-center">{{ isLoginForm ? 'Login' : 'Register' }}</v-card-title>
            <v-card-text>
              <v-form>
                <v-text-field v-model="email" label="Email" outlined required></v-text-field>
                <v-text-field v-model="pass" label="Password" outlined required type="password"></v-text-field>
                <v-text-field v-if="!isLoginForm" v-model="name" label="First name" outlined required></v-text-field>
                <v-text-field v-if="!isLoginForm" v-model="lastName" label="Last name" outlined required></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions v-if="!isLoading">
              <v-btn color="primary" @click="isLoginForm ? login() : register()" class="mr-4">{{ isLoginForm ? 'Login' :
      'Register' }}</v-btn>
              <v-btn color="secondary" @click="toggleForm">{{ isLoginForm ? 'Go to Register' : 'Back to Login'
                }}</v-btn>
            </v-card-actions>
            <v-progress-circular indeterminate color="primary" v-if="isLoading"
              style="margin-left: 10px;"></v-progress-circular>
          </v-card>
        </transition>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.glossy {
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  background-color: rgba(20, 20, 20, 0.3);
}

.short {
  max-height: 300px;
  height: 290px;
  transition: all 0.5s ease-in-out;
}

.tall {
  max-height: 470px;
  height: 440px;
  transition: all 0.5s ease-in-out;
}

.stretch-enter-active {
  transition: all .5s;
}

.stretch-leave-active {
  transition: all .5s;
}

.fill {
  height: 100vh;
  width: 100vw;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.gradient {
  background: linear-gradient(286deg, #800096, #9300c8, #8a00e2, #4b0082);
  background-size: 800% 800%;

  -webkit-animation: AnimationName 10s ease infinite;
  -moz-animation: AnimationName 10s ease infinite;
  animation: AnimationName 10s ease infinite;
}

@-webkit-keyframes AnimationName {
  0% {
    background-position: 0% 50%;
    background: linear-gradient(200deg, #800096, #9300c8, #8a00e2, #4b0082);
  }

  50% {
    background-position: 100% 50%;
    background: linear-gradient(250deg, #800096, #9300c8, #8a00e2, #4b0082);
  }

  100% {
    background-position: 0% 50%;
    background: linear-gradient(300deg, #800096, #9300c8, #8a00e2, #4b0082);
  }
}

@-moz-keyframes AnimationName {
  0% {
    background-position: 0% 50%;
    background: linear-gradient(100deg, #800096, #9300c8, #8a00e2, #4b0082);
  }

  50% {
    background-position: 100% 50%
  }

  100% {
    background-position: 0% 50%
  }
}

@keyframes AnimationName {
  0% {
    background-position: 0% 50%
  }

  50% {
    background-position: 100% 50%
  }

  100% {
    background-position: 0% 50%
  }
}
</style>

<script setup>
import { ref } from 'vue';
import { postDataNoToken } from '@/api';
import { useAppStore } from '@/stores/app.js';
import router from '@/router/index.js';

const email = ref('');
const pass = ref('');
const name = ref('');
const lastName = ref('');
const isLoginForm = ref(true);
const isLoading = ref(false);
const snackbar = ref(false);
const snackbarInfo = ref('Error');
const snackbarColor = ref('error');
const registered = ref(false);
const registeredInfo = ref('Error');

const login = async () => {
  isLoading.value = true;
  const form = new FormData();
  form.append('data', `{ "email": "${email.value}", "pass": "${pass.value}"}`);
  const response = await postDataNoToken('/api/users/login', form)
  if (response.includes('Token')) {
    toogleSnackbar('User logged in successfully', 'success');
    isLoading.value = false;
    const token = response.match(/Token:(.+)/)[1];
    const store = useAppStore();
    //const router = useRouter();
    store.setToken(token);
    //router.push('/home');
  } else {
    toogleSnackbar(response, 'error');
    isLoading.value = false;
  }

};

const register = async () => {
  isLoading.value = true;
  const form = new FormData();
  form.append('data', `{ "email": 
      "${email.value}", "pass": "${pass.value}", "name": "${name.value}", "lastName": "${lastName.value}"}`);
  console.log(form);
  const response = await postDataNoToken('/api/users/register', form);
  console.log('b ' + response);
  if (response.includes('Skopiuj')) {
    toogleSnackbar('User registered successfully', 'success');
    isLoading.value = false;
    const url = response.match(/Skopiuj poniższy link do przeglądarki (.+) w celu potwierdzenia konta Uwaga: link jest ważny przez godzinę/)[1];
    registered.value = true;
    registeredInfo.value = url;
    isLoginForm.value = true;
  } else {
    toogleSnackbar(response, 'error');
    isLoading.value = false;
  }
};

const toggleForm = () => {
  isLoginForm.value = !isLoginForm.value;
};

const toogleSnackbar = (info, color) => {
  snackbarColor.value = color;
  snackbarInfo.value = info;
  snackbar.value = true;
  setTimeout(() => {
    snackbar.value = false;
  }, 5000);
};

const openNewWindow = () => {
  window.open(registeredInfo.value, '_blank');
};
</script>