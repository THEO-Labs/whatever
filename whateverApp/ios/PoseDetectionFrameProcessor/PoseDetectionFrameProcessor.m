#import <VisionCamera/FrameProcessorPlugin.h>
#import <VisionCamera/FrameProcessorPluginRegistry.h>

@interface PoseDetectionFrameProcessor : FrameProcessorPlugin
@end

@implementation PoseDetectionFrameProcessor

VISION_EXPORT_FRAME_PROCESSOR(PoseDetectionFrameProcessor, detectPose)

@end
