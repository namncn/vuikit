import { ElRange } from '../elements'

import { get } from 'vuikit/src/_core/utils/misc'
import { assign } from 'vuikit/src/_core/utils/lang'
import { mergeData } from 'vuikit/src/_core/utils/vue'

export default assign({}, ElRange, {
  name: 'VkFormRange',
  props: ['value'],
  render (h, { props, data, _n: toNumber }) {

    const def = mergeData({}, data, {
      domProps: {
        value: props.value
      }
    })

    // workaround for v-model/@input support
    if (get(def, 'on.input')) {
      const callback = def.on.input
      const number = get(def, 'model.modifiers.number')

      // override events
      delete def.on.input
      delete def.model
      def.on.__r = e => {
        callback(number
          ? toNumber(e.target.value)
          : e.target.value
        )
      }
    }

    return h(ElRange, def)
  }
})