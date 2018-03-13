'use strict';

var settings = {
  functional: true,
  render: function (h, ref) {
    var props = ref.props;
    var width = props.width || 20;
    var height = props.height || 20;
    var viewBox = props.viewBox || '0 0 20 20';
    return h('svg', {
      attrs: {
        version: '1.1',
        meta: 'vk-icons-settings',
        width: width,
        height: height,
        viewBox: viewBox
      },
      domProps: {
        innerHTML: '<ellipse fill="none" stroke="#000" cx="6.11" cy="3.55" rx="2.11" ry="2.15" /><ellipse fill="none" stroke="#000" cx="6.11" cy="15.55" rx="2.11" ry="2.15" /><circle fill="none" stroke="#000" cx="13.15" cy="9.55" r="2.15" /><rect x="1" y="3" width="3" height="1" /><rect x="10" y="3" width="8" height="1" /><rect x="1" y="9" width="8" height="1" /><rect x="15" y="9" width="3" height="1" /><rect x="1" y="15" width="3" height="1" /><rect x="10" y="15" width="8" height="1" />'
      }
    })
  }
}

module.exports = settings;