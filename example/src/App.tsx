import * as React from 'react';

import { StyleSheet, View, Button } from 'react-native';
import * as Telpo from 'react-native-telpo';

export default function App() {
  const test = async () => {
    let status = await Telpo.checkStatus();
    if (status === Telpo.Status.STATUS_OK) {
      Telpo.start(0);
      Telpo.setGrey(6);
      Telpo.setLineSpace(5);
      Telpo.setBold(true);
      Telpo.setAlgin(Telpo.Mode.ALGIN_MIDDLE);
      status = await Telpo.checkStatus();
      if (
        status === Telpo.Status.STATUS_NO_PAPER ||
        status === Telpo.Status.STATUS_ERROR
      ) {
        console.warn('No paper');
        Telpo.stop();
      } else if (status === Telpo.Status.STATUS_OVER_HEAT) {
        console.warn('Too hot');
        Telpo.stop();
      }
      Telpo.setTextSize(22);
      Telpo.addString('Hello World');
      Telpo.printString();
      Telpo.stop();
    }
  };

  return (
    <View style={styles.container}>
      <Button title="PRINT" onPress={test} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
