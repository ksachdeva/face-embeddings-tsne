import {Injectable} from '@angular/core';
import * as tf from '@tensorflow/tfjs-core';
import * as tsne from '@tensorflow/tfjs-tsne';

import {DatasetService} from './dataset.service';

@Injectable()
export class TSNEService {
  constructor(private datasetService: DatasetService) {}

  async computeCoordinates(
      perplexity: number, knnIterations: number, tsneIterations: number) {
    const ds: DatasetEntry[] =
        await this.datasetService.getEmbeddings().toPromise();

    // convert it into the tensors
    const embeddings = ds.map(d => d.embeddings);
    const flat = [].concat(...embeddings);

    const tensor = tf.tensor2d(flat);

    const embedder = tsne.tsne(tensor, {
      perplexity: perplexity,
      verbose: true,
      knnMode: 'auto',
    });

    await embedder.compute(tsneIterations);

    return await embedder.coordsArray();
  }
}