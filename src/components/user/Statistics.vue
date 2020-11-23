<template>
  <div class="p-4">
    <div class="row">
      <div class="col-lg-6 col-xl-4">
        <div class="mb-4 card">
          <div class="card-header">
            <font-awesome-icon icon="crown" />
            Rangliste
          </div>
          <h3 class="font-weight-bold m-4">Plätze</h3>
          <chart1 :height="165" />
          <div class="pt-2 card-body">
            <h6 class="text-muted text-uppercase mb-2">Erledigte Platten</h6>
            <!-- TODO max height -->
            <div class="overflow-auto">
              <ul class="list-group list-group-flush">
                <!-- TODO v-for -->
                <li class="list-group-item p-0">
                  <div class="d-flex align-items-center">
                    <div>
                      <h3 v-if="false" class="m-0 font-weight-bold">14</h3>
                      <font-awesome-icon
                        icon="trophy"
                        size="2x"
                        style="color: gold"
                      />
                    </div>
                    <img
                      width="38"
                      height="38"
                      class="ml-3 rounded-circle"
                      src="@/assets/images/home/1.jpg"
                      alt
                    />
                    <div class="ml-3 flex-grow-1">
                      <div class="mb-0">
                        <small class="font-weight-bold">Josua Frank</small>
                      </div>
                      <div class="mt-0 badge badge-pill badge-dark">
                        Anfänger
                      </div>
                    </div>
                    <div class="ml-3">
                      <h3 class="m-0 font-weight-bold">14</h3>
                    </div>
                    <font-awesome-icon
                      class="ml-2"
                      icon="angle-up"
                      size="2x"
                      style="color: green"
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-12 col-xl-4">
        <div class="mb-4 card">
          <div class="card-header">
            <font-awesome-icon icon="chart-line" />
            Fortschritt
          </div>
          <div class="d-flex align-items-center p-3">
            <vue-circle
              :progress="36"
              :size="104"
              :reverse="true"
              line-cap="round"
              :fill="fill1"
              empty-fill="rgba(0, 0, 0, .1)"
              :animation-start-value="0.0"
              :start-angle="0"
              insert-mode="append"
              :thickness="7"
              :show-percent="true"
            >
            </vue-circle>
            <div class="ml-3">
              <div class="widget-subheading">Fertiggestellt</div>
              <div class="widget-numbers text-info">
                <span class="font-weight-bold">150/500 Platten</span>
              </div>
              <div class="widget-description text-focus">
                Seit letztem Monat
                <span class="text-success pl-1">
                  <font-awesome-icon icon="angle-up" />
                  <span class="pl-1">12</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12 col-lg-6 col-xl-8">
        <div class="mb-4 card">
          <div class="card-header">
            <font-awesome-icon icon="clock" />
            Aktuelle Vorgänge
          </div>
          <div class="table-responsive">
            <table
              class="align-middle mb-0 table table-borderless table-striped table-hover"
            >
              <thead>
                <tr>
                  <th class="text-center">Datum</th>
                  <th>Person</th>
                  <th class="text-center">Bild</th>
                  <th class="text-center">Status</th>
                  <th class="text-center">Fortschritt</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="p-1 text-center align-middle">
                    12. Dez<br />
                    13 Uhr
                  </td>
                  <td class="p-1 align-middle">
                    <div class="d-flex align-items-center">
                      <img
                        width="38"
                        height="38"
                        class="ml-3 rounded-circle"
                        src="@/assets/images/home/1.jpg"
                        alt
                      />
                      <div class="ml-3">
                        <div class="mb-0">
                          <small class="font-weight-bold">Josua Frank</small>
                        </div>
                        <div class="mt-0 badge badge-pill badge-dark">
                          Anfänger
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="text-center align-middle">#222</td>
                  <td class="text-center align-middle">
                    <div class="badge badge-warning">Angefragt</div>
                  </td>
                  <td class="text-center align-middle position-relative">
                    <div class="progress">
                      <div
                        class="progress-bar"
                        role="progressbar"
                        :style="
                          'width: ' + (currentState / (states.length - 1)) * 100 + '%'
                        "
                        aria-valuenow="33"
                        aria-valuemin="0"
                        aria-valuemax="100"
                      ></div>
                    </div>
                    <div
                      class="p-2 position-absolute d-flex align-items-center justify-content-between"
                      style="top: 0; bottom: 0; right: 0; left: 0"
                    >
                      <div
                        v-for="(state, index) in states"
                        :key="state.name"
                        class="rounded-circle stepper-circle"
                        :class="index <= currentState ? 'active' : ''"
                      >
                        <font-awesome-icon class="h-100" :icon="state.icon" />
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="main-card mb-4 card">
      <div class="no-gutters row">
        <div class="col-md-6 col-xl-4">
          <div class="widget-content">
            <div class="widget-content-wrapper">
              <div class="widget-content-right ml-0 mr-3">
                <div class="widget-numbers text-success">1896</div>
              </div>
              <div class="widget-content-left">
                <div class="widget-heading">Total Orders</div>
                <div class="widget-subheading">Last year expenses</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-xl-4">
          <div class="widget-content">
            <div class="widget-content-wrapper">
              <div class="widget-content-right ml-0 mr-3">
                <div class="widget-numbers text-warning">$ 14M</div>
              </div>
              <div class="widget-content-left">
                <div class="widget-heading">Products Sold</div>
                <div class="widget-subheading">Total revenue streams</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-xl-4">
          <div class="widget-content">
            <div class="widget-content-wrapper">
              <div class="widget-content-right ml-0 mr-3">
                <div class="widget-numbers text-danger">45.9%</div>
              </div>
              <div class="widget-content-left">
                <div class="widget-heading">Followers</div>
                <div class="widget-subheading">People Interested</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueCircle from "vue2-circle-progress";
import chart1 from "./chart1";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faBoxCheck } from "@fortawesome/pro-solid-svg-icons";
import {
  faCalendarAlt,
  faAngleDown,
  faStar,
  faAngleUp,
  faTh,
  faBusinessTime,
  faArrowLeft,
  faArrowRight,
  faCog,
  faDotCircle,
  faCrown,
  faTrophy,
  faChartLine,
  faClock,
  faQuestion,
  faTruck,
  faCubes,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faAngleDown,
  faCalendarAlt,
  faStar,
  faAngleUp,
  faTh,
  faBusinessTime,
  faCog,
  faArrowLeft,
  faArrowRight,
  faDotCircle,
  faCrown,
  faTrophy,
  faChartLine,
  faClock,
  faBoxCheck,
  faQuestion,
  faTruck,
  faCubes,
  faCheck
);

export default {
  components: {
    "font-awesome-icon": FontAwesomeIcon,
    VueCircle,
    chart1,
  },
  data: () => ({
    states: [
      { name: "reserved", icon: "box-check" },
      { name: "requested", icon: "question" },
      { name: "in-transit", icon: "truck" },
      { name: "in-progress", icon: "cubes" },
      { name: "finished", icon: "check" },
    ],
    currentState: 2,

    currentPage: 1,
    perPage: 5,
    totalRows: 45,

    fill: { gradient: ["var(--primary)"] },
    fill1: { gradient: ["#2af598", "#009efd"] },
    fill2: { gradient: ["#fccb90", "#d57eeb"] },

    f1: { gradient: ["#3f6ad8"] },
    f2: { gradient: ["#3ac47d"] },
    f3: { gradient: ["#16aaff"] },
    f4: { gradient: ["#f7b924"] },
    f5: { gradient: ["#d92550"] },
    f6: { gradient: ["#444054"] },

    spIndicatorStyles1: false,
    spData2: (() => {
      const len = 10;
      return Array.from(
        {
          length: len,
        },
        () => Math.floor(Math.random() * len)
      );
    })(),
    spCurveStyles2: {
      stroke: "var(--primary)",
      strokeWidth: "2",
    },

    spData1: (() => {
      const len = 10;
      return Array.from(
        {
          length: len,
        },
        () => Math.floor(Math.random() * len)
      );
    })(),
    spCurveStyles1: {
      stroke: "var(--danger)",
      strokeWidth: "2",
    },

    spData3: (() => {
      const len = 10;
      return Array.from(
        {
          length: len,
        },
        () => Math.floor(Math.random() * len)
      );
    })(),
    spCurveStyles3: {
      stroke: "var(--warning)",
      strokeWidth: "2",
    },

    spData4: (() => {
      const len = 10;
      return Array.from(
        {
          length: len,
        },
        () => Math.floor(Math.random() * len)
      );
    })(),
    spCurveStyles4: {
      stroke: "var(--info)",
      strokeWidth: "2",
    },
  }),

  methods: {
    handleClick(newTab) {
      this.currentTab = newTab;
    },
  },
};
</script>
<style lang="scss">
.stepper-circle {
  width: 2rem;
  height: 2rem;
  background-color: var(--light);
  border: 2px solid var(--primary);
  svg {
    color: var(--dark);
  }
  &.active {
    background-color: var(--primary);
    svg {
      color: var(--light);
    }
  }
}
</style>