import { warn } from 'src/js/util/index'
import svg from './svg'
const icons = {}

export default {
  functional: true,
  props: {
    icon: {
      type: String,
      required: true
    },
    link: {
      type: Boolean,
      default: false
    },
    linkReset: {
      type: Boolean,
      default: false
    },
    ratio: {
      default: 1
    },
    button: {
      type: Boolean,
      default: false
    }
  },
  render (h, { props, data, listeners }) {
    const { link, ratio, icon, button, linkReset } = props
    const iconObj = icons[icon]

    if (!iconObj) {
      warn(`VkIcon: the icon '${icon}' is not registered`)
      return
    }

    // determine tag
    const tag = link || button
      ? 'a'
      : 'span'

    // add custom class
    data.class = ['uk-icon', data.class, {
      'uk-icon-button': button,
      'uk-icon-link': linkReset
    }]

    return h(tag, {
      on: listeners,
      attrs: {
        href: tag === 'a'
          ? ''
          : false
      },
      ...data
    }, [
      h(svg, {
        props: {
          ...iconObj,
          ratio
        }
      })
    ])
  },
  register (iconObj) {
    if (!icons[iconObj.name]) {
      icons[iconObj.name] = iconObj
    }
  }
}