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
// private static final  BluetoothAdapter bluetoothAdapter;
private static final String TAG = "MyEpsonPrinterModule";
private static final int SELECT_DEVICE_REQUEST_CODE = 123;
private static final UUID PRINTER_UUID = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB"); // Standard SPP UUID

    private BluetoothAdapter bluetoothAdapter;
    private BluetoothSocket bluetoothSocket;
    private BluetoothDevice connectedDevice;
    private OutputStream outputStream;
  public NativeBluetoothModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    this.bluetoothAdapter = BluetoothAdapter.getDefaultAdapter();
  }

  @Override
  public String getName() {
    return NAME;
  }
  @Override
public void getPairedDevices(Promise promise){
     
        if (bluetoothAdapter == null) {
            promise.reject("BLUETOOTH_UNAVAILABLE", "Bluetooth is not supported on this device.");
            return;
        }

        if (!bluetoothAdapter.isEnabled()) {
            promise.reject("BLUETOOTH_DISABLED", "Bluetooth is disabled.");
            return;
        }

        Set<BluetoothDevice> pairedDevices = bluetoothAdapter.getBondedDevices();
        if (pairedDevices.size() > 0) {
            // Convert the set of BluetoothDevice objects to a JSON array
            // to pass back to React Native.
            StringBuilder deviceList = new StringBuilder();
            for (BluetoothDevice device : pairedDevices) {
                deviceList.append(device.getName()).append(":").append(device.getAddress()).append(",");
            }
             if (deviceList.length() > 0) {
                deviceList.deleteCharAt(deviceList.length() - 1); // Remove the last comma
             }
            promise.resolve(deviceList.toString());
        } else {
            promise.resolve(""); // Return empty string if no devices are paired
        }
    }



   @Override
   public void printEscPos(String macAddress, String uuid, ReadableArray commands, Promise promise){   
        byte[] printData = new byte[commands.size()];     
        for (int i = 0; i < commands.size(); i++) {
            printData[i] = (byte) commands.getInt(i);
        }

        if (bluetoothAdapter == null) {
            promise.reject("BluetoothNotSupported", "Bluetooth is not supported on this device.");
            return;
        }

        try {
            BluetoothDevice device = bluetoothAdapter.getRemoteDevice(macAddress);
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
                if (ActivityCompat.checkSelfPermission(reactContext, Manifest.permission.BLUETOOTH_CONNECT) != PackageManager.PERMISSION_GRANTED) {
                    promise.reject("BluetoothConnectPermissionDenied", "Bluetooth connect permission is required.");
                    return;
                }
            }
            bluetoothSocket = device.createRfcommSocketToServiceRecord(PRINTER_UUID);
            // bluetoothAdapter.cancelDiscovery(); // Stop scanning to conserve resources

            bluetoothSocket.connect();
            connectedDevice = device;
            outputStream = bluetoothSocket.getOutputStream();
            // promise.resolve(device.getName());
            // sendEvent("onBluetoothConnected", null);
            if (outputStream == null) {
            promise.reject("NotConnected", "Not connected to a Bluetooth device.");
            return;
        }

        try {
            // byte[] data = android.util.Base64.decode(base64EncodedData, android.util.Base64.DEFAULT);
            // outputStream.write(data);
            outputStream.write(printData);
            promise.resolve(true);
        } catch (IOException e) {
            Log.e(TAG, "Error writing to device", e);
            promise.reject("WriteFailed", "Failed to write data to the device: " + e.getMessage());
            closeConnection();
        }

        } catch (IOException e) {
            Log.e(TAG, "Error connecting to device", e);
            promise.reject("ConnectionFailed", "Failed to connect to the device: " + e.getMessage());
            closeConnection();
        }


    }

    private void closeConnection() {
        try {
            if (outputStream != null) {
                outputStream.close();
                outputStream = null;
            }
            if (bluetoothSocket != null && bluetoothSocket.isConnected()) {
                bluetoothSocket.close();
                bluetoothSocket = null;
            }
            connectedDevice = null;
        
        } catch (IOException e) {
            Log.e(TAG, "Error closing connection", e);
        }
    }
}