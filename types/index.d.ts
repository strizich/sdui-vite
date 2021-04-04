declare module '@strizich/sdui' {
  import { defineComponent, Ref, ComputedRef } from 'vue'
  const SdSkeleton: ReturnType<typeof defineComponent>
  const SdButton: ReturnType<typeof defineComponent>
  const SdRouterLink: ReturnType<typeof defineComponent>
  const SdCard: ReturnType<typeof defineComponent>
  const SdCardBody: ReturnType<typeof defineComponent>
  const SdCardHeader: ReturnType<typeof defineComponent>
  const SdCardFooter: ReturnType<typeof defineComponent>
  const SdCardMedia: ReturnType<typeof defineComponent>
  const SdFieldset: ReturnType<typeof defineComponent>
  const SdLabel: ReturnType<typeof defineComponent>
  const SdCheckbox: ReturnType<typeof defineComponent>
  const SdRadio: ReturnType<typeof defineComponent>
  const SdField: ReturnType<typeof defineComponent>
  const SdError: ReturnType<typeof defineComponent>
  const SdSelect: ReturnType<typeof defineComponent>
  const SdSlider: ReturnType<typeof defineComponent>
  const SdSwitch: ReturnType<typeof defineComponent>
  const SdChicklet: ReturnType<typeof defineComponent>
  const SdChip: ReturnType<typeof defineComponent>
  // Dialog (modal)
  const SdDialog: ReturnType<typeof defineComponent>
  const SdDialogHeader: ReturnType<typeof defineComponent>
  const SdDialogContent: ReturnType<typeof defineComponent>
  const SdDialogFooter: ReturnType<typeof defineComponent>
  const SdOverlay: ReturnType<typeof defineComponent>
  // Icons
  const SdIcon: ReturnType<typeof defineComponent>
  const SdMouse: ReturnType<typeof defineComponent>
  // Poppers
  const SdTooltip: ReturnType<typeof defineComponent>
  const SdHamburger: ReturnType<typeof defineComponent>
  // Layout
  const SdLayout: ReturnType<typeof defineComponent>
  const SdHeader: ReturnType<typeof defineComponent>
  const SdNav: ReturnType<typeof defineComponent>
  const SdNavLink: ReturnType<typeof defineComponent>
  const SdNavHeading: ReturnType<typeof defineComponent>
  // Grid
  const SdRow: ReturnType<typeof defineComponent>
  const SdCol: ReturnType<typeof defineComponent>
  const SdContainer: ReturnType<typeof defineComponent>
  // Dropdown
  const SdDropdown: ReturnType<typeof defineComponent>
  const SdDropdownMenu: ReturnType<typeof defineComponent>
  const SdDropdownHeader: ReturnType<typeof defineComponent>
  // Loader
  const SdProgress: ReturnType<typeof defineComponent>
  // UI
  const SdSheet: ReturnType<typeof defineComponent>
  const SdMast: ReturnType<typeof defineComponent>
  const SdActionBar: ReturnType<typeof defineComponent>

  // Toaster
  const SdToast: ReturnType<typeof defineComponent>
  // WIP
  const SdList: ReturnType<typeof defineComponent>
  const SdListItem: ReturnType<typeof defineComponent>


  // Installation
  const useKeyboardFocus: ($el: any) => ComputedRef<boolean>
  const useScheme: (mode: Ref<string>) => void
  const useWindowWidth: () => {
    windowWidth: any;
    smallDevice: Ref<boolean>;
  }

  const useAlignment: (align: string, direction: string) => {
    alignmentStyle: ComputedRef<{
        'justify-content': string;
        'flex-direction': string;
    }>;
}

  const useSlider: (props: any, emit: any) => {
   state: ComputedRef<{
     init: boolean;
     computedX: 0;
     x: number;
     minX: number;
     maxX: number;
     dragStartX: number;
     handleWidth: number;
     handleHeight: number;
     handleOffset: number;
     unit: number;
     pctComplete: number;
     isHover: boolean;
     isDragging: boolean;
   }>;
   slider: Ref<HTMLElement>;
   handle: Ref<HTMLElement>;
   result: ComputedRef<number>;
   isFocused: ComputedRef<boolean>;
  }

  const useToaster: (currentToast: any, emit: any) => {
    makeToast: (duration: any, persist: any) => Promise<void>;
    promiseToast: (duration: any, persist: any) => Promise<void>;
    destroyToast: () => Promise<any>
  }

  const sdInstall: (app: any) => void

  export {
    sdInstall,
    SdSkeleton,
    // Button
    SdButton,
    SdRouterLink,
    // Cards
    SdCard,
    SdCardBody,
    SdCardHeader,
    SdCardFooter,
    SdCardMedia,
    // Control Fields
    SdFieldset,
    SdLabel,
    SdCheckbox,
    SdRadio,
    SdField,
    SdError,
    SdSelect,
    SdSlider,
    SdSwitch,
    SdChicklet,
    SdChip,
    // Dialog (modal)
    SdDialog,
    SdDialogHeader,
    SdDialogContent,
    SdDialogFooter,
    SdOverlay,
    // Icons
    SdIcon,
    SdMouse,
    // Poppers
    SdTooltip,
    SdHamburger,
    // Layout
    SdLayout,
    SdHeader,
    SdNav,
    SdNavLink,
    SdNavHeading,
    // Grid
    SdRow,
    SdCol,
    SdContainer,
    // Dropdown
    SdDropdown,
    SdDropdownMenu,
    SdDropdownHeader,
    // Loader
    SdProgress,
    // UI
    SdSheet,
    SdMast,
    SdActionBar,
    // Toaster
    SdToast,
    // WIP
    SdList,
    SdListItem,
    
    //Color Scheme Hook
    useScheme,

    // Utility Hooks
    useKeyboardFocus,
    useWindowWidth,
    useAlignment,
    useToaster,
    useSlider
  }
}