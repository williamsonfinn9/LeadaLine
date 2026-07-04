import {Config} from '@remotion/cli/config';

Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setConcurrency(4);
// Chromium is preinstalled in this environment; point Remotion at it.
Config.setChromiumOpenGlRenderer('angle');
