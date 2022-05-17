<template>
  <div class="container-fluid rounded-3 bg-light shadow-lg">
    <div class="row p-3">
      <div class="text-center">
        <h6 class="m-0 fw-bold">Horario 1</h6>
      </div>
    </div>
    <div class="row pe-3 ps-3 pb-0 pt-0 schedule">
      <table class="table table-responsive m-0 table-bordered ">
        <thead class="sticky-top">
        <tr>
          <th scope="col" class="bg-success cell ">Hora/Día</th>
          <th v-for="day in days" :key="day" scope="col" class="bg-success text-white cell">{{ day }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="hour in hours" :key="hour">
          <th scope="row" class="bg-success text-white cell">{{ hour }}</th>
          <td v-for="n in 7" class="empty-cell">Libre</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="row p-3">
      <div class="col-lg-6 col-md-6 col-sm-6">
        <div class="row mb-3">
          <label for="inputEmail3" class="col-sm-2 col-form-label p-2">Exportar:</label>
          <div class="col-sm-6  p-2">
            <v-select :options="options.export" v-model="option"></v-select>
          </div>
          <div class="col-sm-4 p-2">
            <button type="submit" class="btn btn-primary text-white" @click.prevent="selectExport"><i
                class="fa-solid fa-download"></i></button>
          </div>
        </div>
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6">
        <div class="text-center">
          <nav aria-label="Page navigation example" class="p-2">
            <ul class="pagination justify-content-end">
              <li class="page-item disabled">
                <a class="page-link"><i class="fa-solid fa-angle-left"></i></a>
              </li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item active"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#"><i class="fa-solid fa-angle-right"></i></a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const hours = [
  "07:00:00",
  "07:30:00",
  "08:00:00",
  "08:30:00",
  "09:00:00",
  "09:30:00",
  "10:00:00",
  "10:30:00",
  "11:00:00",
  "11:30:00",
  "12:00:00",
  "12:30:00",
  "13:00:00",
  "13:30:00",
  "14:00:00",
  "14:30:00",
  "15:00:00",
  "15:30:00",
  "16:00:00",
  "16:30:00",
  "17:00:00",
  "17:30:00",
  "18:00:00",
  "18:30:00",
  "19:00:00",
  "19:30:00",
  "20:00:00",
  "20:30:00",
  "21:00:00",
  "21:30:00"
];
const days = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo"
];
import xlsx from 'xlsx/dist/xlsx.full.min'

export default {
  name: 'TableSchedule',
  data() {
    return {
      days,
      hours,
      option: "",
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
  methods: {
    exportExcel() {
      const XLSX = xlsx;
      let workbook = XLSX.utils.book_new();//creamos nuevo libro excel
      let worksheet = XLSX.utils.aoa_to_sheet(this.data); // cramos la hoja y la informacion de la hoja
      XLSX.utils.book_append_sheet(workbook, worksheet, "Horario", true); // se construye el doc excel
      XLSX.writeFile(workbook, 'prueba 1.xlsx');
    },
    exportPdf() {

    },
    selectExport(){
      if(this.option === 'Excel'){
        this.exportExcel()
      }
      if(this.option === 'Pdf'){

      }
    }
  }
}
</script>

<style>

</style>
