# Buttons
Are made for clicking.

## Example
```html
<!-- Default configuration -->
<sd-button @click="clickHander">
  Button Content
</sd-button>
```

```html
<sd-button 
  id="button1"
  icon="undefined"
  type="button"
  theme="primary"
  disabled="false"
  pill="false"
  outline="false"
  flat="false"
  block="false"
  icon-only="false"
  size="md"
  casing="uppercase"
  align="center"
  :href="null"
  @click="clickHander"
>
  Button Content
</sd-button>
```

## API
#### Themes and Styling
|Name|Type|Description|
|--|--|--|
| icon | `string` | Adds an icon to the button. (Currently only supports Material icons) |
| disabled | `boolean` | Removes the ability to interact with the element. |
| rounded | `boolean` | Rounds the corners of the button. Adds class `is--rounded`. |
| pill | `boolean` | Rounds the corners of the button with additional padding. |
| outline | `boolean` | Sets the background to transparent and adds an outline around the component. |
| flat | `boolean` | Sets the background to transparent and the text to the color of the theme.
| size | `boolean` | Changes the button size. Accepts `sm`, `md`, `lg` |
| theme | `string` | Changes the color theme of the component. Available themes are `primary`, `secondary`, `default`, `danger`, `success`, `warning`. |
| full | `boolean` | Makes the component span across its parent element. |
| block|`boolean` | Makes the component span across its parent element. |
| iconOnly | `string` | Use when the component only has an icon as a slotted element. |

---

## Fine tuning
| Name | Type | Description |
|--|--|--|
| align | `string` | Set the position of the component's content. Must also be set to `block`. Use `justify-content` styles for positioning. eg. `space-around`, `space-between`, `flex-start`, `flex-end` |
| casing | `string` | Adjust the casing of the rendered. Accepts: `uppercase`, `captialize`, `lowercase` content. |

### External links 
| Name | Type | Description |
|--|--|--|
| href | `string` | Makes external URLs targetable. Changes the component's root element from a `button` to an `a`.|


### Additional
|Name|Type|Description|
|--|--|--|
| id | `string` | Populates the `id` attribute of the component. Default: `Randomized UUID` |
| type | `string` | Sets the `type` attribute of the component. |
