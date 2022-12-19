package com.telpo

import android.graphics.BitmapFactory
import android.util.Base64
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import com.telpo.tps550.api.TelpoException
import com.telpo.tps550.api.printer.UsbThermalPrinter

class TelpoModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private val printer = UsbThermalPrinter(reactApplicationContext)

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun checkStatus(promise: Promise) {
    try {
      val status = printer.checkStatus()
      promise.resolve(status)
    }
    catch (e: TelpoException){
      promise.resolve(UsbThermalPrinter.STATUS_UNKNOWN)
    }

  }

  @ReactMethod
  fun start(mode: Double) {
    printer.start(mode.toInt())
  }

  @ReactMethod
  fun setGrey(level: Double) {
    printer.setGray(level.toInt())
  }

  @ReactMethod
  fun setLineSpace(lineSpace: Double) {
    printer.setLineSpace(lineSpace.toInt())
  }

  @ReactMethod
  fun setBold(isBold: Boolean) {
    printer.setBold(isBold)
  }

  @ReactMethod
  fun setAlgin(mode: Double) {
    printer.setAlgin(mode.toInt())
  }

  @ReactMethod
  fun setTextSize(size: Double) {
    printer.setTextSize(size.toInt())
  }

  @ReactMethod
  fun addString(content: String) {
    printer.addString(content)
  }

  @ReactMethod
  fun printString() {
    printer.printString()
  }

  @ReactMethod
  fun walkPaper(line: Double) {
    printer.walkPaper(line.toInt())
  }

  @ReactMethod
  fun stop() {
    printer.stop()
  }

  @ReactMethod
  fun printLogo(image: String, isBuffer: Boolean) {
    val imageBytes = Base64.decode(image, 0)
    val bitmap = BitmapFactory.decodeByteArray(imageBytes, 0, imageBytes.size)
    printer.printLogo(bitmap, isBuffer)
  }

  companion object {
    const val NAME = "Telpo"
  }
}
