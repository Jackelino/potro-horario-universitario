<template>
  <div class="container-fluid">
    <div class="row p-3">
      <div class="text-center">
        <h6 class="m-0 fw-bold">Horario 1</h6>
      </div>
    </div>
    <div class="row pe-3 ps-3 pb-0 pt-0 schedule">
      <table class="table table-responsive m-0 table-bordered ">
        <thead class="sticky-top">
        <tr>
          <th scope="col" class="bg-success text-white cell">Hora\Día</th>
          <th v-for="day in days" :key="day" scope="col" class="bg-success text-white cell">{{ day }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="hour in hours" :key="hour">
          <th scope="row" class="bg-success text-white cell">{{ hour }}</th>
          <td v-for="day in days" :class="gridView[hour][day].style"
          class="colored-block">

          {{gridView[hour][day].label}}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="row p-1">
      <div class="col-lg-6 col-md-6 col-sm-6">
        <div class="row mb-3">
          <label for="inputEmail3" class="col-sm-2 col-form-label p-2">Exportar:</label>
          <div class="col-sm-6 p-2 ">
            <v-select class="" :options="options.export" v-model="option" placeholder="Elige un formato"></v-select>
          </div>
          <div class="col-sm-4 p-2">
            <button type="submit" class="btn btn-primary text-white" @click.prevent="selectExport"><i
                class="fa-solid fa-download"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {days, hours} from "../lib/dateTimeConstants";
import {instanceGridView, getBlocks} from "../lib/block";
import xlsx from 'xlsx/dist/xlsx.full.min';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import {ScheduleView } from "../lib/gridUtils.js";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  name: 'TableSchedule',
  props:{
    scheduleView: ScheduleView 
  },
  data() {
    return {
      days,
      hours,
      option: null,
      options: {
        export: [
          "Excel",
          "Pdf"
        ],
      },
      data: [
        ["Profesor", "Clave", "Materia"],
        ["A2", "B2", "C2"],
        ["A3", "B3", "C3"]
      ]
    };
  },
  computed:{
    // La variable gridview almacena de manera matricial todos los Blocks
    // (uno para cada día x hora)
    gridView() {
        let gridView = instanceGridView();
        if(this.scheduleView){
            let grids = this.scheduleView.grids;
            for (const grid of grids) {
                const DAYS = 7;
                for (let j = 0; j < DAYS; j++) {
                    if (grid.time_values[j]) {
                        let start = grid.time_values[j][0];
                        let end = grid.time_values[j][1];
                        let blocks = getBlocks(start, end);
                        let day = days[j];
                        for (const block of blocks) {
                            gridView[block][day].pushGrid(grid);
                        }
                    }
                }
            }
            return gridView;
    }

        }
      
  },
  methods: {
    exportExcel() {
      const XLSX = xlsx;
      let workbook = XLSX.utils.book_new();//creamos nuevo libro excel
      let worksheet = XLSX.utils.aoa_to_sheet(this.data); // cramos la hoja y la informacion de la hoja
      XLSX.utils.book_append_sheet(workbook, worksheet, "Horario", true); // se construye el doc excel
      XLSX.writeFile(workbook, 'prueba 1.xlsx');
    },
    exportPdf() {
      let docDefinition = {
        content: [
          {text: 'Horario 1', style: 'header'},
          {
            layout: 'lightHorizontalLines', // optional
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*', 'auto', 100, '*'],

              body: [
                ['Hora/Día', 'Lunes', 'Martes', 'Miercoles'],
                ['Value 1', 'Value 2', 'Value 3', 'Value 4'],
                [{text: 'Bold value', bold: true}, 'Val 2', 'Val 3', 'Val 4']
              ]
            }
          }
        ],
        styles: {
          header: {
            fontSize: 22,
            bold: true,
            alignment: 'center'
          }
        }
      };
      const pdf = pdfMake.createPdf(docDefinition)
      pdf.open();
    },
    selectExport() {
      if (this.option === 'Excel') {
        this.exportExcel();
      }
      if (this.option === 'Pdf') {
        this.exportPdf();
      }
    }
  }
}
</script>

<style>

</style>
