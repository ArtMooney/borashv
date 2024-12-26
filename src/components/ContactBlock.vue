<template>
  <div
    class="relative grid h-[30rem] w-full items-center px-4 py-16 md:px-8 lg:grid-cols-3"
  >
    <div class="absolute bottom-0 left-0 right-0 top-0 overflow-hidden">
      <img
        class="h-full w-full object-cover opacity-25"
        loading="lazy"
        alt="image of old wood background"
        src="../assets/old-wood.jpg"
      />
    </div>

    <div class="relative">
      Mobil:<br />
      <a class="underline" href="tel:033-419191">070-22777161</a>
    </div>
    <div class="relative">
      Email:<br /><a
        class="underline"
        href="mailto:fanrik@hotmail.com?subject=Main från Borås Hemvärnsförenings hemsida"
        >fanrik@hotmail.com</a
      >
    </div>
    <div class="relative">
      Besöksadress:<br /><a
        class="underline"
        href="https://www.google.com/maps/place/Ålgårdsvägen+29,+506+30+Borås/@57.7344001,12.9290169,17z/data=!3m1!4b1!4m6!3m5!1s0x465aa735fb0053b9:0xd84865a2c90a12c5!8m2!3d57.7344001!4d12.9312056!16s%2Fg%2F11c4tg9myg"
        target="_blank"
        >Ålgårdsvägen 29<br />506 30, Borås</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactBlock",
};
</script>
