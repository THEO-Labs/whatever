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
  func startUpdates(_ resolver: @escaping RCTPromiseResolveBlock,
                    rejecter reject: @escaping RCTPromiseRejectBlock) {
    if CMPedometer.isStepCountingAvailable() {
      pedometer.startUpdates(from: Date()) { data, error in
        if let error = error {
          reject("PEDOMETER_ERROR", "Fehler beim Starten", error)
        } else if let steps = data?.numberOfSteps {
          resolver(["steps": steps])
        } else {
          reject("NO_DATA", "Keine Schritte empfangen", nil)
        }
      }
    } else {
      reject("NOT_AVAILABLE", "Pedometer nicht verfügbar", nil)
    }
  }

  @objc
  func getTodaySteps(_ resolver: @escaping RCTPromiseResolveBlock,
                     rejecter reject: @escaping RCTPromiseRejectBlock) {
    let now = Date()
    let startOfDay = Calendar.current.startOfDay(for: now)

    if CMPedometer.isStepCountingAvailable() {
      pedometer.queryPedometerData(from: startOfDay, to: now) { data, error in
        if let error = error {
          reject("QUERY_ERROR", "Fehler beim Abrufen der Schritte", error)
        } else if let steps = data?.numberOfSteps {
          resolver(["steps": steps])
        } else {
          reject("NO_DATA", "Keine Schrittzahl vorhanden", nil)
        }
      }
    } else {
      reject("NOT_AVAILABLE", "Pedometer nicht verfügbar", nil)
    }
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
          resolve(["steps": steps, "from": fromTimestamp, "to": toTimestamp])
        } else {
          reject("NO_DATA", "Keine Schrittzahl vorhanden", nil)
        }
      }
    } else {
      reject("NOT_AVAILABLE", "Pedometer nicht verfügbar", nil)
    }
  }
  @objc
  func stopUpdates() {
    pedometer.stopUpdates()
  }

  @objc
  func startActivityUpdates() {
    if !CMMotionActivityManager.isActivityAvailable() { return }

    activityManager.startActivityUpdates(to: OperationQueue.main) { [weak self] activity in
      guard let self = self, let activity = activity, self.hasListeners else { return }

      var currentActivity = "unknown"
      if activity.walking { currentActivity = "walking" }
      else if activity.running { currentActivity = "running" }
      else if activity.automotive { currentActivity = "automotive" }
      else if activity.cycling { currentActivity = "cycling" }
      else if activity.stationary { currentActivity = "stationary" }

      let confidence: String
      switch activity.confidence {
      case .low: confidence = "low"
      case .medium: confidence = "medium"
      case .high: confidence = "high"
      @unknown default: confidence = "unknown"
      }

      self.sendEvent(withName: "ActivityUpdate", body: [
        "activity": currentActivity,
        "confidence": confidence
      ])
    }
  }
}
