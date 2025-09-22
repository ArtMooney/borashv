<template>
  <div id="bokningslista" class="grid grid-cols-1 gap-2 px-4 py-12 md:px-8">
    <h4 class="text-3xl uppercase">Bokningskalender</h4>

    <ClientOnly>
      <div v-if="isCalendarLoaded">
        <component
          :is="'VCalendar'"
          :attributes="calendarAttributes"
          expanded
          show-weeknumbers
          transparent
          borderless
          :class="[
            '[&_.vc-pane-layout]:p-6',
            '[&_.vc-pane-header-wrapper]:p-6',
            '[&_.vc-pane-container]:rounded',
            '[&_.vc-pane-container]:bg-[#616a5b]',
            '[&_.vc-weekday]:!text-[#a5b698]',
            '[&_.vc-arrow]:!text-black',
            '[&_.vc-title]:!text-lg',
            '[&_.vc-title]:!text-[#a5b698]',
            '[&_.vc-header]:!mb-8',
            '[&_.vc-weekdays]:!mb-4',
            '[&_.vc-weekdays]:!border-b',
            '[&_.vc-weekdays]:!border-b-[#a5b698]/25',
            '[&_.vc-weeknumber-content]:!text-[#a5b698]/50',
            '[&_.vc-weeknumber]:!h-full',
            '[&_.vc-day-content]:sm:!text-lg',
            '[&_.vc-day]:sm:!p-4',
            '[&_.vc-highlight]:sm:!p-6',
          ]"
        />
      </div>
    </ClientOnly>

    <div class="mt-2 flex flex-col gap-2 rounded bg-[#616a5b] p-8">
      <h3>Bokningsstatus:</h3>
      <div class="flex items-center gap-2">
        <span class="h-6 min-h-6 w-6 min-w-6 rounded bg-[#16a34b]"></span>
        <span>Bekräftad bokning</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="h-6 min-h-6 w-6 min-w-6 rounded bg-[#fed8aa]"></span>
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
    if (process.client) {
      const vcalendar = await import("v-calendar");
      await import("v-calendar/style.css");

      // Registrera komponenten globalt
      this.$nuxt.vueApp.component("VCalendar", vcalendar.Calendar);
      this.isCalendarLoaded = true;
    }

    this.drawBookings();
  },

  methods: {
    drawBookings() {
      // console.log(this.items);
      const bookings = [];

      for (const item of this.items) {
        const booking = JSON.parse(item["datum|to-from"]);

        if (booking && booking[0] && booking[1]) {
          bookings.push({
            key: item.id,
            name: item.title,
            startDate: booking[0],
            endDate: booking[1],
            status: "confirmed",
          });
        }
      }

      // console.log(bookings);
    },
  },
};
</script>
