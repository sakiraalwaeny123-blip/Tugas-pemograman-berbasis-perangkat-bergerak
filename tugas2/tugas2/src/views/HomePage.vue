<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Perkiraan Cuaca Jakarta</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div v-if="loading" style="text-align: center;">
        <ion-spinner name="dots"></ion-spinner>
        <p>Memuat data cuaca....</p>
      </div>

      <div v-else-if="error" style="text-align: center;">
        <p style="color: #e53935;">{{ error }}</p>
      </div>

      <ion-list v-else>
        <ion-item v-for="(w, index) in weatherData" :key="index">
          <ion-label>
            <h2>{{ w.time }}</h2>
            <p>Suhu: {{ w.temperature_2m }}°C</p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonSpinner,
} from '@ionic/vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface WeatherItem {
  time: string;
  temperature_2m: number;
}

const weatherData = ref<WeatherItem[]>([]);
const loading = ref(true);
const error = ref('');

onMounted(async () => {
  try {
    const response = await axios.get(
      'https://api.open-meteo.com/v1/forecast?latitude=-6.2&longitude=106.8&hourly=temperature_2m'
    );
    // ambil 10 data pertama
    const times: string[] = response.data.hourly.time.slice(0, 10);
    const temps: number[] = response.data.hourly.temperature_2m.slice(0, 10);

    weatherData.value = times.map((t, i) => ({
      time: t,
      temperature_2m: temps[i],
    }));
  } catch (err) {
    console.error('Error fetching data', err);
    error.value = 'Gagal memuat data cuaca. Periksa koneksi internet.';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
h2 {
  font-size: 20px;
  font-weight: bold;
}
p {
  margin: 0;
  color: #0a2180;
}
ion-item {
  margin-bottom: 8px;
  border-bottom: 1px solid #0889e6;
}
</style>
