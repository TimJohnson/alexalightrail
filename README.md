# Alexa Light Rail Skill
An Alexa skill to to catch the next light rail train.

### Problem
I need to catch the train, and don't know when the next one is coming! Do I need to hurry? Or can I take my time?

### Solution
Hands-free, voice-activated, Alexa skill to tell me how long for the next train.

### Context
I'm in my cluttered South End apartment, rushing to get ready for work Uptown.

### Persona
Busy, rushed, Charlotte city-living, person

### Ask Alexa (main Next Train intent)
- When's the train coming?
- When's the next train?
- Where's the train?

### Response (proposed)
- The next train is in 5 minutes at 8:25. Better Hurry!
- At Woodlawn, the next outbound train is in 8 minutes at 9:36. Go now.

### Intents
- Next Train
- Set Home Station
- Set Direction
- Status
- Train Info
- Help

### Logic
- Next train in  0 -  5 min: Hurry!
- Next train in  6 - 15 min: Go now.
- Next train in  15 +   min: Plenty of time...

### Voice User Interface
- [proposed VUI and phase flow image](https://github.com/josephjguerra/alexalightrail/blob/master/alexalightrail.png)
