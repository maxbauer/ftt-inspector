import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Injectable({
  providedIn: 'root'
})
export class OCROnImageService {
  model

  constructor() { 
    this.loadModel()
  }

  async loadModel() {
    try{
      console.log("[INFO] Loading the tf model ...")
      const modelURL = './assets/selective_data_model/model.json';
      this.modelPromise =  tf.loadLayersModel(modelURL);
      console.log("[INFO] Successfully loaded model.", this.model)
    }
    catch(error){
      console.log("[ERROR] Loading the model: ", error.message)
    }
  }

  async predictOnImage(imageFile) {
    this.model = await this.modelPromise;
    try{
      console.log("imageFile")
      const tfImg = tf.browser.fromPixels(imageFile);
      console.log("[INFO] tfImg: ", tfImg);
      const smallImg = tf.image.resizeBilinear(tfImg, [64, 64]);
      console.log("[INFO] smallImg: ", smallImg);
      const resized = tf.cast(smallImg, 'float32');
      console.log("[INFO] resized: ", resized);
      const t4d = tf.tensor4d(Array.from(resized.dataSync()), [1,64,64,3]);
      console.log("[INFO] t4d: ", t4d);
      const result = await this.model.predict(t4d).data();
      console.log("[INFO] Model Prediction: ", result);
      return result
    }
    catch(error){
      console.log("[ERROR] During prediction: ", error.message)
    }
  }

}
