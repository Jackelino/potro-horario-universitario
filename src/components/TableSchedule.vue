<template>
  <div class="container-fluid pb-2">
    <div class="row p-3">
      <div class="text-center">
        <h5 class="m-0 fw-bold">{{ scheduleView.nameSchedule }}</h5>
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
          <td v-for="(day, idx) in days" :class="gridView[hour][day].style"
              :key="idx"
              class="colored-block center-label">
            {{ gridView[hour][day].label }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="row p-1" v-show="validateExport">
      <div class="col-lg-6 col-md-6 col-sm-6">
        <div class="row mb-3">
            <label for="inputEmail3" class="col-sm-2 col-form-label p-2">Exportar:</label>
            <div class="col-sm-6 p-2 ">
              <v-select :class="validateOption" :options="options.export" v-model="option" placeholder="Elige un formato" required></v-select>
              <div class="invalid-feedback">
                Elige un formato.
              </div>
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
import {ScheduleView} from "../lib/gridUtils.js";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default {
  name: 'TableSchedule',
  props: {
    scheduleView: Object,
    resultSchedule: Array
  },
  data() {
    return {
      days,
      hours,
      option: null,
      flagOption: false,
      options: {
        export: [
          "Excel",
          "Pdf"
        ],
      },
      data: null
    };
  },
  computed: {
    // La variable gridview almacena de manera matricial todos los Blocks
    // (uno para cada día x hora)
    gridView() {
      let gridView = instanceGridView();
      if (this.scheduleView.schedule) {
        let grids = this.scheduleView.schedule.grids;
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
        this.data = gridView
        return gridView;
      }
    },
    validateExport() {
      return this.scheduleView.schedule.grids.length !== 0 ? true : false;
    },
    validateOption(){
      if(this.flagOption === true){
        return this.option === null ? 'is-invalid': '';
      }

    }
  },
  methods: {
    exportExcel() {
      // se nesesita generar un arreglo de arreglos
      // [ ['1', '2','3'] ]
      let arraySchedule = []; // arreglo principal
      let arrayRow = []; // arreglo para para generar una fila
      arraySchedule.push(['Hora\\Día'].concat(this.days)) // encabezado de la tabla
      let i = 0;
      for (let hour in this.data) {
        arrayRow = []; // se reinicia el arreglo para generar una nueva fila
        arrayRow.push(this.hours[i]); // este elemento es el horario que se muestra en la columna uno "Hora\Día"
        let days = this.data[hour]
        for (let day in days) {
          if (days[day].grids.length > 0) {
            arrayRow.push(days[day].grids[0].data.nombre + '\n' + days[day].grids[0].data.profesor + '\n' + days[day].grids[0].data.grupo);
          } else {
            arrayRow.push('');
          }
        }
        arraySchedule.push(arrayRow) // agregamos la nueva fila
        i++;
      }

      const XLSX = xlsx;
      let workbook = XLSX.utils.book_new();//creamos nuevo libro excel
      let worksheet = XLSX.utils.aoa_to_sheet(arraySchedule); // cramos la hoja y la informacion de la hoja
      XLSX.utils.book_append_sheet(workbook, worksheet, this.scheduleView.nameSchedule, true); // se construye el doc excel
      XLSX.writeFile(workbook, this.scheduleView.nameSchedule + '.xlsx');
    },
    exportPdf() {
      // se nesesita generar un arreglo de arreglos
      // [ ['1', '2','3'] ]
      let arraySchedule = []; // arreglo principal
      let arrayRow = []; // arreglo para para generar una fila
      let i = 0;
      let arrayColor = [
        '#F8D7DA',
        '#CFE2FF',
        '#D7F0DD',
        '#FFF3CD',
        '#DADCF8',
        '#CDF5F1',
        '#f5cdf4',
        '#f5d9cd'
      ]; /// arreglo de los estilos
      arraySchedule.push(['Hora\\Día'].concat(this.days)) // encabezado de la tabla
      for (let hour in this.data) {
        arrayRow = []; // se reinicia el arreglo para generar una nueva fila
        arrayRow.push({
          text: this.hours[i],
          fillColor: '#477551',
          color: '#fff',
          bold: true,
          alignment: 'center',
          justifyContent: 'center'
        }); // este elemento es el horario que se muestra en la columna uno "Hora\Día"
        let days = this.data[hour]
        for (let day in days) {
          if (days[day].grids.length > 0) {
            let indexColor = days[day].grids[0].style; // obtenemos el estilo
            indexColor = parseInt(indexColor.charAt(indexColor.length - 1), 10); // obtenemos el numero de estilo
            arrayRow.push({
              text: days[day].grids[0].data.grupo,
              color: '#313131',
              fillColor: arrayColor[indexColor - 1],
              alignment: 'center'
            });
          } else {
            arrayRow.push({
              text: '',
              fillColor: '#ffffff'
            });
          }
        }
        arraySchedule.push(arrayRow) // agregamos la nueva fila
        i++;
      }
      /////////////////////// simbologia
      let grids = this.scheduleView.schedule.grids;
      let arraySimbology = [];
      let arraySubject = [];
      arraySimbology.push(['Materia', 'Color'])
      for (let grid = 0; grid < grids.length; grid++) {
        arraySubject = []
        let indexColo = grids[grid].style; // obtenemos el estilo
        indexColo = parseInt(indexColo.charAt(indexColo.length - 1), 10)
        arraySubject.push({
          text: grids[grid].data.nombre + '\n' + grids[grid].data.profesor + '\n' + grids[grid].data.grupo,
          alignment: 'left'
        });
        arraySubject.push(
            {
              text: '',
              fillColor: arrayColor[indexColo - 1]
            });
        arraySimbology.push(arraySubject);
      }
      let docDefinition = {
        pageOrientation: 'landscape',
        content: [
          {text: this.scheduleView.nameSchedule, style: 'header1'},
          {
            //layout: 'lightHorizontalLines', // optional
            style: 'table',
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 1,
              widths: ['*', '*', '*', '*', '*', '*', '*', '*'],
              body: arraySchedule
            }
          },
          {text: 'Simbologia', style: 'header2'},
          {
            widths: ['*', '*'],
            table: {
              body: arraySimbology
            }
          }
        ],
        styles: {
          header1: {
            fontSize: 22,
            bold: true,
            alignment: 'center',
            margin: [0, 0, 0, 10]
          },
          header2: {
            fontSize: 22,
            bold: true,
            alignment: 'left',
            margin: [0, 10, 0, 10]
          },
          table: {
            alignment: 'center',
            fillColor: '#477551',
            color: '#e5e5e5',
            bold: true,
          }
        }
      };
      const pdf = pdfMake.createPdf(docDefinition)
      pdf.open();
    },
    selectExport() {
      this.flagOption = true;
      if (this.option === 'Excel') {
        this.exportExcel();
      }else if (this.option === 'Pdf') {
        this.exportPdf();
      }
    }
  }
}
</script>

<style scoped>
.center-label {
  text-align: center;
}

</style>
