<template>
  <ion-page>
    <ion-content>
      <!-- Tombol Refresh -->
      <div class="top">
        <ion-button color="primary" @click="loadData" :disabled="loading">
          Refresh
        </ion-button>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="center">
        <ion-spinner name="dots"></ion-spinner>
        <p>Memuat data...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="center err">{{ error }}</div>

      <!-- Daftar cryptocurrency -->
      <ion-list v-else lines="full" class="list">
        <ion-item v-for="c in coins" :key="c.id" class="row">
          <div class="cell rank">
            <small>Rank</small>
            <span class="big">{{ c.rank }}</span>
          </div>
          <div class="cell name">
            <small>{{ c.name }}</small>
            <span class="big">{{ c.symbol }}</span>
          </div>
          <div class="cell price">
            <small>USD</small>
            <span class="big">{{ c.price_usd }}</span>
          </div>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonButton, IonList, IonItem, IonSpinner } from '@ionic/vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Coin {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  price_usd: string;
}

const coins = ref<Coin[]>([]);
const loading = ref(true);
const error = ref('');

const loadData = async () => {
  loading.value = true;
  error.value = '';
  try {
    const response = await axios.get('https://api.coinlore.net/api/tickers/');
    // data cryptocurrency ada di response.data.data
    coins.value = response.data.data.map((c: any) => ({
      id: c.id,
      rank: c.rank,
      name: c.name,
      symbol: c.symbol,
      price_usd: c.price_usd,
    }));
  } catch (err) {
    console.error('Error fetching data', err);
    error.value = 'Gagal memuat data. Periksa koneksi internet.';
  } finally {
    loading.value = false;
  }
};

onMounted(loadData);
</script>

<style scoped>
.top { text-align: center; padding: 8px 0; }
.center { text-align: center; padding: 24px; }
.err { color: #e53935; }
.list { padding: 0; }
.row {
  --background: #fff3cd;
  --border-color: #e6d28a;
  --padding-start: 12px;
}
.cell { display: flex; flex-direction: column; padding: 6px 0; }
.cell small { font-size: 11px; color: #333; }
.cell .big { font-size: 20px; font-weight: 500; color: #000; }
.rank { width: 20%; }
.name { width: 40%; }
.price { width: 40%; }
</style>
