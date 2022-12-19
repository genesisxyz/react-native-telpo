import { NativeModules, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-telpo' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const Telpo = NativeModules.Telpo
  ? NativeModules.Telpo
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export enum Status {
  STATUS_OK = 0,
  STATUS_NO_PAPER,
  STATUS_OVER_HEAT,
  STATUS_OVER_FLOW,
  STATUS_UNKNOWN,
  STATUS_ERROR = 16,
}

export enum Mode {
  ALGIN_LEFT = 0,
  ALGIN_MIDDLE,
  ALGIN_RIGHT,
}

export async function checkStatus(): Promise<Status> {
  return await Telpo.checkStatus();
}

export function start(mode: number) {
  return Telpo.start(mode);
}

export function setGrey(level: number) {
  return Telpo.setGrey(level);
}

export function setLineSpace(lineSpace: number) {
  return Telpo.setLineSpace(lineSpace);
}

export function setBold(isBold: boolean) {
  return Telpo.setBold(isBold);
}

export function setAlgin(mode: Mode) {
  return Telpo.setAlgin(mode);
}

export function setTextSize(size: number) {
  return Telpo.setTextSize(size);
}

export function addString(content: string) {
  return Telpo.addString(content);
}

export function printString() {
  return Telpo.printString();
}

export function walkPaper(line: number) {
  return Telpo.walkPaper(line);
}

export function printLogo(image: string, isBuffer: boolean = false) {
  return Telpo.printLogo(image, isBuffer);
}

export function stop() {
  return Telpo.stop();
}
