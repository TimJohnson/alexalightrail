import alexa from 'alexa-app';

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
    res.say(`It is leaving in 5 minutes. At 5:45 PM`);
  }
);

export default app;
