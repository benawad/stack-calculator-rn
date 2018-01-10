import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

const baseContainer = {
  alignItems: 'center',
  justifyContent: 'center',
  borderRightWidth: 1,
  borderColor: '#fff',
};

const baseText = {
  fontSize: 36,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    ...baseContainer,
  },
  specialContainer: {
    flex: 2,
    backgroundColor: '#9bc23c',
    ...baseContainer,
  },
  text: baseText,
  specialText: {
    ...baseText,
    color: '#fff',
  },
});

class Button extends React.Component {
  render() {
    const { text, special, onPress } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          this.text.rubberBand(400);
          onPress(text);
        }}
        style={special ? styles.specialContainer : styles.container}
      >
        <Animatable.Text
          ref={(ref) => {
            this.text = ref;
          }}
          style={special ? styles.specialText : styles.text}
        >
          {text}
        </Animatable.Text>
      </TouchableOpacity>
    );
  }
}

export default Button;
