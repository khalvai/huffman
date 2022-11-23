import fs from 'fs';
import events from 'events';
import readLine from 'readline';
import path from 'path';

const arryNode = new Array<Node>();

class Node {
  char: string | undefined;
  left: Node | null = null;
  right: Node | null = null;

  constructor(public value: number, char?: string) {
    this.char = char;
  }
}

async function BuildHuffmanCode() {
  await readFromFile();

  while (arryNode.length > 1) {
    sort();

    const left = arryNode.shift() as Node;
    const right = arryNode.shift() as Node;
    const value = left?.value + right?.value;

    const node = new Node(value);
    node.left = left;
    node.right = right;

    arryNode.unshift(node);
  }

 printCode(arryNode[0],"")
}

async function readFromFile() {
  try {
    const rl = readLine.createInterface({
      input: fs.createReadStream(path.join(__dirname, '../words.txt')),
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
      const word = line.split(' ');
      const node = new Node(+word[1], word[0]);
      arryNode.push(node);
    });

    await events.once(rl, 'close');

    console.log('here ', arryNode);
  } catch (erorr) {
    console.log(`sth went wrong : ${erorr}`);
  }
}

function sort() {
  arryNode.sort((a, b) => {
    return a.value - b.value;
  });
}

function printCode(root: Node, zeroOROne: string) {
  if (root.char && !root.left) {
    console.log(`${root.char} : ${zeroOROne}`);
    return;
  }

  printCode(root.left as Node, zeroOROne + '0');
  printCode(root.right as Node, zeroOROne + '1');
}

BuildHuffmanCode();
