package com.udk16.wifiprinter

import android.content.Context
import com.facebook.react.bridge.ReactApplicationContext
import com.wifiprinter.NativeWifiPrinterSpec


import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.net.Socket;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;

import java.util.Map;
import java.util.HashMap;


class NativeWifiModule(reactContext: ReactApplicationContext) : NativeWifiPrinterSpec(reactContext){
    override fun printBill(String ipAddress, String port, ReadableArray escposBytes, Callback callback){
        
        String address = "ws://"+ipAddress+":"+port;
         // writable map to send to js
        WritableMap map = Arguments.createMap();


        Socket socket = null;
        OutputStream outputStream = null;
        try {
            InetSocketAddress address = new InetSocketAddress(printerIPAddress, printerPort);
            socket = new Socket();
            socket.connect(address, 5000); // Timeout of 5 seconds
            outputStream = socket.getOutputStream();
            outputStream.write(escposBytes);
            //writing result to map
             map.putBoolean("result", true);
            // invokes callback to send the map to js
        callBack.invoke(map);
        } catch (IOException e) {
            Log.e(TAG, "Error printing bill via Wi-Fi", e);
              //writing result to map
             map.putBoolean("result", false);
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