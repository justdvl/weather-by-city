import { css} from 'styled-components'


//responsiveness
const sizes = {
    big: 999,
    medium: 679,
    small: 399,
    tiny: 200,
    }
// iterate through the sizes and create a media template
const media = Object.keys(sizes).reduce((accumulator, label) => {
    // use em in breakpoints to work properly cross-browser and support users
    // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
    const emSize = sizes[label] / 16
    accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
    ${css(...args)};
    }
    `
    return accumulator
}, {})

export {media}