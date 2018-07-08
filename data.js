import * as tf from '@tensorflow/tfjs-core';

import descriptorData from './embeddings/dlib.json';

export class FaceEmbeddingData {
    static load() {
        const embeddings = descriptorData.map(d => d.embeddings);
        const flat = [].concat(...embeddings);
        return tf.tensor2d(flat);
    }
}