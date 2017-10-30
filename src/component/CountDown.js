import React from 'react';
import PropTypes from 'prop-types';
import { kea } from 'kea';

import { cancelled, put } from 'redux-saga/effects';

const delay = ms => new Promise(resolve => window.setTimeout(resolve, ms));

const countdownLogic = kea({
  actions: () => ({
    start: () => {
      console.log('start action');
      return true;
    },
    finish: true,
    setCounter: (counter) => ({counter}),
  }),

  thunks: ({actions, get, fetch, dispatch, getState}) => ({
    anotherThunk: async () => {
      console.log('start thunk');
    },
  }),
  start: function () {
    console.log('start saga');
  },
  reducers: ({actions, key, props}) => ({
    counter: [0, PropTypes.number, {
      [actions.setCounter]: (_, payload) => payload.counter,
    }],
    finished: [false, PropTypes.bool, {
      [actions.start]: () => false,
      [actions.finish]: () => true,
    }],
  }),

  takeLatest: ({actions, workers}) => ({
    [actions.start]: function* () {
      console.log('get saga effect');
      try {
        const {setCounter, finish} = this.actions;

        for (let i = 50; i >= 0; i--) {
          yield put(setCounter(i));
          yield delay(50);
        }
        yield put(finish());
      } finally {
        if (yield cancelled()) {
          console.log('Countdown was cancelled!');
        }
      }
    },
  }),
});

const Countdown = ({
                     counter, finished,
                     actions: {start, anotherThunk},
                   }) => {
  return <div className='kea-counter'>
    Count: {counter}
    <br/><br/>
    {finished
      ? 'We made it until the end! finish() action triggered'
      : 'Click start to trigger the finish() action in a few seconds'}
    <br/><br/>
    <button onClick={() => {
      // anotherThunk(); //not work
      start();
    }}>Start
    </button>
  </div>;
};

export default countdownLogic(Countdown);