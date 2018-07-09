# Face embeddings visualization using t-SNE

** WORK IN PROGRESS **

This is a very simple web page (WIP) that uses the [tfjs-tsne](https://github.com/tensorflow/tfjs-tsne) library to visualize the face embeddings generated using [dlib](https://github.com/davisking/dlib).

See the demo at [https://ksachdeva.github.io/face-embeddings-tsne/](https://ksachdeva.github.io/face-embeddings-tsne/). Make sure to open the javascript console as well to see some debug information. On my macbook pro 2015, if I set perplexity more than 18 I get an error. On a Ubuntu machine with NVIDIA 1080 I am able to set the max perplexity (30) with out any error.

## Setup / Install / Run instructions

A sample file containing the embeddings [dlib.json](embeddings/dlib.json) is already included in this repository. If you want to generate a sample that contains more classes then you can use [face-embeddings-generator](https://github.com/ksachdeva/face-embeddings-generator) project.

This sample file contains 10 classes only.

If you are generating the new sample file then make sure that your file is generated in the *visualizer/src/assets* directory of this project as this is where the javascript expects it to be.

```bash
# if you want to get face-embeddings-generator as part of this project
# then clone it recursively
git clone --recursive https://github.com/ksachdeva/face-embeddings-tsne
```

```bash
# to run
cd visualizer
npm install
ng serve
```
