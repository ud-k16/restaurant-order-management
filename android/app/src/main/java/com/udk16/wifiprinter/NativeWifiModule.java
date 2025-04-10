package com.udk16.wifiprinter;

import android.content.Context;
import com.facebook.react.bridge.ReactApplicationContext;
import com.wifiprinter.NativeWifiPrinterSpec;


import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
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
  public void  printBill(String ipAddress, String port, ReadableArray escposBytes, Callback callback){
        
         // writable map to send to js
        WritableMap map = Arguments.createMap();


        Socket socket = null;
        OutputStream outputStream = null;
        try {
            InetSocketAddress address = new InetSocketAddress(ipAddress, port);
            socket = new Socket();
            socket.connect(address, 10000); // Timeout of 5 seconds
            outputStream = socket.getOutputStream();
            outputStream.write(escposBytes);
            //writing result to map
             map.putBoolean("success", true);
            // invokes callback to send the map to js
        callBack.invoke(map);
        } catch (IOException e) {
            Log.e(TAG, "Error printing bill via Wi-Fi", e);
              //writing result to map
             map.putBoolean("success", false);
            // invokes callback to send the map to js
        callBack.invoke(map);
        } finally {
            try {
                if (outputStream != null) outputStream.close();
                if (socket != null && socket.isConnected()) socket.close();
            } catch (IOException ignored) {}
        }
    }
}