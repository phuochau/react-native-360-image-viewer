import React, { Component } from 'react';
import { View, Image, PanResponder, Dimensions, PanResponderGestureState, ImageSourcePropType, StyleProp, ViewStyle, ViewProps, ImageProps } from 'react-native';
import styles from './styles';

const { width } = Dimensions.get('window');

interface Image360ViewerProps {
  width?: number;
  height?: number;
  srcset: ImageSourcePropType[];
  rotationRatio?: number;
  style?: StyleProp<ViewStyle>;
}

interface Image360ViewerState {
  rotation: number;
  rotatePeriod: number;
}

export default class Image360Viewer extends Component<Image360ViewerProps, Image360ViewerState> {
  static defaultProps = {
    width, // width of image
    height: 300, // height of image
    srcset: [],
    rotationRatio: 0.5, // the drag distance compares to 180 degree: width / rotationRatio = 180 degree,
  };

  private panResponder: ReturnType<typeof PanResponder.create> = PanResponder.create({});
  private startX: number = 0;
  private startRotation: number = 0;
  private currentX: number = 0;

  constructor(props: Image360ViewerProps) {
    super(props);
    this.createPanResponder();

    this.state = {
      rotation: 0,
      rotatePeriod: 360 / props.srcset.length
    };
  }

  createPanResponder = () => {
    this.panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState: PanResponderGestureState) => {
        this.startMoving(gestureState);
      },
      onPanResponderMove: (_, gestureState: PanResponderGestureState) => {
        this.moving(gestureState);
      },
      onPanResponderRelease: (_, gestureState: PanResponderGestureState) => {
        this.endMoving(gestureState);
      }
    });
  };

  startMoving = (gestureState: PanResponderGestureState) => {
    this.startX = gestureState.moveX;
    this.startRotation = this.state.rotation;
  };

  moving = (gestureState: PanResponderGestureState) => {
    this.currentX = gestureState.moveX;
    this.updateRotation();
  };

  endMoving = (gestureState: PanResponderGestureState) => {
    this.currentX = gestureState.moveX;
    this.updateRotation();
  };

  updateRotation = () => {
    const { rotationRatio, width } = this.props;
    const deltaRotation = (this.currentX - this.startX) * 180 / (rotationRatio! * width!);
    this.setState({ rotation: this.startRotation + deltaRotation });
  };

  getImage = (): ImageSourcePropType => {
    const { rotation, rotatePeriod } = this.state;
    const { srcset } = this.props;

    const mRotation = rotation - Math.floor(rotation / 360) * 360;
    const index = Math.floor(mRotation / rotatePeriod);

    return srcset[index];
  };

  render() {
    const { width, height, style } = this.props;
    return (
      <View {...this.panResponder.panHandlers} style={style}>
        <Image
          source={this.getImage()}
          style={[styles.image, { width, height }]}
        />
      </View>
    );
  }
} 