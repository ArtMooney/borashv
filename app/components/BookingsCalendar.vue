<template>
  <div id="bokningskalender" class="grid grid-cols-1 gap-2 px-4 py-12 md:px-8">
    <h4 class="text-3xl uppercase">Bokningskalender</h4>

    <ClientOnly>
      <VCalendar
        ref="calendar"
        id="calendar"
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

          '[&_.vc-green>.vc-highlight-bg-solid]:!bg-[#22c55e]',
          '[&_.vc-blue>.vc-highlight-bg-solid]:!bg-[#16a34a]',
          '[&_.vc-red>.vc-highlight-bg-solid]:!bg-[#15803d]',
          '[&_.vc-purple>.vc-highlight-bg-solid]:!bg-[#84cc16]',
          '[&_.vc-orange>.vc-highlight-bg-solid]:!bg-[#eab308]',
          '[&_.vc-yellow>.vc-highlight-bg-solid]:!bg-[#f97316]',
          '[&_.vc-teal>.vc-highlight-bg-solid]:!bg-[#ef4444]',
          '[&_.vc-indigo>.vc-highlight-bg-solid]:!bg-[#8b5cf6]',
          '[&_.vc-pink>.vc-highlight-bg-solid]:!bg-[#3b82f6]',
          '[&_.vc-gray>.vc-highlight-bg-solid]:!bg-[#06b6d4]',
        ]"
      />
    </ClientOnly>

    <div
      class="mt-2 flex flex-col items-start gap-2 rounded bg-[#616a5b]/20 p-8"
    >
      <h4 class="uppercase">Kommande bokningar:</h4>

      <router-link to="#calendar" class="flex flex-col items-start gap-2">
        <div
          v-for="booking in bookings"
          @click="jumpToBooking(booking.dates.start)"
          :key="booking.key"
          class="mb-2 flex cursor-pointer gap-2 text-xs md:mb-0 md:items-center md:text-base"
        >
          <div
            class="flex h-6 min-h-6 w-6 min-w-6 items-center justify-center rounded text-xs"
            :style="{ backgroundColor: booking.highlight.labelColor }"
          >
            {{ new Date(booking.dates.start).getDate() }}
          </div>

          <div class="mt-1 flex flex-wrap gap-1 md:mt-0 md:gap-2">
            <div v-if="booking.time" class="whitespace-nowrap">
              {{ booking.time }}
            </div>
            <div v-else class="whitespace-nowrap">
              {{ formatTime(booking.dates.start) }} -
              {{ formatTime(booking.dates.end) }}
            </div>

            <div v-if="booking.title" class="whitespace-nowrap">
              <IconQuestion
                class="mr-1 mb-0.5 inline text-white/50 md:ml-0.5"
              ></IconQuestion
              >{{ booking.title }}
            </div>

            <div v-if="booking.venue" class="whitespace-nowrap italic">
              <IconBuilding
                class="mr-1 mb-0.5 inline text-white/50 md:ml-1"
              ></IconBuilding
              >{{ booking.venue }}
            </div>

            <div v-if="booking.company" class="whitespace-nowrap italic">
              <IconCompany
                class="mr-1 mb-0.5 inline text-white/50 md:ml-1"
              ></IconCompany
              >{{ booking.company }}
            </div>

            <div v-if="booking.name" class="whitespace-nowrap italic">
              <IconPerson
                class="mr-1 mb-0.5 inline text-white/50 md:ml-1"
              ></IconPerson
              >{{ booking.name }}
            </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { Calendar as VCalendar } from "v-calendar";
import "v-calendar/style.css";
import IconBuilding from "~icons/ph/building";
import IconCompany from "~icons/fluent/people-queue-24-regular";
import IconPerson from "~icons/octicon/person-24";
import IconQuestion from "~icons/ri/question-line";

export default {
  name: "Bokningskalender",

  components: {
    VCalendar,
    IconBuilding,
    IconCompany,
    IconPerson,
    IconQuestion,
  },

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
      highlightLabelColors: [
        "#22c55e",
        "#16a34a",
        "#15803d",
        "#84cc16",
        "#eab308",
        "#f97316",
        "#ef4444",
        "#8b5cf6",
        "#3b82f6",
        "#06b6d4",
      ],
    };
  },

  computed: {
    bookings() {
      const bookings = [];
      let colorIndex = 0;

      for (const item of this.items) {
        const booking = JSON.parse(item?.date);

        if (booking && booking[0] && booking[1]) {
          if (new Date() <= new Date(booking[1])) {
            bookings.push({
              key: item.id,
              highlight: {
                color:
                  this.highlightColors[
                    colorIndex % this.highlightColors.length
                  ],
                labelColor:
                  this.highlightLabelColors[
                    colorIndex % this.highlightLabelColors.length
                  ],
                fillMode: "solid",
              },
              dates: {
                start: booking[0],
                end: booking[1],
              },
              popover: {
                label: `${item.title} ${item.company ? "🏢 " + item.company : ""} ${item.venue ? "📍 " + item.venue : ""} ${item.time ? "🕐 " + item.time : "🕐 " + this.formatTime(booking[0]) + " - " + this.formatTime(booking[1])}`,
                visibility: "hover",
              },
              title: item.title,
              company: item.company,
              venue: item.venue,
              name: item.name,
              time: item.time,
            });
          }
        }

        colorIndex++;
      }

      return bookings;
    },
  },

  methods: {
    async jumpToBooking(date) {
      await this.$refs.calendar.move(new Date(date));
    },

    formatTime(date) {
      return new Date(date).toLocaleTimeString("sv-SE", {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>
