import alexa from 'alexa-app';
import moment from 'moment-timezone';
import { blueStops } from './helper.js'

const app = new alexa.app(`charlotteLightRail`);

app.launch((req, res) => {
  res.say(`You've launched charlotte light rail for alexa`);
});

app.intent('GetTimeIntent', {
    'utterances': [
      'when is the train leaving'
    ]
  },
  (req, res) => {

    //hard coded for outbound from carson station
    let nextTime = getNextTrainTime('outbound', 10, moment(req.data.request.timestamp).tz('America/New_York').format());
    
    res.say(`The next outbound train is leaving in ${nextTime.delta} at ${nextTime.time}`);
  }
);

let getNextTrainTime = (direction, stationIndex, timestamp) => {
  const targetStation = blueStops[stationIndex]

  let day = moment(timestamp).tz('America/New_York').day()
  let time = moment(timestamp).tz('America/New_York').format('HH:mm')

  const getTime = (firstOrLast, dayOfWeek) => {
    let getTime = targetStation[`${direction}${dayOfWeek}`]
      .filter(time => time !== 'no stop')
    if (firstOrLast === 'last' && getTime[getTime.length - 1] < '12:00') {
      return getTime[getTime.length - 1]
    } else if (firstOrLast === 'last') {
      return '00:00'
    }
    return getTime[0]
  }

  // Based on current time and day of week, determine which schedule should be in effect.
  let targetSchedule
  if ((day === 6 && time > getTime('last', 'Weekday')) || (day === 0 && time <= getTime('first', 'Sunday'))) {
    targetSchedule = `${direction}Saturday`
  } else if ((day === 0 && time > getTime('last', 'Saturday')) || (day === 1 && time <= getTime('first', 'Weekday'))) {
    targetSchedule = `${direction}Sunday`
  } else {
    targetSchedule = `${direction}Weekday`
  }

  // Filter out the 'no stops' and sort from earliest time to latest so that we can get the next train time.
  const schedule = targetStation[targetSchedule]
    .filter(time => time !== 'no stop')
    .sort()

  const firstTrain = moment(schedule[0], 'HH:mm')
  const nextTrain = schedule
    .map(time => moment(time, 'HH:mm'))
    .find(time => time.isAfter(moment()))

  // If there's no scheduled time after the current time, then default to the first time
  const nextTrainTime = nextTrain ? nextTrain.tz('America/New_York').format('LT') : firstTrain.tz('America/New_York').format('LT')
  const nextTrainDelta = nextTrain ? nextTrain.fromNow() : firstTrain.add(1, 'days').fromNow()
  return { time: nextTrainTime, delta: nextTrainDelta }
}
export default app;
