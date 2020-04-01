package com.rpgassassin;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

//Facebook login
import com.facebook.FacebookSdk;
import com.facebook.CallbackManager;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.appevents.AppEventsLogger;

import com.airbnb.android.react.maps.MapsPackage;
import com.gettipsi.stripe.StripeReactPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.imagepicker.ImagePickerPackage;
import fr.bamlab.rnimageresizer.ImageResizerPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.rpgassassin.generated.BasePackageList;
import com.swmansion.reanimated.ReanimatedPackage;
import com.swmansion.rnscreens.RNScreensPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.zmxv.RNSound.RNSoundPackage;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import org.reactnative.camera.RNCameraPackage;
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.devfd.RNGeocoder.RNGeocoderPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

  protected static CallbackManager getCallbackManager() {
    return mCallbackManager;
  }

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(new MainReactPackage(), new LinearGradientPackage(), new MapsPackage(),
          new RNFusedLocationPackage(), new ImagePickerPackage(), new ImageResizerPackage(),
          new SplashScreenReactPackage(), new ReanimatedPackage(), new RNGestureHandlerPackage(),
          new RNScreensPackage(), new StripeReactPackage(), new FBSDKPackage(), new RNCameraPackage(),
          new RNSoundPackage(), new RNGoogleSigninPackage(), new ReactNativePushNotificationPackage(), new RNGeocoderPackage());
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
