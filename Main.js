import React from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';

import { pressNum, enter, operation, clear, swap, toggleNegative } from './modules';
import Button from './Button';

const baseNumber = {
  backgroundColor: '#333',
  textAlign: 'right',
  padding: 10,
  fontSize: 40,
};

const styles = StyleSheet.create({
  bottomBorder: {
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
  container: {
    flex: 1,
  },
  top: {
    paddingTop: Platform.OS === 'ios' ? 32 : 20,
  },
  bottom: {
    flex: 1,
  },
  append: {
    color: '#fff',
    ...baseNumber,
  },
  replace: {
    color: '#2E71E5',
    ...baseNumber,
  },
  push: {
    color: '#9bc23c',
    ...baseNumber,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#fff',
  },
});

class App extends React.Component {
  render() {
    const {
      calculatorState: { stack, inputState },
      operationAction,
      pressNumWithDispatch,
      enterAction,
      clearAction,
      swapAction,
      toggleNegativeAction,
    } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <TouchableOpacity style={styles.bottomBorder} onPress={() => toggleNegativeAction(2)}>
            <Text style={styles.append}>{stack[2] || 0}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.bottomBorder} onPress={() => toggleNegativeAction(1)}>
            <Animatable.Text
              ref={(ref) => {
                this.text2 = ref;
              }}
              style={styles.append}
            >
              {stack[1] || 0}
            </Animatable.Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleNegativeAction(0)}>
            <Animatable.Text
              ref={(ref) => {
                this.text1 = ref;
              }}
              style={styles[inputState]}
            >
              {stack[0] || 0}
            </Animatable.Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <View style={styles.row}>
            <Button text="clear" onPress={clearAction} />
            <Button text="pow" onPress={operationAction} />
            <Button text="swap" onPress={swapAction} />
            <Button text="/" onPress={operationAction} />
          </View>
          <View style={styles.row}>
            <Button text="9" onPress={pressNumWithDispatch} />
            <Button text="8" onPress={pressNumWithDispatch} />
            <Button text="7" onPress={pressNumWithDispatch} />
            <Button text="X" onPress={operationAction} />
          </View>
          <View style={styles.row}>
            <Button text="6" onPress={pressNumWithDispatch} />
            <Button text="5" onPress={pressNumWithDispatch} />
            <Button text="4" onPress={pressNumWithDispatch} />
            <Button text="-" onPress={operationAction} />
          </View>
          <View style={styles.row}>
            <Button text="3" onPress={pressNumWithDispatch} />
            <Button text="2" onPress={pressNumWithDispatch} />
            <Button text="1" onPress={pressNumWithDispatch} />
            <Button
              text="+"
              onPress={(x) => {
                operationAction(x);
                this.text1.flash(500);
              }}
            />
          </View>
          <View style={styles.row}>
            <Button text="0" onPress={pressNumWithDispatch} />
            <Button text="." onPress={pressNumWithDispatch} />
            <Button text="enter" onPress={enterAction} special />
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({ calculatorState: state }),
  dispatch =>
    bindActionCreators(
      {
        pressNumWithDispatch: pressNum,
        enterAction: enter,
        operationAction: operation,
        clearAction: clear,
        swapAction: swap,
        toggleNegativeAction: toggleNegative,
      },
      dispatch,
    ),
)(App);
