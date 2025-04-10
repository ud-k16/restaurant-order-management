package com.udk16.wifiprinter;

import android.content.Context;
import com.facebook.react.bridge.ReactApplicationContext;
import com.wifiprinter.NativeWifiPrinterSpec;
import com.facebook.react.bridge.ReadableArray;
import android.util.Log;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.UnknownHostException;
import java.net.Socket;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import java.util.Map;
import java.util.HashMap;


class NativeWifiModule extends NativeWifiPrinterSpec{
public static final String NAME = "NativeWifiPrinter";

  public NativeWifiModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }

  @Override
  public String getName() {
    return NAME;
  }

    @Override
  public void  printBill(String ipAddress, double port, ReadableArray escposBytes, Callback callback){
        
         // writable map to send to js
        WritableMap map = Arguments.createMap();


        Socket socket = null;
        OutputStream outputStream = null;
        try {
             byte[] printData = new byte[escposBytes.size()];
        for (int i = 0; i < escposBytes.size(); i++) {
            printData[i] = (byte) escposBytes.getInt(i);
        }
            int printerPort = (int) port;
            InetAddress printerIP = InetAddress.getByName(ipAddress);
            InetSocketAddress address = new InetSocketAddress(printerIP, printerPort);
            socket = new Socket();
            socket.connect(address, 10000); // Timeout of 5 seconds
            outputStream = socket.getOutputStream();
            outputStream.write(printData);
            //writing result to map
             map.putBoolean("success", true);
            // invokes callback to send the map to js
        callback.invoke(map);
        } catch (IOException e) {
            // Log.e(TAG, "Error printing bill via Wi-Fi", e);
              //writing result to map
             map.putBoolean("success", false);
            // invokes callback to send the map to js
        callback.invoke(map);
        } finally {
            try {
                if (outputStream != null) outputStream.close();
                if (socket != null && socket.isConnected()) socket.close();
            } catch (IOException ignored) {}
        }
    }
}