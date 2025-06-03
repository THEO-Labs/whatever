import Vision
import VisionCamera

@objc(PoseDetectionFrameProcessor)
public class PoseDetectionFrameProcessor: FrameProcessorPlugin {
  public override func callback(_ frame: Frame, withArguments arguments: [AnyHashable : Any]?) -> Any? {
    guard let pixelBuffer = frame.buffer else { return nil }

    let request = VNDetectHumanBodyPose3DRequest()
    let handler = VNImageRequestHandler(cvPixelBuffer: pixelBuffer, orientation: .up, options: [:])

    do {
      try handler.perform([request])
      guard let observations = request.results else { return nil }

      // Process observations to extract joint positions
      // and return them in a format suitable for your React Native app
      // For example, return an array of joint dictionaries
      let jointsData = observations.map { observation in
        // Extract joint positions from observation
        // ...
        return ["jointName": ["x": 0.0, "y": 0.0, "z": 0.0]]
      }

      return jointsData
    } catch {
      print("Pose detection error: \(error)")
      return nil
    }
  }
}
