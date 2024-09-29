# Rating Docs

## Parameters

- First parameter is the availability of a room, which is determined by the end time of class subtracted by the start time of the class, by dividing it to how many hours are in a week (168 hours), multiplied by 5. `rating += (availableHours / totalHours) * 5;`

- Second parameter is the calculation of features, which is determined by the number of features that are available in a room, which include subparameters of: `Zoom, Video Conferencing, Audience Microphone, Audience Cameras`. It then divids feature count by feature total and multiplies by 5. `rating += (featureCount / features.length) * 5;`

- Final parameter is the room size, which is determined by the number of max possible students in a room, divided by 100 (reasonable max possible students), multiplied by 5. `rating += (room.StudentCapacity / 100) * 5;`