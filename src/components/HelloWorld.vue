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
  import { assertExpressionStatement } from '@babel/types';
import { ref, computed } from 'vue'
import { fetchData } from './api'
  
  var data =ref(
    [
      { "name": "fname", "label":"ID", "value": "2023-01-08-zhang_nmethods_2024"},
      { "name": "title", "label":"Title", "value": "A fast, scalable and versatile tool for analysis of single-cell omics data"},
      { "name": "authors", "label":"Authors", "value": "Kai Zhang, Nathan R Zemke, Ethan J Armand, Bing Ren"},
      { "name": "journal", "label":"Journal", "value": "Nature Methods"},
      { "name": "doi", "label":"doi", "value": "https://doi.org/10.1038/s41592-023-02139-9"},
      { "name": "abstract", "label":"Abstract", "value": "Single-cell omics technologies have revolutionized the study of ..."},
      { "name": "teaser", "label":"Teaser", "value": "A fast, scalable and versatile tool for analysis of single-cell omics data"},
      { "name": "full_text_link", "label":"Full text link", "value": "https://www.nature.com/articles/s41592-023-02139-9"}
    ])
  var thumb = ref()
  var image_url = computed(()=>{
    if (!thumb.value) return;
    return URL.createObjectURL(thumb.value[0]);
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
    console.log('Method called');
    try {
      const response = await fetchData();
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

</script>
