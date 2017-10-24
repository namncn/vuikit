import { warn, tip } from '~/helpers/debug'
import { positionAt, flipPosition, getPositionAxis } from '~/helpers/position'
import {
  on,
  off,
  css,
  get,
  offAll,
  addClass,
  includes,
  debounce,
  isObject,
  toInteger,
  isUndefined
} from '@vuikit/util'

let uid = 'v-position'

const positions = [
  'top-left',
  'top-center',
  'top-right',

  'bottom-left',
  'bottom-center',
  'bottom-right',

  'left-top',
  'left-center',
  'left-bottom',

  'right-top',
  'right-center',
  'right-bottom'
]

export default {
  inserted (el, binding, vnode) {
    const ctx = getContext(el, binding, vnode)

    if (ctx) {
      position(ctx)
    }
  },
  componentUpdated (el, binding, vnode) {
    const ctx = getContext(el, binding, vnode)

    if (ctx) {
      position(ctx)
    }
  },
  unbind (el, binding, vnode) {
    offAll(uid)
  }
}

function position (ctx) {
  const { el, props, vnode } = ctx
  const { target, position, offset, boundary, flip, clsPos } = props

  // a target could be provided at later moment,
  // if not ready now, just skip execution
  if (!isObject(target)) {
    tip('Target missing on v-position, skiping positioning until provided', vnode)
    return
  }

  if (!includes(positions, position)) {
    warn('Invalid v-position position', vnode)
  }

  let [dir, align] = position.split('-')

  // remove any position class
  const classesRx = new RegExp(`${clsPos}-(top|bottom|left|right)(-[a-z]+)?`)
  el.className = el.className.replace(classesRx, '')

  // reset pos
  css(el, { top: '', left: '' })

  const axis = getPositionAxis(position)

  const elAttach = axis === 'x'
    ? `${flipPosition(dir)} ${align}`
    : `${align} ${flipPosition(dir)}`

  const targetAttach = axis === 'x'
    ? `${dir} ${align}`
    : `${align} ${dir}`

  const elOffset = axis === 'x'
    ? `${dir === 'left' ? -1 * offset : offset}`
    : `${dir === 'top' ? -1 * offset : offset}`

  const { x, y } = positionAt({
    flip,
    target,
    boundary,
    elAttach,
    elOffset,
    element: el,
    targetAttach,
    targetOffset: null
  }).target

  dir = axis === 'x' ? x : y
  align = axis === 'x' ? y : x

  // add on resize events
  setResizeEvent(ctx)

  // add position class
  addClass(el, `${clsPos}-${dir}-${align}`)
}

/**
 * Get the directive props
**/
function getProps (ctx) {
  const { value, vnode } = ctx.binding

  if (isUndefined(value) || !isObject(value)) {
    warn('Position directive configuration is missing or is not an Object', vnode.context)
    return false
  }

  const target = value.target || null
  const delay = get(value, 'delay', 0)
  const flip = get(value, 'flip', true)
  const boundary = value.boundary || window
  const offset = toInteger(value.offset) || 0
  const position = value.position || 'top-center'
  const clsPos = value.clsPos || 'v-position'

  return { target, delay, offset, flip, position, boundary, clsPos }
}

function setResizeEvent (ctx) {
  off(window, 'resize', uid)
  on(window, 'resize', debounce(() => {
    position(ctx)
  }, 50), uid)
}

/**
 * Get the context used across
**/
function getContext (el, binding, vnode) {
  const ctx = { el, binding, vnode }
  ctx.props = getProps(ctx)

  if (!ctx.props) {
    binding.def.unbind(el, binding)
    return
  }

  return ctx
}
