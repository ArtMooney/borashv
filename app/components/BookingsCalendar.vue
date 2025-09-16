<template>
  <div id="bokningslista" class="grid grid-cols-1 gap-2 px-4 py-12 md:px-8">
    <h4 class="text-3xl uppercase">Bokningskalender</h4>

    <ClientOnly>
      <div v-if="isCalendarLoaded">
        <component
          :is="'VCalendar'"
          :attributes="calendarAttributes"
          expanded
        />
      </div>
      <template #fallback>
        <div class="calendar-loading">Laddar kalender...</div>
      </template>
    </ClientOnly>

    <div class="booking-legend">
      <h3>Bokningsstatus:</h3>
      <div class="legend-item">
        <span class="legend-color confirmed"></span>
        <span>Bekräftad bokning</span>
      </div>
      <div class="legend-item">
        <span class="legend-color pending"></span>
        <span>Väntande bokning</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Bokningskalender",

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      isCalendarLoaded: false,
      bookings: [
        {
          key: "booking-1",
          name: "Eriksson - Företagsevent",
          startDate: new Date(2025, 8, 20),
          endDate: new Date(2025, 8, 23),
          status: "confirmed",
        },
        {
          key: "booking-2",
          name: "Johansson - Bröllop",
          startDate: new Date(2025, 8, 27),
          endDate: new Date(2025, 8, 29),
          status: "pending",
        },
      ],
    };
  },

  computed: {
    calendarAttributes() {
      return this.bookings.map((booking) => ({
        key: booking.key,
        highlight: {
          color: booking.status === "confirmed" ? "green" : "orange",
          fillMode: booking.status === "confirmed" ? "solid" : "light",
        },
        dates: {
          start: booking.startDate,
          end: booking.endDate,
        },
        popover: {
          label: booking.name,
          visibility: "hover",
        },
      }));
    },
  },

  async mounted() {
    // console.log(this.items);

    if (process.client) {
      const vcalendar = await import("v-calendar");
      await import("v-calendar/style.css");

      // Registrera komponenten globalt
      this.$nuxt.vueApp.component("VCalendar", vcalendar.Calendar);
      this.isCalendarLoaded = true;
    }
  },
};
</script>

<style scoped>
.booking-calendar {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.calendar-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 600;
}

.calendar-loading {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  background: #f5f5f5;
  border-radius: 8px;
}

.booking-legend {
  margin-top: 30px;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
}

.booking-legend h3 {
  margin: 0 0 15px 0;
  color: #374151;
  font-size: 16px;
  font-weight: 600;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.legend-color {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  margin-right: 10px;
}

.legend-color.confirmed {
  background-color: #10b981;
}

.legend-color.pending {
  background-color: #fb923c;
  border: 1px solid #f97316;
}
</style>
