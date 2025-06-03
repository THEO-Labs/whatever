#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(PedometerModule, RCTEventEmitter)

RCT_EXTERN_METHOD(getStepsInRange:(nonnull NSNumber *)fromTimestamp
                  to:(nonnull NSNumber *)toTimestamp
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(startActivityUpdates)

@end
