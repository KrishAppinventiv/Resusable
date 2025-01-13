#import "AppDelegate.h"
#import <React/RCTBundleURLProvider.h>
#import <Firebase.h> // Import Firebase
#import <GoogleSignIn/GoogleSignIn.h> // Import GoogleSignIn
#import <RNGoogleSignin/RNGoogleSignin.h> // Import RNGoogleSignin

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  // Initialize Firebase
  if ([FIRApp defaultApp] == nil) {
    [FIRApp configure];
  }
  
  self.moduleName = @"Resusable";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

// Add this method to handle Google Sign-In URL redirection
- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey, id> *)options
{
  // Handle Google Sign-In URL redirection using RNGoogleSignin
  if ([RNGoogleSignin application:application openURL:url options:options]) {
    return YES;
  }

  // Handle other URL types, if necessary
  return NO;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
