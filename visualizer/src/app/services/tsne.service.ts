import {Injectable} from '@angular/core';
import * as tf from '@tensorflow/tfjs-core';
import * as tsne from '@tensorflow/tfjs-tsne';
import randomColor from 'randomcolor';
import {DatasetService} from './dataset.service';

@Injectable()
export class TSNEService {
  constructor(private datasetService: DatasetService) {}

  async computeCoordinates(
      perplexity: number, knnIterations: number, tsneIterations: number) {
    const ds: DatasetEntry[] =
        await this.datasetService.getEmbeddings().toPromise();

    // convert data into the tensors
    const embeddings = ds.map(d => d.embeddings);
    const flat = [].concat(...embeddings);

    const tensor = tf.tensor2d(flat);

    // generate colors equal to the number of entries
    const colors =
        randomColor({count: ds.length, luminosity: 'bright', hue: 'random'});

    const labels = [];
    for (let i = 0; i < ds.length; i++) {
      for (let j = 0; j < ds[i].embeddings.length; j++) {
        labels.push(colors[i]);
      }
    }

    const embedder = tsne.tsne(tensor, {
      perplexity: perplexity,
      verbose: true,
      knnMode: 'auto',
    });

    await embedder.compute(tsneIterations);

    const coordinates = await embedder.coordsArray();

    return [coordinates, labels];
  }
}
