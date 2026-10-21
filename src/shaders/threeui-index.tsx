import React from 'react'
import {
  IgnitionButton,
  type NeuformIsolatedEffectProps,
} from './neuform-isolated/NeuformIsolatedEffects'
import './threeui.css'

export type ShaderButtonsProps = NeuformIsolatedEffectProps & {
  variant?: 'ignition-button' | string
}

export const ShaderButtons: React.FC<ShaderButtonsProps> = ({
  variant = 'ignition-button',
  ...props
}) => {
  return <IgnitionButton {...props} />
}

export * from './neuform-isolated/NeuformIsolatedEffects'
