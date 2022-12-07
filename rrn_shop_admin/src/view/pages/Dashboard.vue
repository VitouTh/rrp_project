<template>
  
  <div class="p-12">
    <button class="btn btn-light-primary btn-bold" @click="onLogout" v-if="userType === 3">
              {{ $t("MENU.LOGOUT.TITLE") }}
            </button>
    <h1 class="col-lg-12 col-xxl-12 text-center">ยอดวิวสะสมของแต่ละ Content</h1>
    <apexchart
      style="width: 100%"
      type="bar"
      height="350"
      :options="contentChartOptions"
      :series="contentSeries"
    ></apexchart>
    
    <h1 class="col-lg-12 col-xxl-12 text-center">
      ยอดคลิกสะสมของแต่ละ Banner
    </h1>
    <apexchart
      style="width: 100%"
      type="bar"
      height="350"
      :options="bannerChartOptions"
      :series="bannerSeries"
    ></apexchart>
  </div>
</template>

<script>
  import { SET_BREADCRUMB } from "@/core/services/store/breadcrumbs.module";
  import { LOGOUT, PURGE_AUTH } from "@/core/services/store/auth.module";
  import Swal from "sweetalert2";
  import {
    CONTENT_VIEW,
    CONTENT_VIEW_CLICK_BANNER
  } from "@/core/services/store/dashboard.module";
  import { mapState } from "vuex";

  export default {
    name: "Dashboard",
    components: {},
    computed: {
    ...mapState({
      userType: state => state.auth.userType
    }),
  },
    data() {
      return {
        colorsBanner: [
          { content_type_id: 1, color: "#3F066C" },
          { content_type_id: 2, color: "#D64545" },
          { content_type_id: 3, color: "#E71B24" },
          { content_type_id: 4, color: "#FEC107" },
          { content_type_id: 5, color: "#2A4069" },
          { content_type_id: 6, color: "#000000" },
          { content_type_id: 7, color: "#7DB545" },
          { content_type_id: 8, color: "#EE4D4D" },
          { content_type_id: 9, color: "#391C38" }
        ],

        //content
        contentChartOptionsRes: [],
        contentSeriesRes: [],

        contentChartOptions: {
          chart: {
            id: "contentChart"
          },
          dataLabels: {
            enabled: false
          },

          colors: [
            "#3F066C",
            "#D64545",
            "#E71B24",
            "#FEC107",
            "#2A4069",
            "#000000",
            "#7DB545",
            "#EE4D4D",
            "#391C38"
          ],
          plotOptions: {
            bar: {
              distributed: true,
              horizontal: false,
              dataLabels: {
                position: "bottom"
              },
              columnWidth: ["30%"],
              endingShape: "rounded"
            }
          },

          theme: {
            palette: "palette1"
          },

          xaxis: {
            categories: []
          }
        },
        contentSeries: [
          {
            name: "series-1",
            data: []
          }
        ],
        // banner

        bannerChartOptionsRes: [],
        bannerSeriesRes: [],

        bannerChartOptions: {
          chart: {
            id: "bannerChart"
          },
          dataLabels: {
            enabled: false
          },

          plotOptions: {
            bar: {
              distributed: true,
              horizontal: false,
              dataLabels: {
                position: "bottom"
              },
              columnWidth: ["30%"],
              endingShape: "rounded"
            }
          },

          xaxis: {
            categories: []
          }
        },
        bannerSeries: [
          {
            name: "series-1",
            data: []
          }
        ]
      };
    },
    mounted() {
      console.log(this.userType);
      this.$store.dispatch(SET_BREADCRUMB, [
        { title: `${this.$t("MENU.DASHBOARD.TITLE")}` }
      ]);

      this.fetchDataContentView();
      this.fetchDataContentViewClickBanner();
    },
    methods: {
      async fetchDataContentView() {
        this.$store.dispatch(CONTENT_VIEW).then((res) => {
          if (res.data.status == "success") {
            for (let i = 0; i < res.data.data.length; i++) {
              this.contentChartOptionsRes.push(
                res.data.data[i].content_type.name
              );
              this.contentSeriesRes.push(res.data.data[i].viewed);
            }
            this.contentChartOptions = {
              xaxis: {
                categories: this.contentChartOptionsRes
              }
            };
            this.contentSeries = [
              {
                data: this.contentSeriesRes
              }
            ];
          }
        });
      },

      async fetchDataContentViewClickBanner() {
        this.$store.dispatch(CONTENT_VIEW_CLICK_BANNER).then((res) => {
          if (res.data.status == "success") {
            let colorsBanners = [];
            for (let i = 0; i < res.data.data.length; i++) {
              this.bannerChartOptionsRes.push(res.data.data[i].content_type.name);
              this.bannerSeriesRes.push(res.data.data[i].banner_click);

              // หาสีให้ตรงกับ content
              for (let j = 0; j < this.colorsBanner.length; j++) {
                if (
                  this.colorsBanner[j].content_type_id ==
                  res.data.data[i].content_type_id
                ) {
                  colorsBanners.push(this.colorsBanner[j].color);
                }
              }
            }

            this.bannerChartOptions = {
              colors: colorsBanners,
              xaxis: {
                categories: this.bannerChartOptionsRes
              }
            };
            this.bannerSeries = [
              {
                data: this.bannerSeriesRes
              }
            ];
          }
        });
      },
      onLogout() {
      this.$store
        .dispatch(LOGOUT)
        .then(({ data }) => {
          if (data && data.status === "success") {
            this.$store.commit(PURGE_AUTH);
            this.$router.push("/login");
          } else if (data && data.status === "error") {
            Swal.fire({
              title: "",
              icon: "error",
              text: `${data.error}`
            });
            this.$store.commit(PURGE_AUTH);
            this.$router.push("/login");
          }
        })
        .catch(error => {
          Swal.fire({
            title: "",
            icon: "error",
            text: `${error.error}`
          });
        });
    },
    }
  };
</script>

<style>
  .apexcharts-legend {
    display: none !important;
  }
</style>
