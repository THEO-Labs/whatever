import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { runOnJS } from 'react-native-reanimated';
import { useFrameProcessor, type Frame } from 'react-native-vision-camera';
import Svg, { Circle, Line } from 'react-native-svg';

declare function detectPose(frame: Frame): any;

const drawLine = (
  joints: Record<string, [number, number, number]>,
  a: string,
  b: string,
) => {
  if (!joints[a] || !joints[b]) return null;
  const [x1, y1] = joints[a];
  const [x2, y2] = joints[b];
  return <Line x1={x1} y1={y1} x2={x2} y2={y2} stroke="lime" strokeWidth={0.02} />;
};

interface Props {
  visible: boolean;
  onRequestClose: () => void;
}

export default function PoseEstimation({ visible, onRequestClose }: Props) {
  const cameraRef = useRef<Camera>(null);
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'front');

  const [hasPermission, setHasPermission] = useState(false);
  const [pose, setPose] = useState<Record<string, [number, number, number]> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const status = await Camera.requestCameraPermission();
        setHasPermission(status === 'granted');
        if (status !== 'granted') {
          setError('Camera permission denied.');
        }
      } catch (e) {
        setError('Camera permission check failed.');
        console.warn('[Pose] permission error', e);
      }
    })();
  }, []);

  const frameProcessor = useFrameProcessor((frame: Frame) => {
    'worklet';
    try {
      if (typeof detectPose !== 'function') {
        runOnJS(console.warn)('[Pose] detectPose not linked');
        return;
      }

      const joints = detectPose(frame);
      if (joints) {
        runOnJS(setPose)(joints);
      }
    } catch (err) {
      runOnJS(console.warn)('[Pose] frame error', err);
    }
  }, []);

  if (!device) {
    return visible ? (
      <View style={styles.errorBox}><Text>No camera device</Text></View>
    ) : null;
  }

  if (!hasPermission) {
    return visible ? (
      <View style={styles.errorBox}><Text>{error ?? 'Awaiting permission…'}</Text></View>
    ) : null;
  }

  if (!visible) return null;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={onRequestClose}>
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        device={device}
        isActive
        frameProcessor={frameProcessor}
      />
      <Svg style={styles.overlay} viewBox="0 0 1 1">
        {pose && (
          <>
            {drawLine(pose, 'left_shoulder', 'left_elbow')}
            {drawLine(pose, 'left_elbow', 'left_wrist')}
            {drawLine(pose, 'right_shoulder', 'right_elbow')}
            {drawLine(pose, 'right_elbow', 'right_wrist')}
            {drawLine(pose, 'left_hip', 'left_knee')}
            {drawLine(pose, 'left_knee', 'left_ankle')}
            {drawLine(pose, 'right_hip', 'right_knee')}
            {drawLine(pose, 'right_knee', 'right_ankle')}
            {drawLine(pose, 'left_shoulder', 'right_shoulder')}
            {drawLine(pose, 'left_hip', 'right_hip')}
            {Object.entries(pose).map(([name, [x, y]]) => (
              <Circle key={name} cx={x} cy={y} r={0.01} stroke="lime" fill="lime" />
            ))}
          </>
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    borderRadius: 12,
    zIndex: 10000,
  },
  camera: { flex: 1, borderRadius: 12 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    zIndex: 10002,
    pointerEvents: 'none',
  },
  closeButton: { position: 'absolute', top: 10, right: 10, zIndex: 10001, padding: 6 },
  closeText: { fontSize: 24, color: 'white' },
  errorBox: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
