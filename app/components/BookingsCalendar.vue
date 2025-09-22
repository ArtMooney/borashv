<template>
  <div id="bokningslista" class="grid grid-cols-1 gap-2 px-4 py-12 md:px-8">
    <h4 class="text-3xl uppercase">Bokningskalender</h4>

    <ClientOnly>
      <div v-if="isCalendarLoaded">
        <component
          :is="'VCalendar'"
          :attributes="bookings"
          :min-date="new Date()"
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
            '[&_.vc-disabled]:!text-black/15',
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
      highlightColors: [
        "green",
        "blue",
        "red",
        "purple",
        "orange",
        "yellow",
        "teal",
        "indigo",
        "pink",
        "gray",
      ],
    };
  },

  computed: {
    bookings() {
      const bookings = [];
      let colorIndex = 0;

      for (const item of this.items) {
        const booking = JSON.parse(item["datum|to-from"]);

        if (booking && booking[0] && booking[1]) {
          if (new Date() <= new Date(booking[1])) {
            bookings.push({
              key: item.id,
              highlight: {
                color:
                  this.highlightColors[
                    colorIndex % this.highlightColors.length
                  ],
                fillMode: "light",
              },
              dates: {
                start: booking[0],
                end: booking[1],
              },
              popover: {
                label: item.title,
                visibility: "hover",
              },
            });
          }
        }

        colorIndex++;
      }

      return bookings;
    },
  },

  async mounted() {
    if (process.client) {
      const vcalendar = await import("v-calendar");
      await import("v-calendar/style.css");

      this.$nuxt.vueApp.component("VCalendar", vcalendar.Calendar);
      this.isCalendarLoaded = true;
    }
  },
};
</script>
