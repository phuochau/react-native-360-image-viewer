import React, { Component } from 'react';
import { PanResponderGestureState, ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
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
    static defaultProps: {
        width: number;
        height: number;
        srcset: never[];
        rotationRatio: number;
    };
    private panResponder;
    private startX;
    private startRotation;
    private currentX;
    constructor(props: Image360ViewerProps);
    createPanResponder: () => void;
    startMoving: (gestureState: PanResponderGestureState) => void;
    moving: (gestureState: PanResponderGestureState) => void;
    endMoving: (gestureState: PanResponderGestureState) => void;
    updateRotation: () => void;
    getImage: () => ImageSourcePropType;
    render(): React.JSX.Element;
}
export {};
