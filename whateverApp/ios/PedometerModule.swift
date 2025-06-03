import Foundation
import CoreMotion
import React

@objc(PedometerModule)
class PedometerModule: RCTEventEmitter {
  private let pedometer = CMPedometer()
  private let activityManager = CMMotionActivityManager()
  private var hasListeners = false

  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  override func supportedEvents() -> [String]! {
    return ["ActivityUpdate"]
  }

  override func startObserving() {
    hasListeners = true
  }

  override func stopObserving() {
    hasListeners = false
    activityManager.stopActivityUpdates()
  }

  @objc
  func getStepsInRange(_ fromTimestamp: NSNumber, to toTimestamp: NSNumber,
                       resolver resolve: @escaping RCTPromiseResolveBlock,
                       rejecter reject: @escaping RCTPromiseRejectBlock) {
    let fromDate = Date(timeIntervalSince1970: fromTimestamp.doubleValue / 1000)
    let toDate = Date(timeIntervalSince1970: toTimestamp.doubleValue / 1000)

    if CMPedometer.isStepCountingAvailable() {
      pedometer.queryPedometerData(from: fromDate, to: toDate) { data, error in
        if let error = error {
          reject("QUERY_ERROR", "Fehler beim Abrufen der Schritte", error)
        } else if let steps = data?.numberOfSteps {
          resolve(["steps": steps])
        } else {
          reject("NO_DATA", "Keine Schritte vorhanden", nil)
        }
      }
    } else {
      reject("NOT_AVAILABLE", "Pedometer nicht verfügbar", nil)
    }
  }

  @objc
  func startActivityUpdates() {
    guard CMMotionActivityManager.isActivityAvailable() else { return }

    activityManager.startActivityUpdates(to: .main) { [weak self] activity in
      guard let self = self, let activity = activity, self.hasListeners else { return }

      var type = "unknown"
      if activity.walking { type = "walking" }
      else if activity.running { type = "running" }
      else if activity.stationary { type = "stationary" }
      else if activity.automotive { type = "automotive" }
      else if activity.cycling { type = "cycling" }

      let confidence: String
      switch activity.confidence {
      case .low: confidence = "low"
      case .medium: confidence = "medium"
      case .high: confidence = "high"
      @unknown default: confidence = "unknown"
      }

      self.sendEvent(withName: "ActivityUpdate", body: [
        "activity": type,
        "confidence": confidence
      ])
    }
  }
}
