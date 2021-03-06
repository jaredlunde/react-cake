import bound from './bound'


const decr = ({step, ...state}, {propName}) => decrBy(
  step === void 0 || step === null ? 1 : step
)({
  [propName]: state[propName]
})

export default decr

export const decrBy = by => (state, {cast = parseInt, propName}) => ({
  [propName]: cast(state[propName]) - cast(by)
})

export const boundDecr = (state, props) => bound({
  result: decrBy(state.step)(state, props),
  ...state,
  ...props
})
