import * as React from 'react'
import { styled, keyframes } from '../../../styled/index'
import * as theme from 'styled-theming'
import { StyledComponentClass } from 'styled-components'

export interface Props {
  isReloadingSchema: boolean
  onReloadSchema?: () => void
}

export default class ReloadIcon extends React.Component<Props, {}> {
  render() {
    return (
      <Positioner onClick={this.props.onReloadSchema}>
        <Svg viewBox="0 0 20 20">
          <Circle
            cx="9.5"
            cy="10"
            r="6"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            isReloadingSchema={this.props.isReloadingSchema}
          />
          <Icon
            d="M4.83 4.86a6.92 6.92 0 0 1 11.3 2.97l.41-1.23c.13-.4.56-.6.95-.47.4.13.6.56.47.95l-1.13 3.33a.76.76 0 0 1-.7.5.72.72 0 0 1-.43-.12l-2.88-1.92a.76.76 0 0 1-.2-1.04.75.75 0 0 1 1.03-.2l1.06.7A5.34 5.34 0 0 0 9.75 4.5a5.44 5.44 0 0 0-5.64 5.22 5.42 5.42 0 0 0 5.24 5.62c.41 0 .74.36.72.78a.75.75 0 0 1-.75.72H9.3a6.9 6.9 0 0 1-6.68-7.18 6.88 6.88 0 0 1 2.22-4.81z"
            isReloadingSchema={this.props.isReloadingSchema}
          />
        </Svg>
      </Positioner>
    )
  }
}

const iconColor = theme('mode', {
  light: p => p.theme.colours.darkBlue20,
  dark: p => p.theme.colours.white20,
})

const iconColorHover = theme('mode', {
  light: p => p.theme.colours.darkBlue60,
  dark: p => p.theme.colours.white60,
})

const refreshFrames = keyframes`
0% {
  transform: rotate(0deg);
  stroke-dashoffset: 7.92;
} 

50% {
  transform: rotate(720deg);
  stroke-dashoffset: 37.68;
} 

100% {
  transform: rotate(1080deg);
  stroke-dashoffset: 7.92;
}
`

// same result for these 2 keyframes, however when the props change
// it makes the element animated with these keyframes to trigger
// again the animation
const reloadAction = props => keyframes`
0% {
  transform: rotate(${props.isReloadingSchema ? 0 : 360}deg);
}

100% {
  transform: rotate(${props.isReloadingSchema ? 360 : 720}deg);
}`

const Positioner = styled.div`
  position: absolute;
  right: 5px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  transform: rotateY(180deg);
`

const Svg = styled.svg`
  fill: ${iconColor};
  transition: 0.1s linear all;

  &:hover {
    fill: ${iconColorHover};
  }
`

const showWhenReloading = bool => props =>
  props.isReloadingSchema ? Number(bool) : Number(!bool)

const Circle: StyledComponentClass<any, any, any> = styled.circle`
  fill: none;
  stroke: ${iconColor};
  stroke-dasharray: 37.68;
  transition: opacity 0.3s ease-in-out;
  opacity: ${showWhenReloading(true)};
  transform-origin: 9.5px 10px;
  animation: ${refreshFrames} 2s linear infinite;
`

const Icon: StyledComponentClass<any, any, any> = styled.path`
  transition: opacity 0.3s ease-in-out;
  opacity: ${showWhenReloading(false)};
  transform-origin: 9.5px 10px;
  animation: ${reloadAction} 0.5s linear;
`
