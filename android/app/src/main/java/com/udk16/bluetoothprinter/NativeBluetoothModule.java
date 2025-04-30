package com.udk16.bluetoothprinter;

import android.content.Context;
import com.facebook.react.bridge.ReactApplicationContext;
import com.printer.NativeBluetoothConnectionSpec;
import com.facebook.react.bridge.ReadableArray;
import android.util.Log;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.UnknownHostException;
import java.net.Socket;
import android.widget.Toast;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import android.companion.CompanionDeviceManager;
import java.util.concurrent.Executor;
import java.util.Map;
import java.util.HashMap;
import android.content.IntentSender;
import android.companion.AssociationInfo;
import java.lang.CharSequence;
import android.companion.BluetoothDeviceFilter;
import android.companion.AssociationRequest;
import android.os.Bundle;
import android.app.Activity;
import android.bluetooth.BluetoothAdapter;  // Import BluetoothAdapter
import android.bluetooth.BluetoothDevice; // Import BluetoothDevice
import java.util.Set; 

class NativeBluetoothModule extends NativeBluetoothConnectionSpec{
public static final String NAME = "NativeBluetoothConnection";
private final ReactApplicationContext reactContext;
private static final int SELECT_DEVICE_REQUEST_CODE = 123;
  public NativeBluetoothModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return NAME;
  }

   @Override
   public void printEscPos(String macAddress, String uuid, ReadableArray commands, Promise promise){   

     Activity currentActivity = getCurrentActivity(); 
        BluetoothDeviceFilter deviceFilter = new BluetoothDeviceFilter.Builder()
        // Match only Bluetooth devices whose name matches the pattern.
        // .setNamePattern(Pattern.compile("My device"))
        // Match only Bluetooth devices whose service UUID matches this pattern.
        // .addServiceUuid(new ParcelUuid(new UUID(0x123abcL, -1L)), null)
        .build();


        AssociationRequest pairingRequest = new AssociationRequest.Builder()
        // Find only devices that match this request filter.
        .addDeviceFilter(deviceFilter)
        // Stop scanning as soon as one device matching the filter is found.
        // .setSingleDevice(true)
        .build();

        // Socket socket = null;
        // OutputStream outputStream = null;
        CompanionDeviceManager deviceManager =
        (CompanionDeviceManager) reactContext.getSystemService(Context.COMPANION_DEVICE_SERVICE);

        Executor executor = new Executor() {
            @Override
            public void execute(Runnable runnable) {
                runnable.run();
            }
        };
        deviceManager.associate(pairingRequest,executor, new CompanionDeviceManager.Callback() {
     
    // Called when a device is found. Launch the IntentSender so the user can
    // select the device they want to pair with.
    @Override
    public void onDeviceFound(IntentSender chooserLauncher) {
        try {
           currentActivity.startIntentSenderForResult(
                    chooserLauncher, SELECT_DEVICE_REQUEST_CODE, null, 0, 0, 0
            );
        } catch (IntentSender.SendIntentException e) {
            Log.e("MainActivity", "Failed to send intent");
        }
    }
@Override
protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
    Toast.makeText(getReactApplicationContext(),
                resultCode, Toast.LENGTH_SHORT)
                .show();
    if (resultCode != Activity.RESULT_OK) {
         Toast.makeText(getReactApplicationContext(),
                resultCode, Toast.LENGTH_SHORT)
                .show();
        return;
    }
    if (requestCode == SELECT_DEVICE_REQUEST_CODE && data != null) {
        BluetoothDevice deviceToPair =
data.getParcelableExtra(CompanionDeviceManager.EXTRA_DEVICE);
        if (deviceToPair != null) {
            deviceToPair.createBond();
            // Continue to interact with the paired device.
        }
    } else {
        super.onActivityResult(requestCode, resultCode, data);
    }
}
    @Override
    public void onAssociationCreated(AssociationInfo associationInfo) {
        // An association is created.
    }

    @Override
    public void onFailure(CharSequence errorMessage) {
        // To handle the failure.
    }});
    
    }
}