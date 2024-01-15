<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-form @submit.prevent>
        <v-table>
          <tbody>
            <tr v-for="item in data" :key="item.name">
            <td><v-text-field v-model="item.value" :label="item.label"></v-text-field></td>
            </tr>
          </tbody>
        </v-table>
        <v-file-input v-model="thumb" accept="image/*" show-size label="Thumb image"></v-file-input>
        <v-btn type="submit" block class="mt-2" @click="upload">Submit</v-btn>
        <v-row>
          <v-col v-if="doi"><a :href="doi" _target="_doi">doi</a><br/></v-col>
          <v-col v-if="link"><a :href="link" _target="_link">link</a></v-col>
        </v-row>
        <v-img :src="image_url"/>
      </v-form>
    </v-responsive>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { fetchData, postData } from './api'
  var data =ref([{ "name": "", "label":"", "value": "" }])
  var thumb_init = ref("")
  var thumb = ref();
  (async () => {
    // console.log('fetch');
    try {
      const response = await fetchData();
      data.value=response.data.json;
      thumb_init.value = response.data.thumb;
      // console.log(thumb_init.value);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  })()
  var image_url = computed(()=>{
    //console.log("image_url: "+thumb_init.value);
    if (!thumb.value) return thumb_init.value;
    var url= URL.createObjectURL(thumb.value[0]);
    return url;
  })
  var doi = computed(()=>{
    let item=data.value.find(x=>x.name=='doi');
    return item?item.value:'';
  })
  var link = computed(()=>{
    let item=data.value.find(x=>x.name=='full_text_link');
    return item?item.value:'';
  })
  const upload = async () => {
    // console.log('Method called');
    try {
      const response = await postData(data.value, thumb.value[0]);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

</script>
