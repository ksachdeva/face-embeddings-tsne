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

    // convert data into the tensors
    const embeddings = ds.map(d => d.embeddings);
    const flat = [].concat(...embeddings);

    const tensor = tf.tensor2d(flat);

    const fillColor = () => {
      // tslint:disable-next-line:no-bitwise
      return '#' + ((1 << 24) * (Math.random() + 1) | 0).toString(16).substr(1);
    };

    // assign color for each label
    const labels = [];
    let labelIdx = fillColor();
    ds.forEach(element => {
      for (let i = 0; i < element.embeddings.length; i++) {
        labels.push(labelIdx);
      }
      do {
        labelIdx = fillColor();
      } while (labels.indexOf(labelIdx) !== -1);
    });


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
