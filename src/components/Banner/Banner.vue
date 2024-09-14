<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import CarouselItem from './BannerItem.vue';
    import CarouselControls from './BannerControls.vue';
    import CarouselIndicators from './BannerIndicators.vue';

    const props = defineProps({
    slides: {
        type: Array,
        required: true,
    },
    controls: {
        type: Boolean,
        default: false,
    },
    indicators: {
        type: Boolean,
        default: false,
    },
    interval: {
        type: Number,
        default: 5000,
    },
    });

    const emit = defineEmits(['switch']);

    const currentSlide = ref(0);
    const slideInterval = ref(null);
    const direction = ref('right');

    const setCurrentSlide = (index) => {
    currentSlide.value = index;
    };

    const prev = (step = -1) => {
      const index =
          currentSlide.value > 0
          ? currentSlide.value + step
          : props.slides.length - 1;
      setCurrentSlide(index);
      direction.value = 'left';
      startSlideTimer();
    };

    const _next = (step = 1) => {
      const index =
          currentSlide.value < props.slides.length - 1
          ? currentSlide.value + step
          : 0;
      setCurrentSlide(index);
      direction.value = 'right';
    };

    const next = (step = 1) => {
      _next(step);
      startSlideTimer();
    };

    const startSlideTimer = () => {
      stopSlideTimer();
      slideInterval.value = setInterval(() => {
          _next();
      }, props.interval);
    };

    const stopSlideTimer = () => {
      clearInterval(slideInterval.value);
    };

    const switchSlide = (index) => {
      const step = index - currentSlide.value;
      if (step > 0) {
          next(step);
      } else {
          prev(step);
      }
    };

    onMounted(() => {
      startSlideTimer();
    });

    onBeforeUnmount(() => {
      stopSlideTimer();
    });
</script>

<template>
    <div class="carousel">
      <div class="carousel-inner">
        <carousel-indicators
          v-if="indicators"
          :total="slides.length"
          :current-index="currentSlide"
          @switch="switchSlide"
        ></carousel-indicators>
        <carousel-item
          v-for="(slide, index) in slides"
          :slide="slide"
          :key="`item-${index}`"
          :current-slide="currentSlide"
          :index="index"
          :direction="direction"
          @mouseenter="stopSlideTimer"
          @mouseout="startSlideTimer"
        ></carousel-item>
        <carousel-controls
          v-if="controls"
          @prev="prev"
          @next="next"
        ></carousel-controls>
      </div>
    </div>
</template>
  
<style scoped>
  .carousel {
    display: flex;
    justify-content: center;
  }
  .carousel-inner {
    position: relative;
    width: 900px;
    height: 400px;
    overflow: hidden;
  }
</style>
  