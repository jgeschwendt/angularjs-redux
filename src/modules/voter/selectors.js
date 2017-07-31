import { createSelector } from 'reselect';

export const selectVoter = state => (
  state.get('voter')
);

export const makeSelectVoterProps = () => createSelector(
  selectVoter,
  selectVoterImmutable => selectVoterImmutable.toJS()
);
