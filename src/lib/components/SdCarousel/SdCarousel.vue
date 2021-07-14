<template>
  <div class="sd--carousel" ref="carouselRef">
    <div ref="contentRef" class="sd--carousel__content">
      <slot/>
    </div>

    <!-- Seperate component -->
  <br/>
  <sd-button-group>
    <sd-button @click="prev" icon="navigate_before" icon-only/>
    <sd-button @click="next" icon="navigate_next" icon-only/>
  </sd-button-group>
  <p>
    {{contentState}}
  </p>
    <!-- Seperate component -->
    <div class="sd--carousel__indicators">
      <div class="sd--carousel__indicator"></div>
      <div class="sd--carousel__indicator"></div>
      <div class="sd--carousel__indicator"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref, reactive } from 'vue'
import SdIcon from '../SdIcon/SdIcon.vue'

export default defineComponent ({
  components: {
    SdIcon
  },
  setup () {
    const contentState = reactive({
      currentIndex: 0,
      currentPosition: 0,
      childrenCount: 0
    })

    const carouselRef = ref(null)
    const contentRef = ref(null)

    const getContentOffset = (index) => {
      if (contentRef.value instanceof HTMLElement) {
        const children = contentRef.value.children
        contentState.childrenCount = children.length
        const result = index >= 0 && contentState.childrenCount - 1 >= index 
          ? children[index].offsetWidth 
          : 0
        return result
      }
    }

    const next = () => {
      if (contentState.childrenCount >=contentState.currentIndex ) {
        contentState.currentIndex = contentState.currentIndex + 1
      }
      
      contentState.currentPosition = getContentOffset(contentState.currentIndex)
      contentRef.value.scrollLeft = contentState.currentPosition
    }
    const prev = () => {
      const currentPos = contentState.currentPosition
      contentState.currentPosition = currentPos - carouselRef.value.offsetWidth
      contentRef.value.scrollLeft = contentState.currentPosition
    }

    onMounted(() => {
      contentRef.value.scrollLeft = contentState.currentPosition
      if (contentRef.value instanceof HTMLElement) {
        contentRef.value.addEventListener('mousedown', (event) => {
          console.log(event.x)
        })
      }
    })

    return {
      contentState,
      contentRef,
      carouselRef,
      next,
      prev
    }
  }
})
</script>

<style lang="scss">
.sd--carousel {
  &__content{
    overflow-x: auto;
    display: flex;
    min-width: 100%;
    & > div {
      margin: 8px;
      min-width: 90%;
    }
  }
  &__indicators {
    display:flex;
    justify-content: center;
  }
  &__indicator {
    background-color: #fff;
    width: 16px;
    height: 16px;
    border-radius: 30px;
    opacity: 0.56;
    transition: box-shadow .23s ease-in-out;
    margin: 0 8px;
    &:hover{
      
      box-shadow: 0 0 0 8px rgba(#fff, .56)
    }
    &.is--active{
      opacity: 1;
    }
  }
}
</style>