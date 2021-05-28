# Table of Contents



- [Overview](#overview)
- [Installation](#installation)
- [Development](#development)
  


# Overview
This is a Chrome browser extension that allows the user to automatically create a Google document (from a specified template) where notes can be captured for a Google calendar event (meeting, appointment, etc.). A link to the notes document is added to calendar event description.

# Installation

1. Browse to https://github.com/toomanyedwards/google-calendar-meeting-notes-chrome-extension

2. Press the green 'Code' button and select 'Download ZIP'. This will download the extension repo.
3. Unzip the file on your computer locally
4. In Chrome, browse to [chrome://extensions](chrome://extensions)
5. Turn on 'Developer Mode' by clicking the switch in the upper right
6. Press 'Load unpacked'
7. In the directory selection dialog, browse to where you unzipped the repo and select /google-calendar-meeting-notes-chrome-extension-master/build
8. The extension should now be installed

:warning: To turn off the extension browse to [chrome://extensions](chrome://extensions) and turn off the extension by the clicking the button in the lower right of the "Google Calendar Meeting Notes
" settings.

# Development

This extension is based off Create React App (CRA). The project is ejected from CRA so that output file names remain the same and can be referenced by name in the manifest.json. Note: There may be a better way to this without ejecting from CRA. 



## To Develop the Extension
1. Clone https://github.com/toomanyedwards/google-calendar-meeting-notes-chrome-extension
2. Run 
```console
yarn install
```
3. Run 
```console
yarn build
```
4. Install the extension in Chrome by following the extension [installation](#installation) instructions starting on step 5.




