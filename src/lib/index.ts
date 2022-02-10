import * as packageData from '../../package.json'
import { toCamelCase, toKebab } from './core/utilities/SdTextTransform'

// Components
import './components/SdElevation/elevation.scss'
import SdButton from './components/SdButton/SdButton.vue'
import SdButtonGroup from './components/SdButton/SdButtonGroup.vue'
import SdRouterLink from './components/SdButton/SdRouterLink.vue'
import SdHamburger from './components/SdButton/SdHamburger.vue'
import SdCard from './components/SdCard/SdCard.vue'
import SdCardBody from './components/SdCard/SdCardBody.vue'
import SdCardHeader from './components/SdCard/SdCardHeader.vue'
import SdCardFooter from './components/SdCard/SdCardFooter.vue'
import SdCardMedia from './components/SdCard/SdCardMedia.vue'
import SdDialog from './components/SdDialog/SdDialog.vue'
import SdDialogHeader from './components/SdDialog/SdDialogHeader.vue'
import SdDialogContent from './components/SdDialog/SdDialogContent.vue'
import SdDialogFooter from './components/SdDialog/SdDialogFooter.vue'
import SdOverlay from './components/SdDialog/SdOverlay.vue'
import SdCheckbox from './components/SdCheckbox/SdCheckbox.vue'
import SdSwitch from './components/SdCheckbox/SdSwitch.vue'
import SdRadio from './components/SdRadio/SdRadio.vue'
import SdFieldset from './components/SdField/SdFieldset.vue'
import SdField from './components/SdField/SdField.vue'
import SdSimpleSelect from './components/SdField/SdSimpleSelect.vue'

import SdSelect from './components/SdSelect/SdSelect.vue'
import SdLabel from './components/SdField/SdLabel.vue'
import SdError from './components/SdField/SdError.vue'
import SdIcon from './components/SdIcon/SdIcon.vue'
import SdMouse from './components/SdIcon/SdMouse.vue'
import SdTooltip from './components/SdTooltip/SdTooltip.vue'
import SdLayout from './components/SdLayout/SdLayout.vue'
import SdHeader from './components/SdLayout/SdHeader.vue'
import SdNavLink from './components/SdLayout/SdNavLink.vue'
import SdNav from './components/SdLayout/SdNav.vue'
import SdNavHeading from './components/SdLayout/SdNavHeading.vue'
import SdMast from './components/SdMast/SdMast.vue'
import SdRow from './components/SdGrid/SdRow.vue'
import SdCol from './components/SdGrid/SdCol.vue'
import SdContainer from './components/SdGrid/SdContainer.vue'
import SdGrid from './components/SdGrid/SdGrid.vue'
import SdCell from './components/SdGrid/SdCell.vue'
import SdSlider from './components/SdSlider/SdSlider.vue'
import SdProgress from './components/SdProgress/SdProgress.vue'
import SdDropdown from './components/SdDropdown/SdDropdown.vue'
import SdDropdownMenu from './components/SdDropdown/SdDropdownMenu.vue'
import SdDropdownHeader from './components/SdDropdown/SdDropdownHeader.vue'
import SdMenu from './components/SdMenu/SdMenu.vue'
import SdMenuContent from './components/SdMenu/SdMenuContent.vue'
import SdChicklet from './components/SdChicklet/SdChicklet.vue'
import SdChip from './components/SdChicklet/SdChip.vue'
import SdSkeleton from './components/SdLoader/SdSkeleton.vue'
import SdSheet from './components/SdSheet/SdSheet.vue'
import SdToast from './components/SdToast/SdToast.vue'
import SdList from './components/SdList/SdList.vue'
import SdListItem from './components/SdList/SdListItem.vue'
import SdActionBar from './components/SdActionBar/SdActionBar.vue'
import SdWidget from './components/SdWidget/SdWidget.vue'
import SdWidgetFooter from './components/SdWidget/SdWidgetFooter.vue'
import SdWidgetMetric from './components/SdWidget/SdWidgetMetric.vue'
import useSlider from './components/SdSlider/useSlider'
import useToaster from './components/SdToast/useToaster'
import useAlignment from './hooks/useAlignment'
import useKeyboardFocus from './hooks/useKeyboardFocus'
import useWindowWidth from './hooks/useWindowWidth'
import useScheme from './hooks/useScheme'
import usePopper from './hooks/usePopper'

const components = {
  SdWidget,
  SdWidgetFooter,
  SdWidgetMetric,
  SdSkeleton,
  // Button
  SdButton,
  SdButtonGroup,
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
  SdSimpleSelect,
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
  SdGrid,
  SdCell,
  // Dropdown
  SdDropdown,
  SdDropdownMenu,
  SdDropdownHeader,

  SdMenu,
  SdMenuContent,
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
  SdListItem
  // Utilities
}

const sdComponentsDesc = Object.keys(components).map((item) => {
  const component = components[item]
  return {
    name: component.name || 'sd-comp',
    component
  }
})

const makeCustomPrefix = (prefix, item) => {
  const name: string = prefix ? `${prefix}${item.slice(2)}` : `${item}`
  return toKebab(name)
}

const version = packageData.version

const sdInstall = (app, { prefix = 'sd' }) => {
  if (!app) {
    return
  }

  sdComponentsDesc.forEach((item) => {
    const registerComponent = item.component
    const kebabName = makeCustomPrefix(prefix, item.name)
    const camelName = toCamelCase(kebabName)
    console.log(camelName, kebabName)
    app.component(kebabName, registerComponent)
    app.component(camelName, registerComponent)
  })

  if (import.meta.env.NODE_ENV !== 'development') {
    console.info(`%cSDUI Component Library ${version}`, 'color: #8F00F8; font-weight: 700; font-size: 12px;')
    console.info(`%cGithub: https://github.com/strizich/sdui-vite`, 'font-size: 8px;')
    console.info('--')
  }
}



export {
  sdInstall,
  version,
  SdWidget,
  SdWidgetFooter,
  SdWidgetMetric,
  SdSkeleton,
  // Button
  SdButton,
  SdRouterLink,
  SdHamburger,
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
  SdSimpleSelect,
  SdSelect,
  SdError,
  // Dialog (modal)
  SdDialog,
  SdDialogHeader,
  SdDialogContent,
  SdDialogFooter,
  SdOverlay,
  // Icon
  SdIcon,
  SdMouse,
  // Poppers
  SdTooltip,
  // Layout
  SdLayout,
  SdHeader,
  SdNav,
  SdNavLink,
  SdNavHeading,
  // SdFooter,
  // SdSidebar
  // Grid
  SdActionBar,
  SdRow,
  SdCol,
  SdContainer,
  SdGrid,
  SdCell,
  SdSlider,
  SdMast,
  SdSwitch,
  SdProgress,
  SdDropdown,
  SdDropdownMenu,
  SdDropdownHeader,
  SdMenu,
  SdMenuContent,
  SdChicklet,
  SdChip,
  SdSheet,
  SdToast,
  SdList,
  SdListItem,
  useKeyboardFocus,
  useAlignment,
  useWindowWidth,
  useScheme,
  useSlider,
  useToaster,
  usePopper
}
