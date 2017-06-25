import React from 'react'
import {Set} from 'immutable'
import {cloneIfElement} from '../utils'


export default class Subscriptions extends React.PureComponent {
  subscriptions = Set()
  subscribe = cb => this.subscriptions = this.subscriptions.add(cb)
  unsubscribe = cb => this.subscriptions = this.subscriptions.delete(cb)
  notify = (...args) => this.subscriptions.forEach(cb => cb(...args))

  render () {
    const {subscriptions, subscribe, unsubscribe, notify} = this
    const {children, ...props} = this.props

    return cloneIfElement(
      children,
      {
        ...props,
        subscriptions,
        subscribe,
        unsubscribe,
        notify
      }
    )
  }
}